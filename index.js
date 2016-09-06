var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');  

mongoose.connect("mongodb://localhost/battleship");
var Turn = mongoose.model("Turn", new mongoose.Schema({
  text: String
}));

app.get("/", function (req, res) {
  // res.send('<h1>Hello World</h1>');
  res.sendfile('index.html');
  // res.sendFile(__dirname + '/index.html');
});

app.get("/api/turns", function (req, res) {
  Turn.find({}).lean().exec().then(function (turns) {
    res.json(turns);
  })
});

io.on('connection', function(socket){
  socket.on('battleship turn', function(trn){
    io.emit('battleship turn', trn);
    if (trn) Turn.create({text: trn});
  // console.log('a user connected');
  // socket.on('disconnect', function(){
  //   console.log('user disconnected');
  });
  // });
});

http.listen(3000, function () {
  console.log("listening on *:3000");
})
