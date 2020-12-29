import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import MessageForm from './MessageForm';
import { loadChat } from '../../../actions';

const Chats = (props) => {

  const [chat, setChat] = useState([]);
  const receiver = JSON.parse(localStorage.getItem('receiver'));
  const {currentUser, loadChat, socket} = props;

  socket.on('loadChat', () => loadChat(currentUser._id, receiver.id).then(response => {
    if(response.lenth>0) setChat(response[0].messages);
  }));
  

  useEffect(()=>loadChat(currentUser._id, receiver.id)
  .then(response => {
    if(response.length > 0){
      setChat(response[0].messages);
    };    
  }),[]);

  const renderChat = (chat) => {
    if(chat.length>0){
      return chat.map(message => {
        let areWe = message.sender===currentUser._id;
        let classes = `list-group-item list-group-item-${areWe ?"info":"dark"}`;
        let name = areWe?currentUser.username:receiver.username;
        return (
          <div key={message._id}>
            <hr/>
            <li className={classes}>
              <div>{name}</div>
              <div>{message.time}</div>
              <div>{message.text}</div>
            </li>
            <hr/>
          </div>          
        );
      });
    } else {
      return (
        <div className="list-group-item list-group-item-danger">No messages available. Start talking with {receiver.username}</div>
      );
    }
  }

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>Chat with {receiver.username}</h1>
      </header>
      <main className="chat-main">
      <ul className="list-group">
        {renderChat(chat)}
      </ul>
      </main>
      <MessageForm receiverId={receiver.id}/>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  socket: state.auth.socket
});

export default connect(mapStateToProps, { loadChat })(Chats);