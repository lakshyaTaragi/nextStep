import React from 'react';


const Chats = () => {
    return (
        <div className="chat-container">
    <header className="chat-header">
      <h1><i className="fas fa-smile"></i>Chat with that person</h1>
      <a href="index.html" className="btn">Leave Room</a>
    </header>
    <main className="chat-main">
      <div className="chat-sidebar">
        <h3><i className="fas fa-comments"></i> Room Name:</h3>
        <h2 id="room-name"></h2>
        <h3><i className="fas fa-users"></i> Users</h3>
        <ul id="users"></ul>
      </div>
      <div className="chat-messages">

      </div>
    </main>
    <div className="chat-form-container">
      <form id="chat-form">
        <input
          id="msg"
          type="text"
          placeholder="Enter Message"
          required
          autocomplete="off"
        />
        <button className="btn"><i className="fas fa-paper-plane"></i> Send</button>
      </form>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qs/6.9.4/qs.min.js" integrity="sha512-BHtomM5XDcUy7tDNcrcX1Eh0RogdWiMdXl3wJcKB3PFekXb3l5aDzymaTher61u6vEZySnoC/SAj2Y/p918Y3w==" crossorigin="anonymous"></script>
  </div>

//   <script src="/socket.io/socket.io.js"></script>
//   <script src="js/main.js"></script>
    );
};



export default Chats;