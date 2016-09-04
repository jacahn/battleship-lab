var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/chat");
var Message = mongoose.model("Message", new mongoose.Schema({
  text: String
}));

app.get("/", function (req, res) {
  // res.send('<h1>Hello World</h1>');
  res.sendfile('index.html');
  // res.sendFile(__dirname + '/index.html');
});

app.get("/api/messages", function (req, res) {
  Message.find({}).lean().exec().then(function (messages) {
    res.json(messages);
  })
})

io.on('connection', function(socket){
  socket.on('battleship turn', function(msg){
    io.emit('battleship turn', msg);
    if (msg) Message.create({text: msg});
  // console.log('a user connected');
  // socket.on('disconnect', function(){
  //   console.log('user disconnected');
  })
  // });
});

http.listen(3000, function () {
  console.log("listining on *:3000");
})
