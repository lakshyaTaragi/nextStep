import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import MessageForm from './MessageForm';
import { loadChat } from '../../../actions';

const Chats = (props) => {

  const [chat, setChat] = useState([]);
  const receiver = JSON.parse(localStorage.getItem('receiver'));
  const {currentUser, loadChat, socket} = props;

  const loadChatAndSet = () => {
    loadChat(currentUser._id, receiver.id)
    .then(response => {
      if(response.length > 0){
        setChat(response[0].messages);
      } 
    });
  }
  
  useEffect(() => {
    loadChatAndSet();    
    socket.on('loadChat', () => loadChatAndSet());
  }, []);

  const renderChat = (chat) => {
    if(chat.length>0){
      return chat.map(message => {
        let areWe = message.sender===currentUser._id;
        let classes = `list-group-item list-group-item-${areWe ?"info message-right":"light message-left"} rounded-pill d-inline-flex shadow-sm p-3 mb-2 rounded`;
        let name = areWe?currentUser.username:receiver.username;
        return (
          <div>
            <li className={classes} key={message._id}>
              <div><b>{name}  {message.time}</b> <br/>{message.text}</div>
            </li>
          </div>       
        );
      });
    } else if(chat.length=0) {
      return (
        // TODO: HAVE A LOADER LATER
        <div className="list-group-item list-group-item-danger">
          No messages available. Start talking with {receiver.username}
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

