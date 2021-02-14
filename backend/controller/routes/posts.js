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

// For fetching posts of a user
router.get('/usersPosts/:userid', (req, res) => {
    const {userid} = req.params;
    //! LATER USE USER MODEL FOR FINDING (AFTER POST DELETION ISSUE GETS RESOLVED)
    Post.find({postedBy: userid}, (err, usersPosts)=> {
        if(err) throw err;
        else res.send(usersPosts);
    });
});

// For fetching all posts for home feed
router.get('/allPosts', (req, res) => {
    Post.find({}, (err, allPosts)=> {
        if(err) throw err;
        else res.send(allPosts);
    });
});


// Fetch a post by postId
router.get('/fetchpost/:postId', (req, res) => {
    const {postId} = req.params;
    Post.findById(postId, (err, foundPost) => {
        if(err) throw err;
        else {
            User.findById(foundPost.postedBy, (err, person) => {
                if(err) throw err;                
                else{
                    const {name, username, isMentor} = person;
                    res.send({...foundPost,
                    name, username, isMentor});
            }});            
        }
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
router.delete('/deletepost/:postId', (req, res) => {
    const {postId} = req.params;
    
    Post.findByIdAndDelete(postId, (err, deletedPost) => {
        if(err) throw err;
        else{
            if(!_.isEmpty(deletedPost.comments)){
                // Delete the comments
                Comment.deleteMany({_id: { $in: deletedPost.comments}}, (err, deleted) => {
                    if(err) throw err;
                });
            }
            // Delete post reference
            User.findByIdAndUpdate(
                {_id: deletedPost.postedBy},
                { $pull: {myPosts: deletedPost._id} },
                //! {multi: true} --> use at time of tagged posts
                (err) => { if(err) throw err; }
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