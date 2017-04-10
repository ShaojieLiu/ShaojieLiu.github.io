let ConsoleWindow = function() {
  let pub = new Pub()
  let self = this
  this.output = []

  // 增强5个console下的函数, 并把原函数赋值给console.olog等;
  this._initConsole = function() {
    ['log', 'error', 'warn', 'debug', 'info'].forEach(function (item) {
      console[`o${item}`] = console[item]

      console[item] = function () {
        console[`o${item}`].apply(console, arguments)
        self.log(arguments, item);
      }
    })
  }

  // console.log的五种类型: String,Object,Array,Boolean,Number的输出
  this.log = function(msgs, type) {
    let i = 0, len = msgs.length
    if (type === 'js') {
      document.querySelector('.window-console-display').insertAdjacentHTML('beforeend', `<li class="window-console-display-error">[${type}]~${msgs}</li>`)
    } else {
      for (; i < len; i++) {
        let tp = typeof msgs[i]
            msg = msgs[i]
        // console.olog(msgs[i], type, tp)
        if (tp === 'object') {
          // 先看看是不是数组
          if (msgs[i].constructor === Array) {
            tp = 'array'
            let tempArray = ''
            for (let item of msg) {
              tempArray += `${item}, `
            }
            msg = `[${tempArray.substring(0, tempArray.length-2)}]`
          } else {
            // 那就是对象了
            let pairs = ''
            for (let key in msg) {
              pairs += `${key}: ${msg[key]}, `
            }
            msg = `{${pairs.substring(0, pairs.length-2)}}`
          }
        }
        // self.output.push({
        //   type: type,
        //   tp: tp,
        //   msg: msg
        // })
        document.querySelector('.window-console-display').insertAdjacentHTML('beforeend', `<li class="window-console-display-${type}">[${type}]~[${tp}]~${msg}</li>`)
      }
    }
    // pub.render()
  }

  this._err = function() {
    window.onerror = function (errorMsg, url, lineNumber) {
      // self.log( errorMsg + '; Script: ' + url + '; Line: ' + lineNumber, 'js');
      self.log(`${errorMsg} Script: ${url} Line: ${lineNumber}`, 'js');
    }
  }

  this._bind = function() {
    let tagGroup = ['error', 'warn', 'info', 'log']
    pub.tagSwitch('.window-console', '.window-console-top', tagGroup)
  }

  this._test = function() {
    console.error('错误测试')
    console.warn('警告测试')
    console.info('信息测试')
    console.log('字串测试')
    console.log({key1: 'value1', key2: 'value2'})
    console.log(['数','组','测','试'])
    console.log(true)
    console.log(123)
    // document.querySelector('body').insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="https://no.address">`)
    // console.不存在的函数()
  }

  this._init = function() {
    self._err()
    self._initConsole()
    self._bind()
    self._test()
  }

  this._init()
}
