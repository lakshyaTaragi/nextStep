// const express = require('express');
// const passport = require('passport');

// // ! Create router
// const router = express.Router();


// // ! Import User model
// const User = require('../../model/User');


// // ! Signup page
// router.get('/signup', (req, res) => {
//     res.send('signup page');
// });


// // ! Signup handle
// router.post('/signup', (req, res) => {
    
//     // ! Destructure request body
//     const { name, email, password } = req.body;
//     let errors = [];

//     // ! Check required fields 
//     if(!name || !email || !password){
//         errors.push({msg:'Please fill all the fields'});
//     }

//     // TODO:   ADDITIONAL CHECKS AFTER PROPER MODELS AND FORMS


//     if(errors.length>0){
//         // TODO: check how to send errors[]
//         res.send();
//     } else{
//         // ! Validation passed

//         // !Search if username already exists in db
//         User.findOne({email:email})
//         .then(user => {
//             if(user){
//                 // ! User with that email already exists
//                 errors.push({msg: 'that email is already re'})
//             }
//         })
//         .catch(err => console.log(err));
//     }
// });


// // ! Signin page
// router.get('/signin', (req, res) => {
//     res.send('signin page');
// });



// // ! Export router
// module.exports = router;