// make connection
var socket = io.connect('http://localhost:3000');

// query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');
var allHandles = [];
//emit events
btn.addEventListener('click', function() {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
});

message.addEventListener('keypress', function() {
  socket.emit('typing', {
    handle: handle.value
  });
});
// listen for events.
socket.on('chat', function(data) {
  if (allHandles.length == 0) {
    feedback.innerHTML = '';
  } else {
    // allHandles = allHandles.splice(allHandles.indexOf(data.handle));
    feedback.innerHTML = displayTypings();
  }
  output.innerHTML += '<p><strong>' + data.handle + ':</strong> ' + data.message + '</p>';
});

socket.on('typing', function(data) {
  allHandles.push(data.handle);
  console.log(allHandles);
  feedback.innerHTML = displayTypings();
});

var displayTypings = function() {
  let prefix = '<p><i>';
  let postfix = ' is typing...</i></p>';
  let str = '';
  console.log('from displaythings', allHandles);
  for (let idx = 0; idx < allHandles.length; idx++) {
    str += allHandles[idx] + ', ';
  }
  console.log(str);
  return prefix + str + postfix;
};
