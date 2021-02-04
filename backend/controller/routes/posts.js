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
    .then(()=>console.log('new post created'))
    .catch(err=>console.log(err));

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
    Post.find({_id: postId}, (err, foundPost)=> {
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

// ! delete post with postId
router.delete('/deletepost/:postid', (req) => {
    const {postid} = req.params;
    Post.findByIdAndDelete(postid, (err) => {
        if(err) throw err;
    });
});


//! createComment
router.post('/createComment', (req, res) => {    
    const {userId, username, postId} = req.body;    
    const comment = new Comment({ postedBy: userId, content:req.body.comment, personsName: username});
    
    // save post in Comments db
    comment.save()
    .then(()=>console.log('new comment created'))
    .catch(err=>console.log(err));
    // save comment wrt the post
    Post.updateOne(
        {_id: postId},
        {
            $push: {
                comments: comment
            }
        },
        (err) => {
            if(err) throw err;
        }
    );
});

// ! fetch comments on a post
router.post('/getComments', (req, res) => {
    console.log(req.body);
    Comment.find(
        {_id: { $in: req.body}},
        (err, comments) => {
            if(err) throw err;
            console.log(comments);
            res.send(comments);
        }
    )
});




// export router
module.exports = router;