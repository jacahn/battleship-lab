var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/chat");
var Message = mongoose.model("Message", new mongoose.Schema({
  text: String
}));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get("/api/messages", function (req, res) {
  Message.find({}).lean().exec().then(function (messages) {
    res.json(messages);
  })
})

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    if (msg) Message.create({text: msg});
  });
});

http.listen(3000, function () {
  console.log("listining on *:3000");
})
