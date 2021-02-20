const express = require('express');
const _ = require('lodash');

//Create router
const router = express.Router();

//Import mongo models
const User = require('../../model/User');
const ChatRoom = require('../../model/ChatRoom');
// const {Coaching, School, College} = require('../../model/Institute');



// Populate user info --> Profile
router.get('/populate/:username', (req, res) => {
    const {username} = req.params;
    User.findOne({username})
    .populate('myPosts')
    .populate('coaching')
    .populate('school')
    .populate({path: 'college', isMentor:true})
    .populate({path: 'profilePicture', match: {profilePicture: {$ne:''}}})
    .exec((err, foundUser) => {
        if(err) console.log(err);
        foundUser.password = undefined;
        foundUser.chatRooms = undefined;   
        res.send(foundUser);
    });
});


// Check if a user exists --> Signup async validation
router.get('/check/:field/:type', (req, res) => {
    const {field, type} = req.params;
    const obj = {};
    if(type==='username'){
        obj.username = field;
    }
    if(type==='email'){
        obj.email = field;
    }   
    User.find({ $or: [
        {username: obj.username},
        {email: obj.email}
    ]}, (err, user) => {
        if(err) throw err;
        if(!_.isEmpty(user)){
            res.send(true);
        }
        else res.send(false);
    });
    
});

// Find and send information of multiple users by ids
router.post('/getUsers', (req, res) => {
    const {userIds} = req.body;
    User.find(
        {_id: { $in: userIds}},
        (err, users) => {
            if(err) throw err;
            // console.log(users);
        }
    );
});



// Load chat and change read-status of messages
router.get('/chat/loadChat/:senderId/:receiverId', (req, res) => {
    const {senderId, receiverId} = req.params;
    ChatRoom.findOne(
        { members: { $all: [senderId, receiverId] } },        
        (err, result) => {
            if(err) throw err;
            res.send(result);
        }
    );
});

// Load chat and change read-status of messages
router.get('/chat/setRead/:senderId/:receiverId', (req) => {
    const {senderId, receiverId} = req.params;
    // console.log('setread');
    ChatRoom.findOneAndUpdate(
        { members: { $all: [senderId, receiverId] } },        
        {  $set: {'messages.$[message].isRead': true} },
        { arrayFilters: [{ 'message.receiver': senderId }] },
        (err) => { if(err) throw err;}
    );
});



// Get unread messages info
router.get('/chat/:userId/unreadInfo/:roomId', (req, res) => {
    const { userId, roomId } = req.params;
    ChatRoom.findById(roomId, (err, room) => {
        if(err) throw err;
        // console.log(room);
        var unread = 0;
        room.messages.map(message => {
            if((!message.isRead && message.receiver==userId)) unread = unread+1;
        });
        const last = room.messages[room.messages.length-1].text;
        // console.log(last, unread);
        res.send({unread, last});        
    });
});


// Get all chats to create ChatList
router.get('/allChats/:userId', (req, res) => {
    const {userId} = req.params;
    User.findById(
        userId, 
        'chatRooms'
    )
    .populate({
        path: 'chatRooms',
        populate:{
           path: 'members',
           match: {_id: {$ne: userId}},
           populate: {
               path: 'profilePicture',
               match: {profilePicture: {$ne:''}}
           },
           select: '-chatRooms -city -coaching -college -email -myPosts -password -school'
        },
        select: '-messages'     
    })
    .exec((err, docs) => {
        if(err) console.log(err);
        // console.log(docs);
        res.send(docs);
    });
});



//Export router
module.exports = router;


