let Cookie = function() {
  let self = this
  // Cookie 的所有键
  this.keysOfCookie = function() {
    // console.olog(document.cookie)
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    var keys = []
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) == ' ') {
          c = c.substring(1)
      }
      keys.push(c.split('=')[0])
    }
    return keys
  }
  // 增加 删除 或 覆盖 某个cookie
  this.setCookie = function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000))
    var expires = "expires="+ d.toUTCString()
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;"
  }
  // 访问 某个 Cookie
  this.getCookie = function(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1)
          // console.olog(c)
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  // 清空 Cookies
  this.delcookies = function() {
    document.querySelectorAll('.window-storage-display-cookie').forEach(function(ele) {
      ele.remove()
    })
    self.keysOfCookie().forEach(function(element) {
      self.setCookie(element, '', -10)
    })
  }
}
