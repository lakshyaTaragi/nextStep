const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const _ = require('lodash');


const app = express();

const {userComesOnline, fetchOnlineUsers} = require('./chat/utils/users');

app.use(cors());
// !Checkout app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());


// Passport config 
require('./config/passport')(passport);


// DB config
const db = require('./config/keys').MongoURI;
// Connect to Mongo
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));


// express-session middleware
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);


// passport middleware
app.use(passport.initialize());
app.use(passport.session());


const PORT = process.env.PORT || 5000;

// Routes //! later try one for chat
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));

// socket.io inclusion
const server = app.listen(PORT, console.log(`Server running on port ${PORT}`));

const io = require('socket.io')(server, {
  cors:{
    origin:'*',
    methods: ["GET", "POST"]
  }
});

// Import User model to save messages
const User = require('../model/User');

//TODO : later we will use the friend request functionality 
io.on('connection', socket => {
  
  socket.on('privateRoom', room => {
    socket.join(room);
  });

  socket.on('newMessage', (message, senderId, receiverId) => {
    // save in both users' dbs
    // * save in sender's db


    // User.updateOne(
    //   {_id:senderId},
    //   {

    //   },
    // );



    // emit to the other person
    //  
  });


  //   socket.broadcast.emit('onlineUsers',clients);



});