const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const _ = require('lodash');


const app = express();

// const {userComesOnline, fetchOnlineUsers} = require('./chat/utils/users');

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
app.use('/image', require('./routes/image')); 

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

      const newMessage = {
        sender: senderId,
        receiver: receiverId, 
        text: message, 
        time: time, 
        isRead: false
      }

      ChatRoom.exists(
        { members: { $all: [senderId, receiverId] } },
        (err, result) => {
          if(err) throw err;

          if(result) {

            ChatRoom.findOneAndUpdate(
              { members: { $all: [senderId, receiverId] } },
              { $push: { messages: newMessage } },
              (err) => {
                if(err) throw err;
                console.log("message pushed to room");
                io.to(receiverId).to(senderId).emit('loadChat');
            });
              

          } 
          else {

            const newChatRoom = new ChatRoom({
              members: [ 
                { _id: ObjectId(senderId) }, 
                { _id: ObjectId(receiverId) }
              ],
              messages: [ newMessage ]
            });

            // add this chat room to both your and receiver's chatroom lists
            newChatRoom.save()
            .then((createdRoom) => {
              console.log("new room created");
              
              // in sender's
              const newSenderRoom = {
                person: receiverId,
                chatRoom: createdRoom._id
              };
              User.findByIdAndUpdate(
                senderId,
                { $push: {
                    chatRooms: newSenderRoom
                  }
                },
                (err) => {
                  if(err) throw err; 
                  console.log("room pushed for sender");
                  // io.to(senderId).emit('newRoom', newSenderRoom);
                }
              );

              // in receiver's
              const newReceiverRoom =  {
                person: senderId,
                chatRoom: createdRoom._id
              };
              User.findByIdAndUpdate(
                receiverId,
                { $push: {
                    chatRooms: newReceiverRoom
                  }
                },
                (err) => {
                  if(err) throw err; 
                  console.log("room pushed for receiver");
                  // io.to(receiverId).emit('newRoom', newReceiverRoom);
                  io.to(receiverId).to(senderId).emit('loadChat');
                  // inform users of a new chatRoom
                }
              );

            });
          };
        }
      );
             
  });
});