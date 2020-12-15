const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 8000;

const bot = 'bot';

io.on('connection', (socket) => {
    console.log('new ws connection...');
});

server.listen(PORT, console.log(`chat server running on port ${PORT}`))