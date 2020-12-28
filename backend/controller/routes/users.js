const express = require('express');
const _ = require('lodash');

//Create router
const router = express.Router();

//Import mongo models
const User = require('../../model/User');
const {Coaching, School, College} = require('../../model/Institute');

// fetchByUsername
router.get('/:username', (req, res) => {
    const {username} = req.params;
    const foundUser = User.findOne({username:username});
    res.send(foundUser);    
});


// sending-receiving chat message







//Export router
module.exports = router;