const express = require('express');
const _ = require('lodash');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

//Create router
const router = express.Router();

//Import mongo models
const User = require('../../model/User');
const ChatRoom = require('../../model/ChatRoom');
const {Coaching, School, College} = require('../../model/Institute');

// fetchByUsername
router.get('/:username', (req, res) => {
    const {username} = req.params;
    const foundUser = User.findOne({username:username});
    res.send(foundUser);    
});

router.get('/chat/loadChat/:senderId/:receiverId', (req, res) => {
    const {senderId, receiverId} = req.params;
    ChatRoom.find(
        {"members": {$in: [senderId, receiverId]}},
        (err, result) => {
            if(err) throw err;
            res.send(result);
        }
    );
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