const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const MessageSchema = new Schema({
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
    }
});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;