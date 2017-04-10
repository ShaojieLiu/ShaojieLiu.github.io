var express = require('express')
"use strict"
const request = require('request')
const cheerio = require('cheerio')
var app = express()
var sendHtml = function(path, response) {
  var fs = require('fs')
  var options = {
      encoding: 'utf-8'
  }
  fs.readFile(path, options, function(err, data){
      console.log(`发送html文件 ${path} `)
      response.send(data)
  })
}
var order = 0;
app.get('/', function(request, response) {
    console.log(`浏览器请求: localhost:3000/`)
    var path = './瀑布流.html'
    sendHtml(path, response)
})
app.get('/more', function (req, res) {
  var srcArray = []
  var randArray = []
  for (var i = 0; i < 10; i++) {
    random = Math.floor(Math.random() * 900)
    // console.log('发送list数据', random)
    var src = `http://7xr4g8.com1.z0.glb.clouddn.com/${random}`
    srcArray.push(src)
    randArray.push(random)
  }
  res.send(JSON.stringify(srcArray))
  console.log(srcArray)
})
app.listen(3000)
