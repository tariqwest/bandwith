const app = require('./app');
const db = require('../db');
const ChatController = require('./controllers').Chats


const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log('Bandwith listening on port 3000!');
});

const socket = require('socket.io').listen(server);

socket.on('connection', (socket) => {
  console.log('A client just joined on', socket.id);
  socket.on('chat', (message) => {
    console.log(`** message from ${socket.id}: ${message}`);
  });
});

