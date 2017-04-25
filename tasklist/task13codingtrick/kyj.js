var log = function() {
    console.log.apply(console, arguments)
}

var e = function(selector) {
    return document.querySelector(selector)
}

var es = function(selector) {
	return document.querySelectorAll(selector)
}

var appendHtml = function(element, html) {
	element.insertAdjacentHTML('beforeend', html)
}

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

var addClass = function(element, className){
    if (!element.classList.contains(className)) {
        element.classList.add(className)
    }
}

var removeClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    }
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

var bindAll = function(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for(var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

// find 函数可以查找 element 的子元素
var find = function(element, selector) {
    return element.querySelector(selector)
}

// find 函数可以查找 element 的所有子元素
var findAll = function(element, selector) {
    return element.querySelectorAll(selector)
}

//ajax
var ajax = function(method, path, data, callback) {
  // 发送登录数据
  // 创建 AJAX 对象
  var r = new XMLHttpRequest()
  // 设置请求方法和请求地址
  r.open(method, path, true)
  // 设置发送的数据的格式
  r.setRequestHeader('Content-Type', 'application/json')
  // 注册响应函数
  r.onreadystatechange = function() {
      if (r.readyState === 4) {
          callback(r)
      }
  }
  r.send(data)
}

var time = function( z ) {
    if (z === undefined) { z = new Date() }
    var x = z.toString()
    var zh     = '天一二三四五六'
    var Year   = x.slice(11,15)
    var Month  = z.getMonth() + 1
    var Day    = x.slice(8,10)
    var Hour   = x.slice(16,18)
    var Minute = x.slice(19,21)
    var Second = x.slice(22,24)
    var Week   = zh[ z.getDay() ]
    if ( String(Month).length === 1) {
        Month = '0' + Month
    }
    return `${Year}年${Month}月${Day}日 ${Hour}时${Minute}分${Second}秒 星期${Week}`
}
