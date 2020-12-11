const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../../model/User');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({usernameField: 'username'}, (username, password, done) => {
            // Match User
            User.findOne({username:username})
            .then(user => {
                
                // User not found
                if(!user) {
                    return done(null, false, {message: 'Username or Password is incorrect'});
                }

                // User found --> Match password
                bcrypt.compare(password, user.password, (err, isMatched) => {
                    if(err) throw err;
                    if(isMatched) return done(null, user, {message: 'Logged in as '+username});
                    else return done(null, false, {message:'Username or Password is incorrect'});
                });
            })
            .catch(err => console.log(err));
        })
    );
    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
};

