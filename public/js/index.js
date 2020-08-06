let socket = io(); //creates our connection to the server (send and receive);

socket.on('connect', function() {
  console.log('Server is connected'); // prints whenever the client connects to a server

  socket.emit('createMessage', {
    from: 'Jacob',
    text: 'Wassup'
  });
});

socket.on('disconnect', function() {
  console.log('Server is disconnected');
});

socket.on('newMessage', function(message) {
  console.log(`New message received from ${message.from}: ${message.text}`, message);
});
