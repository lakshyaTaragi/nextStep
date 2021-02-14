const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ChatRoomSchema = new Schema({
    members:[{
        type:ObjectId,
        ref:'User'
    }],
    messages: [{
        sender:{
            type:ObjectId,
            ref:'User',
            required:true
        },
        receiver:{
            type:ObjectId,
            ref:'User',
            required:true
        },
        text:{
            type:String,
            required:true
        },
        time:{
            type:String,
            required:true
        },
        isRead:{
            type: Boolean,
            required: true
        }
    }]
}); 

const ChatRoom = mongoose.model('ChatRoom', ChatRoomSchema);
module.exports = ChatRoom;