const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
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