"use strict"
const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')


function Item() {
  this.num = 0
  this.title = ''
  this.director = ''
  this.year = 0
  this.country = ''
  this.ranking = 0
  this.describe = ''
}

const seperate = function(p) {
  let dir = p.split('导演: ')[1].split('&nbsp;')[0]
  let year = p.split('\n                            ')[2].split('&nbsp;')[0]
  let country = p.split('\n                            ')[2].split('&nbsp;/&nbsp;')[1]
  return [dir, year, country]
}

const itemFromDiv = function(div) {
  const options = {decodeEntities: false}
  const e = cheerio.load(div, options)
  let item = new Item()
  item.title = cheerio.load(e('.title')[0]).text()
  let p = e('p').text()
  let sep = seperate(p)
  item.num = e('em').text()
  item.director = sep[0]
  item.year = sep[1]
  item.country = sep[2]
  item.ranking = e('.rating_num').text()
  item.describe = e('.inq').text()
  // console.log(item)
  return item
}

const itemsFromBody = function(body) {
  const options = {decodeEntities: false}
  const e = cheerio.load(body, options)
  const divs = e('.item')
  const answers = []
  for (let i = 0; i < divs.length; i++) {
    // console.log(`******这是第${i}个item`)
    answers.push(itemFromDiv(divs[i]))
  }
  console.log('item', answers)
  return answers
}

const __top250 = function() {
  const url = `https://movie.douban.com/top250?start=${0}&filter=`
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
        const answers = itemsFromBody(body)
        return answers
    } else {
        console.log('*** ERROR 请求失败 ', error)
    }
  })
}

__top250()
// exports.top250 = __top250
