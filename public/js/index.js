
let socket = io(); //creates our connection to the server (send and receive);

socket.on('connect', function() {
  console.log('Server is connected'); // prints whenever the client connects to a server
});

socket.on('disconnect', function() {
  console.log('Server is disconnected');
});

socket.on('newMessage', function(message) {
  console.log(`New message received from ${message.from}: ${message.text}`, message);
  let li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  let li = jQuery('<li></li>');
  let a = jQuery('<a target="_blank">My current location</a>');
  
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function() {

  });
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if(!navigator.geolocation) {
    return alert('Your browser does not suppport Geolocation, use an updated Chrome Browser');
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    alert('Unable to fetch location.');
  });
});