const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const User = require('./User'); 

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
    personsName:{
        type: String,
        required: true
    },
    postId:{
        type: ObjectId,
        ref: 'Post'
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


// // PRE MIDDLEWARE FOR DELETING POST
// PostSchema.pre('deleteOne', (next) => {
//     // Remove comments on post
//     console.log('removing comments');
//     Comment.deleteMany({postId: this._id});
//     // Remove reference of post 
//     console.log('removing from user');
//     User.updateMany(
//         {myPosts: this._id},
//         { $pull: {myPosts: this._id} }
//         //! {multi: true} --> use at time of tagged posts
//     );
//     next();
// });


const Post = mongoose.model('Post', PostSchema);
const Comment = mongoose.model('Comment', CommentSchema);



module.exports = {
    Post,
    Comment
};


