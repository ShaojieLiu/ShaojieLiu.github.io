console.log(`\n\t 20.js\n\t你好,这里是todo应用的后端\n`)

var fs = require('fs')
fs.readdir('.', function(err, files) {
    console.log(`\t以下是当前目录的文件:\n\t${files}\n`)
})
// 写入假数据
// var fakeData = [
//     {task:"如果能重来",
//         stat:1,
//         time:"2016年10月31日19:47:44"},
//     {task:"我要选李白",
//         stat:1,
//         time:"2016年10月31日19:47:49"},
// ]
// fs.writeFile('./list.txt', JSON.stringify(fakeData), function() {})
// Express 框架
var express = require('express')
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
// 用 get 定义一个给用户访问的网址
// request 是浏览器发送的请求
// response 是我们要发给浏览器的响应
app.get('/', function(request, response) {
    // var r = `
    // `
    // fs 是 file system 文件系统的缩写
    // fs 是 node 中处理文件和目录的库
    // var fs = require('fs')
    // var options = {
    //     encoding: 'utf-8'
    // }
    // fs.readFile('index.html', options, function(err, data){
    //     console.log('读取的html文件内容是', data)
    //     response.send(data)
    // })
    console.log(`浏览器请求: localhost:3000/`)
    var path = './todo.html'
    sendHtml(path, response)
})
// app.get('/', function (req, res) {
//     // res.send(`\tHello, Jason!\n\t/todo/all是你的ToDo列表`)
//     var template = `
//         <script src="http://cdn.bootcss.com/jquery/3.1.1/jquery.js"></script>
//         <script>
//             var ajax = function() {
//                 $.ajax({
//                     type: 'get',
//                     url: '/todo/all',
//                     success: function(r){
//                         console.log(r)
//                     }
//                 })
//             }
//         </script>
//         <body>
//             <h1>Hello Jason</h1>
//         <body>
//     `
//     res.send(template)
// });
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.post('/todo/save', function (req, res) {
    var data = Object.keys(req.body)[0]
    dataString = JSON.stringify(data)
    console.log(typeof(data), data)
    console.log('stringify', dataString)
    fs.writeFile('./list.txt', data, function() {
        console.log('文件已写入')
    })
})
app.get('/todo/all', function (req, res) {
    // var list = [
    //     {id:1, task:'吃饭'}
    // ]
    fs.readFile('./list.txt', 'utf-8', function(err, list){
        console.log('发送list数据', list)
        res.send(list)
    })
})
app.listen(3000)
