const express = require('express');
const passport = require('passport');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

//Create router
const router = express.Router();

//Import mongo models
const User = require('../../model/User');
const {Coaching, School, College} = require('../../model/Institute');

// Signup handle
router.post('/signup', (req, res) => {

    const form = req.body;
    const name = form.firstName+" "+form.lastName;

    // Make school object
    const school = new School({
        name:form.school,
        city:form.schoolCity
    });
    
    // Make coaching object  
    const coachingObj = {};
    coachingObj.name = form.coaching ? form.coaching:null;
    coachingObj.city = form.coaching && form.coachingCity ? form.coachingCity:null;
    const coaching = new Coaching(coachingObj);
    
 
    // Make college object
    const college = new College({name:form.college});
    
    console.log(form);


    var newUser = {...req.body, name, school:school._id, coaching:coaching._id, college: college._id};
    newUser = _.omit(newUser,'firstName','lastName','password2','schoolCity','coachingCity');

    // hash password
    bcrypt.genSalt(10, (err, salt)=>{
        if(err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            // set pw to hashed
            newUser.password = hash;

            // save in user db
            new User(newUser).save()
            .then(() => console.log('new user saved'))
            .catch(err => console.log(err));
            // Save in school db
            school.save()
            .then(()=>console.log('school saved'))
            .catch(err => console.log(err));
            // Save in coaching db
            coaching.save()
            .then(()=>console.log('coaching saved'))
            .catch(err => console.log(err));
            // Save in college db
            college.save()
            .then(()=>console.log('college saved'))
            .catch(err => console.log(err));
        });
    });

    res.send(newUser); 
});


// Signin Handle
router.post('/signin', (req, res, next) => {
    passport.authenticate('local');
    // ! success/failure logics

});


//Export router
module.exports = router;