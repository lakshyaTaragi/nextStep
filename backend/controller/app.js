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
const ChatRoom = require('../model/ChatRoom');
const { ObjectId } = mongoose.Types;


//TODO : later we will use the friend request functionality 
io.on('connection', socket => {
  
  socket.on('privateRoom', room => {
    socket.join(room);
  });

  socket.on('newMessage', (message, senderId, receiverId, time) => {

    // search if the receiver exists in your chatrooms
      User.exists(
        {"_id":senderId ,"chatRooms.person": receiverId},
        (err, result) =>{
          if(err) throw err;
          if(result) {
            ChatRoom.updateOne(
              {"members": {$in: [senderId, receiverId]}},
              {$push: {messages: {
                sender: senderId, receiver: receiverId, text: message, time: time
              }}}, err=>{if(err) throw err; else console.log("message pushed to room")}
            );
          } else {
            const newChatRoom = new ChatRoom({
              members:[{_id: ObjectId(senderId)}, {_id: ObjectId(receiverId)}],
              messages: [{sender: senderId, receiver: receiverId, text: message, time: time}]
            });
            // add this chat room to both your and receiver's chatroom lists
            newChatRoom.save()
            .then((createdRoom)=>{
              console.log("new room created");
              // in sender's
              User.updateOne({_id:senderId},
                { $push: {
                    chatRooms: {
                      person: receiverId,
                      chatRoom: createdRoom._id
                    }
                }}, (err)=>{if(err) throw err; console.log("room pushed for sender");});
              // in receiver's
              User.updateOne({_id:receiverId},
                { $push: {
                    chatRooms: {
                      person: senderId,
                      chatRoom: createdRoom._id
                    }
                }}, (err)=>{if(err) throw err; console.log("room pushed for receiver");});
            });
          };
        }
      );

    // emit to the receiver to make a chat reload;
    io.to(receiverId).to(senderId).emit('loadChat'); 
  });


  //   socket.broadcast.emit('onlineUsers',clients);



});