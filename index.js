var express = require('express');
var socket = require('socket.io');

const app = express();

const server = app.listen(3000, function() {
  console.log('listening on request port 3000');
});

app.use(express.static('public'));

var io = socket(server);
io.on('connection', function(socket) {
  console.log('made a socket connection', socket.id);

  socket.on('chat', function(data) {
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function(data) {
    socket.broadcast.emit('typing', data);
  });
});
