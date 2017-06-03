// const app = require('./app');
// const db = require('../db');
// const ChatController = require('./controllers').Chats

// const PORT = process.env.PORT || 3000;

// const server = app.listen(PORT, () => {
//   console.log('Bandwith listening on port 3000!');
// });

// const socket = require('socket.io').listen(server);

// socket.on('connection', (socket) => {
//   console.log('A client just joined on', socket.id);
//   socket.on('chat', (message) => {
//     console.log(`** message from ${socket}: ${message}`);
//     ChatController.socketCreate(message);
//   });
// });

const http = require('http');
const socketio = require('socket.io');
const passportSocketIo = require('passport.socketio');
const cookieParser = require('cookie-parser');
const app = require('./app');
const db = require('../db');
const middleware = require('./middleware');
const ChatController = require('./controllers').Chats


const PORT = process.env.PORT || 3000;

const server = http.Server(app);
const io = socketio(server.listen(PORT));

io.use(passportSocketIo.authorize({
  key: 'connect.sid',
  secret: 'more laughter, more love, more life',
  store: middleware.auth.Store,
  passport: middleware.passport,
  cookieParser: cookieParser,
}));

const userToClientMap = {};

io.on('connection', (socket) => {
  console.log(`A client just joined with socketId: ${socket.id}, userId: ${socket.request.user.id}`);
  userToClientMap[socket.request.user.id] = socket.id;
  socket.on('chat', (message) => {
    console.log(`** message from ${JSON.stringify(socket.request.user.id)}: ${message}`);
    ChatController.socketCreate(message, socket, userToClientMap);
  });
});


