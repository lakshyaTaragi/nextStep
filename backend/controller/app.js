const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');


const app = express();

// !Checkout app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const PORT = process.env.PORT || 5000;

// Passport config 
require('./config/passport')(passport);


// DB config
const db = require('./config/keys').MongoURI;
// Connect to Mongo
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// express-session middleware
app.use(
    session({
        secret:'my_secret',
        resave: true,
        saveUninitialized: true
    })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/auth', require('./routes/auth'));


app.listen(PORT, console.log(`Server running on port ${PORT}`));