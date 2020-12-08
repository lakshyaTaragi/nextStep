const express = require('express');
const passport = require('passport');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

//Create router
const router = express.Router();


//Import User model
const User = require('../../model/User');


//Signup page
router.get('/signup', (req, res) => {
    res.send('signup page');
});

// Signup handle
router.post('/signup', (req, res) => {

    const form = req.body;
    const name = form.firstName+" "+form.lastName;
    const school = {
        name:form.school,
        city:form.schoolCity
    };
    
    const coaching = {};
    coaching.name = form.coaching ? form.coaching:null;
    coaching.city = form.coaching&&form.coachingCity ? form.coachingCity:null;

    const college = {name:form.college};
    
    var newUser = {...req.body, name, school, coaching, college};
    newUser = _.omit(newUser,'firstName','lastName','password2','schoolCity','coachingCity');

    bcrypt.genSalt(12, (err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            // set pw to hashed
            newUser.password = hash;           
        });
    });


    
   
    
    
});


//Signin page
router.get('/signin', (req, res) => {
    res.send('signin page');
});

// TODO: SIGNIN HANDLE



//Export router
module.exports = router;