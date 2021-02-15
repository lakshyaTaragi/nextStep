import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { loadChat, unreadInfo } from '../../../actions';
import MessageForm from './MessageForm';
import ChatHead from '../../ChatHead';

const Chats = (props) => {

  const [chat, setChat] = useState([]);
  const [roomId, setRoomId] = useState('');
  const receiver = props.location.state;

  const {currentUser, loadChat, socket, unreadInfo} = props;

  const loadChatAndSet = () => {
    loadChat(currentUser._id, receiver._id)
    .then(response => {
      console.log(response);
      if(response.messages.length > 0) {
        setChat(response.messages);
        // setRoomId(response._id);
        unreadInfo(response._id).then(res => console.log(res));
      } 
    });
  }
  
  useEffect(() => {
    loadChatAndSet();    
    socket.on('loadChat', () => loadChatAndSet());
  }, []);

  const renderChat = (chat) => {

    // var unreadMessagesStart = false;

    if(chat.length>0){

      return chat.map(message => {
        
        let areWe = message.sender===currentUser._id;
        
        let classes = `list-group-item list-group-item-${areWe ?"info message-right":"light message-left"} rounded-pill d-inline-flex shadow-sm p-3 mb-2 rounded`;
        
        let name = areWe?currentUser.username:receiver.username;

        // if(!message.isRead) unreadMessagesStart = true; //! some special appearance to unread messages
        return (
          <div>
            {!message.isRead && !areWe ? <hr/> : null}
            <li className={classes} key={message._id}>
              <div><b>{name}  {message.time}</b> <br/>{message.text}</div>
            </li>
          </div>       
        );

      });

    } else if(chat.length===0) {

      return (
        <div className="list-group-item list-group-item-danger">
          Start talking with {receiver.name}
        </div>
      );

    } else {

      return (
        <div class="ui segment">
          <div class="ui active centered inline loader"></div>
          <p></p>
        </div>
      );

    }

  }

  return (

    <div className="ui raised very padded text container segment">
      
      <header className="ui header">
        <h1>{receiver.name}</h1>
        @{receiver.username}
      </header>

      <main className="chat-main">

        <ul className="list-group">
          {renderChat(chat)}
        </ul>

        <ChatHead roomId={roomId}/>

      </main>

      <MessageForm receiverId={receiver._id}/>
      
    </div>

  );

};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  socket: state.auth.socket
});

export default connect(mapStateToProps, { loadChat, unreadInfo })(Chats);

