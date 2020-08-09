// local nodes
require('./config/config');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

// 3rd party nodes
const express = require('express'); // express uses a builtin node module to create its server
const socketIO = require('socket.io');

// Core node
const path = require('path');
const http = require('http');

// create new instance of express server
let app = express();
// create a new instance of http server
let server = http.createServer(app);
//configure server to use socket io
let io = socketIO(server);


server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
}); 

// contains a call to http.createServer(app);
// app.listen(process.env.PORT, () => {
  //   console.log(`Listening on port ${process.env.PORT}`);
  // }); 
  
// Exposes public folder to be used
const publicPath = path.join(__dirname, '/../public');
app.use(express.static(publicPath));

// newUsers
let users = new Users();

// event listener
// when you run this hello is conosled log after connecting
io.on('connection', (socket) => {
  console.log('A new user is trying to connect');

  socket.on('createEmail', (newEmail) => {
    console.log('CreateEmail', newEmail);
  })

  socket.on('createMessage', (newMessage, callback) => {
    let user = users.getUser(socket.id);

    if (user && isRealString(newMessage.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text));
    }

    callback('This is from the server');
  });

  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      console.log(`${user.name} disconnected`);
    }
  });

  socket.on('createLocationMessage', (coords) => {
    let user = users.getUser(socket.id);
    if(user) {
      io.to(user.room)
        .emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room name are required.')
    } else {
      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);

      io.to(params.room).emit('updateUserList', users.getUserList(params.room));
      socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
      socket.broadcast.to(params.room)
        .emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
      console.log(`User ${params.name} joined room ${params.room}`)
      callback();
    }
  })
});


