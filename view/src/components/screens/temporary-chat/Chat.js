import React from 'react';
import { connect } from 'react-redux';

import MessageForm from './MessageForm';
import { loadThisChat } from '../../../actions';

const Chats = (props) => {

  const receiver = JSON.parse(localStorage.getItem('receiver'));

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>Chat with {receiver.username}</h1>
      </header>
      <main className="chat-main">
      <ul className="list-group">
        <li className="list-group-item list-group-item-primary">load messages from the db</li>
        <li className="list-group-item list-group-item-primary">show in order</li>
        <li className="list-group-item list-group-item-primary">colour according to sender </li>
      </ul>
      </main>

      <MessageForm receiverId={receiver.id}/>

      <button onClick={()=>props.loadThisChat(receiver.id)}> Load Chat </button>

    </div>
  );
};




export default connect(null, { loadThisChat })(Chats);