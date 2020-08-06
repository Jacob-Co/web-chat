// local nodes
require('./config/config');
const {generateMessage} = require('./utils/message');

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

// event listener
// when you run this hello is conosled log after connecting
io.on('connection', (socket) => {
  console.log('New User connected');

  socket.on('createEmail', (newEmail) => {
    console.log('CreateEmail', newEmail);
  })

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined'));

  socket.on('createMessage', (newMessage, callback) => {
    console.log('createMessage', newMessage);
    // io.emit('newMessage', { //emits to everyone
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime()
    // })
    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
    callback('This is from the server');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

