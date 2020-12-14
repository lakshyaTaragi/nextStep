const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const PostSchema = new Schema({
    postedBy:{
        type: ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    upvotes: Number,
    comments: [{
        type: ObjectId,
        ref: 'Comment'
    }]
});

const CommentSchema = new Schema({
    postedBy:{
        type: ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    upvotes: Number,
    replies:[{
        type: ObjectId,
        ref: 'Comment'
    }]
});

const Post = mongoose.model('Post', PostSchema);
const Comment = mongoose.model('Comment', CommentSchema);


module.exports = {
    Post,
    Comment
};