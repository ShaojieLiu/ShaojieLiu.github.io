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
  socket.id = Math.random()
  let rand = Math.floor(Math.random() * 7) + 1
  socket.src = `./src/${rand}.jpg`

  let allTip = function(msg) {
    let time = new Date().Format("hh:mm:ss")
    console.log(msg)
    io.sockets.emit('newTip', {
      time: time,
      msg: msg
    })
  }

  let othersTip = function(msg) {
    let time = new Date().Format("hh:mm:ss")
    console.log(msg)
    let obj = {
      time: time,
      msg: msg
    }
    socket.broadcast.emit('newTip', obj)
  }

  let selfTip = function(msg) {
    let time = new Date().Format("hh:mm:ss")
    let obj = {
      time: time,
      msg: msg
    }
    socket.emit('newTip', obj)
  }

  let sendStatus = function() {
    let obj = {
      name: socket.username,
      id: socket.id,
      src: socket.src,
    }
    socket.emit('status', obj)
  }

  let newList = function() {
    console.log(usrList)
    io.sockets.emit('newList', usrList)
  }

  let newUsr = function(username) {

    socket.username = username

    let msg = `欢迎 [${socket.username}] 加入`
    othersTip(msg)

    sendStatus()
    // msg = `你的昵称是 [${socket.username}]`
    // selfTip(msg)

    let user = {
      id: socket.id,
      name: socket.username,
      src: socket.src
    }
    usrList.push(user)
    newList()
  }

  let newMsg = function(data) {
    // 转发
    let time = new Date().Format("hh:mm:ss")
    io.sockets.emit('newMsg', {
      name: socket.username,
      src: socket.src,
      time: time,
      msg: data
    })
  }

  let leave = function() {
    function isLeaving(ele) {return ele.id === socket.id}
    let index = usrList.findIndex(isLeaving)
    console.log('index', index)
    if (index != -1) {
      let leaver = usrList.splice(index, 1)[0]
      let msg = `[${leaver.name}] 离开了`
      allTip(msg)
      newList()
    }
  }

  socket.on('newUsr', (user) => newUsr(user))

  socket.on('newMsg', (data) => newMsg(data))

  socket.on('disconnect', leave)
})
