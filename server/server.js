// local nodes
require('./config/config');

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

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});