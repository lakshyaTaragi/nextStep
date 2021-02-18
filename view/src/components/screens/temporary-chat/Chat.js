import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import MessageForm from './MessageForm';
import { loadChat, setRead } from '../../../actions';

const Chats = (props) => {

  const [chat, setChat] = useState(false);

  const {currentUser, loadChat, socket, setRead,    //a.c.
    receiver} = props;                              //parent

  const loadChatAndSet = (mounted) => {
    
    loadChat(currentUser._id, receiver._id)
    .then(response => {
      setRead(currentUser._id, receiver._id);
      const {messages} = response;
      if(mounted) {
        if(messages && messages.length > 0){
          setChat(messages);
        }else{
          setChat([]);
        }
      }

    });

  } 
  
  useEffect(() => {
    
    let mounted = true;
    
    loadChatAndSet(mounted);

    socket.on('loadChat', (newMessage) => 
    setChat(old => {
      var i=true, x=old.length-1;
      while(i && x>=0){
        if(!old[x].isRead && old[x].receiver==currentUser._id){
          old[x] = {...old[x], isRead: true};
          x--;
        }else{
          i=false;
        }
      }
      setRead(currentUser._id, receiver._id);
      return [
        ...old, 
        newMessage
      ];
    }));
    
    return () => {
      mounted = false;
      socket.removeListener('loadChat', setChat);
    };

  }, []);

  const renderChat = (chat) => {

    // var unreadMessagesStart = false;

    if(chat.length>0){

      return chat.map(message => {
        
        let areWe = message.sender===currentUser._id;
        
        let classes = 
        `ui compact ${areWe ?"blue":""} message  rounded-pill d-inline-flex shadow-sm p-3 mb-2 rounded`;
        
        let name = areWe?currentUser.username:receiver.username;

        // if(!message.isRead) unreadMessagesStart = true; //! some special appearance to unread messages
        return (
          <div key={message._id} >
            {!message.isRead && !areWe ? <hr/> : null}
            <li className={classes}>
              <div><b>{name}  {message.time}</b> <br/>{message.text}</div>
            </li>
          </div>       
        );

      });

    } else if(chat.length===0) {

      return (
        <div className="list-group-item list-group-item-danger">
          Start talking with {receiver.username}
        </div>
      );

    }else if (!chat) {

      return (
        <div className="ui segment">
          <div className="ui active centered inline loader"></div>
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

      </main>

      <MessageForm receiverId={receiver._id}/>
      
    </div>

  );

};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  socket: state.auth.socket
});

export default connect(mapStateToProps, {
  loadChat, 
  setRead
})(Chats);
