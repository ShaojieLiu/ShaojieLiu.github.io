"use strict"
const savePath = './'
let courseTitle = ''
let downloadCount = 8


const readline = require('readline')
const request = require('request')
const cheerio = require('cheerio')
const superagent = require('superagent')
const fs = require('fs')
const decode = {decodeEntities: false}


const url2video = function(url, filename, callback) {
  filename = filename.replace(/\(.*\)/,'') + '.mp4'

  var dirPath = savePath + courseTitle + '/'
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  // console.log('开始下载第' + downloadCount + '个视频' + filename + ' 地址: ' + url);
  var writeStream = fs.createWriteStream(dirPath + filename);
  writeStream.on('close', function() {
    callback(filename);
  })

  var req = superagent.get(url)
  req.pipe(writeStream);
}


const getVideoUrl = function(videos, callback) {
  const video = videos[downloadCount]
  superagent
    .get(video.url)
    .end(function(err, res) {
      var url = JSON.parse(res.text)
      if(url.result == 0) {
        url = url.data.result.mpath[0]
        // console.log(url)
        if (url != undefined) {
          callback(url, video.title, function() {
            console.log('下载完成第' + downloadCount + '个视频' + video.title + '/n地址: ' + url);
            if (downloadCount++ < videos.length - 1) {
              getVideoUrl(videos, url2video)
            }else {
              console.log('全部下完了, 拜拜')
            }
          })
        } else {
          if (downloadCount++ < videos.length - 1) {
            getVideoUrl(videos, url2video)
          }
        }
      }
    })
}


const node2chapter = function(chapterList) {
  let videos = []
  for (var i = 0; i < chapterList.length; i++) {
    const chapter = cheerio.load(chapterList[i], decode)
    // console.log(chapter.html())
    const title = chapter.html().split('type"></i>')[1].split('\r\n')[1].split('').slice(36).join('')
    const id = chapter.html().split('data-media-id="')[1].split('">')[0]
    const url = `http://www.imooc.com/course/ajaxmediainfo/?mid=` + id + `&mode=flash`
    console.log('名字是', title, '地址是', url)
    videos.push({title: title, url: url})
  }
  // console.log(videos)
  // for (let i = 1; i < videos.length; i++) {
  getVideoUrl(videos, url2video)
  // }
}


const mooc = function(num) {
  const url = `http://www.imooc.com/learn/${num}`
  const cookie = ''
  const useragent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
  const headers = {
    'Cookie': cookie,
    'User-Agent': useragent,
  }
  const options = {
    url: url,
    headers: headers,
  }
  request(options, function(error, response, body) {
    // 检查请求是否成功, statusCode 200 是成功的代码
    if (error === null && response.statusCode == 200) {
      courseTitle = cheerio.load(body, decode)('h2').text()
      console.log(courseTitle)
      const content = cheerio.load(body, decode)('.mod-chapters').html()
      // console.log(content.html())
      const chapterList = cheerio.load(content, decode)('li')
      // console.log(chapterList.html())
      node2chapter(chapterList)
    } else {
        console.log('*** ERROR 请求失败 ', error)
    }
  })
}


const __main = function() {
  let rl = readline.createInterface({
      input:process.stdin,
      output:process.stdout
  })
  rl.question("你要下载的课程编号是?\n",function(num){
      console.log('请稍等, 正在链接中...')
      rl.close()
      mooc(num)
  })
}
// __main()


exports.mooc =  mooc
