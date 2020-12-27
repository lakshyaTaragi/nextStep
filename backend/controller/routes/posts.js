const express = require('express');
const _ = require('lodash');
const objectId = require('mongoose').Types.ObjectId;

// Create router
const router = express.Router();

// Import corresponding mongo models
const User = require('../../model/User');
const {Post} = require('../../model/Post');


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
        {_id:userId},
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

// for fetching personal posts
router.get('/myposts/:userid', (req, res) => {
    const {userid} = req.params;
    Post.find({postedBy:objectId(userid)}, (err, myposts)=> {
        if(err) throw err;
        else res.send(myposts);
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


// export router
module.exports = router;