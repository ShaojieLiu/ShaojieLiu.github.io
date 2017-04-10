let StorageWindow = function() {
  let pub = new Pub()
  let co = new Cookie()
  let self = this
  this.output = []

  this.sayLocalStorage = function() {
    document.querySelectorAll('.window-storage-display-localStorage').forEach(function(ele) {
      ele.remove()
    })
    for (key in window.localStorage) {
      let value = window.localStorage[key]
      // console.olog(key, value)
      document.querySelector('.window-storage-display').insertAdjacentHTML('beforeend', `
      <li class="window-storage-display-localStorage">
      <span class="glyphicon glyphicon-remove red" data-action=`+`localStorage_${key}`+`></span>
      &nbsp;[localStorage]~{${key}: ${value}}</li>`)
    }
  }

  this.sayCookies = function() {
    document.querySelectorAll('.window-storage-display-cookie').forEach(function(ele) {
      ele.remove()
    })
    const keys = co.keysOfCookie()
    if (keys[0] != '') {for (let vari of keys) {
      let val = co.getCookie(vari)
      document.querySelector('.window-storage-display').insertAdjacentHTML('beforeend', `
      <li class="window-storage-display-cookie">
      <span class="glyphicon glyphicon-remove red" data-action=`+`cookie_${vari}`+`></span>
      &nbsp;[cookie]~{${vari}: ${val}}</li>`)
    }}
  }

  this.refresh = function() {
    self.sayLocalStorage()
    self.sayCookies()
    document.querySelector('.window-storage-top>.active').click()
  }

  this._bind = function() {
    let tagGroup = ['localStorage', 'cookie']
    pub.tagSwitch('.window-storage', '.window-storage-top', tagGroup)

    // 监听删除按钮被点击
    document.querySelector('.window-storage-display').addEventListener('click', function(e) {
      if (e.target.classList.contains('red')) {
        let delArg = e.target.dataset.action.split('_')
        switch (delArg[0]) {

          case 'localStorage': {
            window.localStorage.removeItem(delArg[1])
            self.refresh()
          } break

          case 'cookie': {
            co.setCookie(delArg[1], '', -10)
            self.refresh()
          } break

          default: {}
        }
        e.target.parentNode.remove()
      }
    })

    // 两个刷新
    document.querySelector('.refresh').addEventListener('click', function() {
      let page = document.querySelector('.window-btn-top>.active').dataset.tag.split('-')[1]
      if (page == 'storage') {
        self.refresh()
      }
    })

    document.querySelector('.btn-open').addEventListener('click', function() {
      self.refresh()
    })
  }

  this._test = function() {
    window.localStorage.setItem('key1', 'value1')
    window.localStorage.setItem('key2', 'value2')
    co.setCookie('username', 'liushaojie', 10)
    co.setCookie('password', '123456', 10)
  }

  this._init = function() {
    self._bind()
    self._test()
    self.refresh()
  }

  this._init()
}
