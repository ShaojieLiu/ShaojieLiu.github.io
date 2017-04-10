let Pub = function() {
  let self = this
  let co = new Cookie()

  // 标签页切换
  this.tagSwitch = function(fatherName, first, tagGroup) {
    document.querySelector(first).addEventListener('click', function(e) {
      let activeEle = document.querySelector(`${first}>.active`)
      if (activeEle) {
        activeEle.classList.remove('active')
      }
      e.target.classList.add('active')
      if (e.target.dataset.tag) {
        let eles = document.querySelectorAll(`${fatherName}>div`)
        for (let vari = 0; vari < eles.length; vari++) {
          // console.olog(vari)
          if (vari != 0) {
            eles[vari].classList.add('none')
          }
        }
        document.querySelector(`${e.target.dataset.tag}`).classList.remove('none')
      } else if (e.target.dataset.action === "clearConsole") {
        console.clear()
        document.querySelector('.window-console-display').innerHTML=''
      } else {
        self.render(fatherName, first, tagGroup)
      }
      // callback()
    })
  }

  // 看看现在激活的是哪个选择器, 分类增删 .none
  this.render = function(fatherName, first, tagGroup) {
    // let tagGroup = ['error', 'warn', 'info', 'log']
    let list = document.querySelectorAll(`${fatherName}-display li`)
    let action = document.querySelector(`${first} .active`).dataset.action
    for (let i = 0; i < tagGroup.length; i++) {
      let eles = document.querySelectorAll(`${fatherName}-display-${tagGroup[i]}`)
      for (let variable of eles) {
        if (variable) {
          switch (action) {
            case 'all':
            case tagGroup[i]: {
              variable.classList.remove('none')
            }
              break;
            default: {
              variable.classList.add('none')
            }
          }
        }
      }
    }
  }

  // 底部三个按钮的监听
  this._bind = function() {

    document.querySelector('.btn-open').addEventListener('click', function() {
      document.querySelector('.console-window').classList.toggle('none')
    })

    let tagGroup = []
    self.tagSwitch('.console-window', '.window-btn-top', tagGroup)

    document.querySelector('.clear').addEventListener('click', function() {
      let page = document.querySelector('.window-btn-top>.active').dataset.tag.split('-')[1]

      switch (page) {

        case 'console':{
          console.clear()
          document.querySelector('.window-console-display').innerHTML=''
        } break

        case 'storage':{
          let type = document.querySelector('.window-storage-top>.active').dataset.action
          switch (type) {
            case 'all': {
              window.localStorage.clear()
              document.querySelectorAll('.window-storage-display-localStorage').forEach(function(ele) {ele.remove()})
            }
            case 'cookie':{co.delcookies()} break
            case 'localStorage':{
              window.localStorage.clear()
              document.querySelectorAll('.window-storage-display-localStorage').forEach(function(ele) {ele.remove()})
            } break
            default:
          }
        } break

        case 'network':{
          let type = document.querySelector('.window-network-top>.active').dataset.action
          switch (type) {
            case 'resource':{
              document.querySelectorAll('.window-network-display-resource').forEach((elt) => {elt.remove()})

            } break
            case 'xhr':{} break
            default:

          }
        } break

        default:
      }
    })

    document.querySelector('.eye').addEventListener('click', function() {
      let eyeicon = document.querySelector('.eye span')
      let canpoint = eyeicon.classList.contains('glyphicon-eye-open')
      let win = document.querySelectorAll('.console-window, .console-window btn, .console-window li')
      if (canpoint) {
        eyeicon.classList.remove('glyphicon-eye-open')
        eyeicon.classList.add('glyphicon-eye-close')
        win.forEach((elt) => {elt.classList.add('through')})
      } else {
        eyeicon.classList.remove('glyphicon-eye-close')
        eyeicon.classList.add('glyphicon-eye-open')
        win.forEach((elt) => {elt.classList.remove('through')})
      }
    })

  }

  // 数组相减
  this.minus = function(arr1, arr2) {
    let result = []
    var temp = {}
    arr1.forEach((elt1) => {
      var flag = false
      for (elt2 of arr2) {
        if (elt2.name === elt1.name) flag = true
      }
      if (!flag) {
        result.push(elt1)
      }
    })
    return result
  }
}
