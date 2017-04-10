"use strict"
let express = require('express')
let path = require('path')
let app = express()

let sendHtml = function(path, response) {
  var fs = require('fs')
  var options = {
      encoding: 'utf-8'
  }
  fs.readFile(path, options, function(err, data){
      console.log(`发送html文件 ${path} `)
      response.send(data)
  })
}

app.get('/', function(req, res) {
  console.log(`浏览器请求: localhost:2000/`)
  var path = './test.html'
  sendHtml(path, res)
})
app.get('/rand', function(req, res) {
  let random = Math.floor(Math.random() * 900)
  let src = `http://7xr4g8.com1.z0.glb.clouddn.com/${random}`
  res.send(JSON.stringify(src))
})

// express挂载静态目录
app.use('/', express.static('.'))
app.use('/css', express.static('css'))
app.use('/js', express.static('js'))
app.use('/fonts', express.static('fonts'))

app.listen(3001)
