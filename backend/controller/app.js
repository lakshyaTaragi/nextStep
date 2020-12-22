const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const _ = require('lodash');


const app = express();

const {userComesOnline, fetchOnlineUsers} = require('./chat/utils/users');

// !Checkout app.use(express.urlencoded({ extended: false }));
app.use(cors());
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
    useUnifiedTopology: true
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
    // origin:'http://localhost:3000',
    origin:'*',
    methods: ["GET", "POST"]
  }
});

//TODO : later we will use the friend request functionality 
var clients = [];

io.on('connection', (socket)=>{

  socket.on('iAmOnline',(newUser)=>{
    
    socket.id = newUser._id;

    // add to clients[] only when not already present
    if(_.findIndex(clients,(client)=> client===newUser._id)===-1){
      clients.push(newUser._id);
    }
    console.log(clients);
  });

  socket.on('privateRoom',(room)=>{
    socket.join(room);
    socket.broadcast.emit('onlineUsers',clients);
  });
  
  socket.on('signout',()=>{
    _.remove(clients,client => client === socket.id);
    socket.disconnect();
    io.emit('onlineUsers',clients);
    console.log(clients);
  });

  
  socket.on('disconnect',()=>{
    _.remove(clients,client => client === socket.id);
    console.log(clients);
    io.emit('onlineUsers',clients);
  });



});