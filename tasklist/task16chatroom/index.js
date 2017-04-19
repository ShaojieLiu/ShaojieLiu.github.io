// file: index.js
var express = require('express');
var app = express()
  , io = require('socket.io')(server)
  , fs = require('fs')

console.log(__dirname)
app.use(express.static(__dirname + '/public'));

var server = require('http').createServer(app);
server.listen(3000, function () {
  console.log('Server listening at port %d', 3000);
});
