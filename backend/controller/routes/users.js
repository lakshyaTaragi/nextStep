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
router.get('/check/:username', (req, res) => {
    User.find({username: req.params.username}, (err, user) => {
        if(err) throw err;
        if(!_.isEmpty(user)) res.send(true);
        else res.send(false);
    })
});

// Find and send information of multiple users by ids
router.post('/getUsers', (req, res) => {
    const {userIds} = req.body;
    User.find(
        {_id: { $in: userIds}},
        (err, users) => {
            if(err) throw err;
            console.log(users);
        }
    );
});



// Load chat and change read-status of messages
router.get('/chat/loadChat/:senderId/:receiverId', (req, res) => {
    const {senderId, receiverId} = req.params;
    // console.log('loadChat')
    ChatRoom.findOneAndUpdate(
        { members: { $all: [senderId, receiverId] } },        
        {  $set: {'messages.$[message].isRead': true} },
        { arrayFilters: [{ 'message.receiver': senderId }] },
        (err, result) => {
            if(err) throw err;
            // console.log(result);
            res.send(result);
        }
    );
});


// Get unread messages info
router.get('/chat/:userId/unreadInfo/:roomId', (req, res) => {
    const { userId, roomId } = req.params;
    // console.log(roomId);
    ChatRoom.findById(roomId, (err, room) => {
        if(err) throw err;
        const unread = _.countBy(room.messages, message => {
            return (!message.isRead && message.receiver===userId);
        }).true; //! udefined for zero unread
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
        path: 'chatRooms.person',
        populate:{
          path: 'profilePicture'
        },
        select: '-chatRooms -city -coaching -college -email -myPosts -password -school'
    })
    .exec((err, docs) => {
        if(err) console.log(err);
        else res.send(docs);
    });
});



//Export router
module.exports = router;


