const http = require('http');
const socketio = require('socket.io');
const passportSocketIo = require('passport.socketio');
const cookieParser = require('cookie-parser');
const app = require('./app');
const middleware = require('./middleware');
const ChatController = require('./controllers').Chats;


const PORT = process.env.PORT || 3000;

const server = http.Server(app);
const io = socketio(server.listen(PORT, () => {
  console.log('Bandwith listening on port 3000!');
}));

io.use(passportSocketIo.authorize({
  key: 'connect.sid',
  secret: 'more laughter, more love, more life',
  store: middleware.auth.Store,
  passport: middleware.passport,
  cookieParser,
}));

const userToClientMap = {};

io.on('connection', (socket) => {
  console.log(`** A client joined -- socketId: ${socket.id}, userId: ${socket.request.user.id}, name: ${socket.request.user.first} ${socket.request.user.last}`);
  userToClientMap[socket.request.user.id] = socket.id;
  socket.on('chat:sent', (message) => {
    ChatController.socketCreate(message, socket, userToClientMap);
  });
});
