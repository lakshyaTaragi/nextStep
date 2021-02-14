const express = require('express');
const _ = require('lodash');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

//Create router
const router = express.Router();

//Import mongo models
const User = require('../../model/User');
const ChatRoom = require('../../model/ChatRoom');
// const {Coaching, School, College} = require('../../model/Institute');

// populate
router.get('/populate/:userId', (req, res) => {
    const {userId} = req.params;
    User.findOne({_id: userId})
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

router.get('/chat/loadChat/:senderId/:receiverId', (req, res) => {
    const {senderId, receiverId} = req.params;
    ChatRoom.find(
        { members: { $all: [senderId, receiverId] } },
        (err, result) => {
            if(err) throw err;
            res.send(result);
        }
    );
});

router.get('/check/:username', (req, res) => {
    User.find({username: req.params.username}, (err, user) => {
        if(err) throw err;
        if(!_.isEmpty(user)) res.send(true);
        else res.send(false);
    })
});


// sending-receiving chat message
// router.get('/chat/:receiverId', (req, res) => {
//     const {receiverId} = req.params;
//     var chats = [];
//     Message.find(
//         {receiver: receiverId},
//         (err, message) => {
//             if(err) throw err;
//             console.log(message);
//             chats.push(message);
//         }
//     ).then(()=>res.send(chats));        
// });

// router.get('/chat/:senderId/:receiverId', (req,res)=>{
//     const {senderId, receiverId} = req.params;
//     User.find({_id: senderId})
// });






//Export router
module.exports = router;