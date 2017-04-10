var express = require('express')
"use strict"
const request = require('request')
const cheerio = require('cheerio')
const mooc = require('./imooc.js')

// mooc.mooc(800)

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
    console.log(`浏览器请求: localhost:2000/`)
    var path = './瀑布流.html'
    sendHtml(path, response)
})

let spider = function (type, req, res) {
  var srcArray = []
  var randArray = []
  if (type == 'fengjing') {
    for (var i = 0; i < 10; i++) {
        random = Math.floor(Math.random() * 900)
        // console.log('发送list数据', random)
        var src = `http://7xr4g8.com1.z0.glb.clouddn.com/${random}`
      srcArray.push(src)
      randArray.push(random)
    }
  res.send(JSON.stringify(srcArray))
  console.log(srcArray)
  }

  if (type == 'meizi') {
    let jandan = function() {
      console.log('jandan')
      let rand = Math.floor(Math.random() * 2000)
      let url = `http://jandan.net/ooxx/page-${rand}#comments`
      let cookie = ''
      let useragent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
      let headers = {
        'Cookie': cookie,
        'User-Agent': useragent,
      }
      let options = {
        url: url,
        headers: headers,
      }
      request(options, function(error, response, body) {
        // 检查请求是否成功, statusCode 200 是成功的代码
        if (error === null && response.statusCode == 200) {
            let answers = function (body) {
              console.log('bodybody')
              const options = {decodeEntities: false}
              const e = cheerio.load(body, options)
              const divs = e('.commentlist img')
              const answers = []
              for (let i = 0; i < divs.length; i++) {
                // console.log(`******这是第${i}个item`)
                answers.push('http:' + cheerio.load(e('.commentlist img')[0]).html().split('src="')[1].split('"')[0])
              }
              console.log('item', answers)
              res.send(JSON.stringify(answers))
              return answers
            }
            answers(body)

        } else {
            console.log('*** ERROR 请求失败 ', error)
        }
      })
    }
    jandan()
  }
  if (type == 'mooc') {
    
  }
}

app.get('/more/fengjing', function (req, res) {
  spider ('fengjing', req, res)
})
app.get('/more/meizi', function (req, res) {
  spider ('meizi', req, res)
})
app.get('/more/mooc', function (req, res) {
  spider ('mooc', req, res)
})
app.listen(3001)
