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
        (err,result) => {
            if(err) throw err;
            console.log(result);
            res.send(result);
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


// export router
module.exports = router;