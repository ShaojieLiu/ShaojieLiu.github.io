// file: index.js
let express = require('express')
let app = express()
  , fs = require('fs')
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

app.use(express.static(__dirname + '/public'))

let server = app.listen(3000, function () {
  console.log('聊天室服务器监听端口: %d', 3000)
})

let io = require('socket.io').listen(server)
let usrList = []

io.on('connection', function (socket) {
  // 新人加入
  socket.on('newUsr', function (username) {
    socket.username = username
    let time = new Date().Format("hh:mm:ss")
    let msg = `欢迎 [${socket.username}] 加入`
    console.log(msg)
    io.sockets.emit('newTip', {
      time: time,
      msg: msg
    })
    usrList.push(username)
    io.sockets.emit('usrList', usrList)
  })

  socket.on('newMsg', function (data) {
    // 转发
    console.log('转发')
    let time = new Date().Format("hh:mm:ss")
    io.sockets.emit('newMsg', {
      name: socket.username,
      time: time,
      msg: data
    })
  })
})
