import React from 'react';
import MessageForm from './MessageForm';


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
    </div>
  );
};



export default Chats;