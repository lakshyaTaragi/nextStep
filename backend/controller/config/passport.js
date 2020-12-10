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
                if(!user) {
                    return done(null, false, {message: 'This username is not registered'});
                }

                // Match password
                bcrypt.compare(password, user.password, (err, isMatched) => {
                    if(err) throw err;
                    if(isMatched) return done(null, user);
                    else return done(null, false, {message:'Password is incorrect'});
                });
            });
        })
    );
};

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
});