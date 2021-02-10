const express = require('express');
const _ = require('lodash');
const objectId = require('mongoose').Types.ObjectId;

// Create router
const router = express.Router();

// Import corresponding mongo models
const User = require('../../model/User');
const {Post, Comment} = require('../../model/Post');


//! createpost
router.post('/createpost', (req, res) => {
    
    const {title, content, userId} = req.body;
    
    const post = new Post({
      postedBy: objectId(userId),
      title,
      content
    });

    // save post in Posts db
    post.save()
    // .then(()=>console.log('new post created'))
    // .catch(err=>console.log(err));

    // save post wrt the user
    User.updateOne(
        {_id: userId},
        {
            $push: {
                myPosts:post
            }
        },
        (err) => {
            if(err) throw err;
            res.send(true);
        }
    );

});

// ! for fetching personal posts
router.get('/myposts/:userid', (req, res) => {
    const {userid} = req.params;
    Post.find({postedBy: userid}, (err, myposts)=> {
        if(err) throw err;
        else res.send(myposts);
    });
});


// ! for fetching a post by id
router.get('/fetchpost/:postId', (req, res) => {
    const {postId} = req.params;
    Post.find({_id: postId}, (err, foundPost) => {
        if(err) throw err;
        else res.send(foundPost);
    });
});

// ! update post details with postId
router.patch('/updatepost', (req, res) => {
    const {title, content, postId} = req.body;
    Post.findByIdAndUpdate({_id:postId}, {title, content}, (err) => {
        if(err)  throw err;
        res.send(true);
    });
});



// Delete post with id
router.delete('/deletepost/:postid', (req, res) => {
    const {postId} = req.params;
    
    Post.findOneAndDelete(postId, (err, deletedPost) => {
        if(err) throw err; 
        if(!_.isEmpty(deletedPost.comments)){
            // Delete the comments
            Comment.deleteMany({_id: { $in: deletedPost.comments}}, (err, deleted) => {
                if(err) throw err;
            });
            // Delete post reference
            User.updateOne(
                {_id: deletedPost.postedBy},
                { $pull: {myPosts: deletedPost._id} },
                //! {multi: true} --> use at time of tagged posts
                (err, updated) => {if(err) throw err;}
            );
        }
    });
});



// Create comment
router.post('/createComment', (req, res) => {    
    const {userId, comment, username, postId} = req.body;    
    const newComment = new Comment({ postedBy: userId, content: comment, personsName: username, postId});
    
    // Save in Comments db
    newComment.save()
    .then((savedComment) => {       
        // Save comment wrt the post
        Post.updateOne(
            {_id: postId},
            {
                $push: {
                    comments: savedComment._id
                }
            },
            (err) => {
                if(err) throw err;
                // find and send populated updated post
                Post.findOne({_id: postId})
                .populate('comments')
                .exec((err, updatedPost) => {
                    if(err) throw err;
                    res.send(updatedPost);
                });
            }
        );
    });    
});

// Fetch comments on a post
router.post('/getComments', (req, res) => {
    Comment.find(
        {_id: { $in: req.body}},
        (err, comments) => {
            if(err) throw err;
            res.send(comments);
        }
    );
});




// export router
module.exports = router;