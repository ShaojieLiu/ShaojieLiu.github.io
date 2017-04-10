let Network = function() {
  let pub = new Pub()
  let self = this
  let resArray = []
  let typeArray = ['script', 'link', 'img', 'video', 'audio']

  this.easyname = function(oname) {
    // let name = oname.split('/').pop() || oname.substr(0, oname.length-1).split('/').pop()
    let name = oname
    let len = name.length
    if (len > 35) {name = name.substring(len-35, len)}
    return name
  }

  // 列出所有资源的列表, 并监听他们 error
  this.resL = function() {
    let nameArray = []
    typeArray.forEach((type) => {
      let eltArray = document.querySelectorAll(type)
      // console.olog(eltArray)
      eltArray.forEach((elt, i, array) => {
        // let name = (elt.href || elt.src)
        let name = self.easyname(elt.href || elt.src)
        if (name) {
          nameArray.push({name:name, type:type})
        }

        elt.addEventListener('error', self.adderror)
        elt.time0 = new Date().getTime()
        elt.addEventListener('load', (e) => {
          let time1 = new Date().getTime()
          let timer = time1 - e.target.time0
          console.warn(name, timer)
        })
        // elt.addEventListener('error', self.adderror)

      })
    })
    resArray = nameArray
    return nameArray
  }

  // 把出错的标红
  this.adderror = function(e) {
    // let time1 = new Date().getTime()
    // let timer = time1 - e.target.time0
    // console.warn(name, timer)

    let name = self.easyname(e.target.href || e.target.src)
    // console.owarn(name)
    document.querySelector('.window-console-display').insertAdjacentHTML('beforeend', `
    <li class="window-console-display-error">[res]~${name}</li>`)
    let ele = document.getElementById(name)
    // console.log(ele)
    if (ele) {
      ele.classList.add('error')
    }
  }

  this.renderRes = function(nameArray) {
    let father = document.querySelector('.window-network-display')
    // document.querySelectorAll('.window-network-display-resource').forEach((elt) => {elt.remove()})
    nameArray.forEach((obj) => {
      father.insertAdjacentHTML('beforeend', `
      <li id=${obj.name} class="window-network-display-resource network-${obj.type}">
      [${obj.type}]~${obj.name}</li>`)
    })
  }

  this.addNew = function(){
    let oresArray = resArray
    let names = pub.minus(self.resL(), oresArray)
    // console.olog(oresArray, names)
    self.renderRes(names)
    document.querySelector('.window-network-top>.active').click()
  }

  this._bind = function() {
    let tagGroup = ['resource', 'xhr']
    pub.tagSwitch('.window-network', '.window-network-top', tagGroup)
    // setInterval(self.addNew, 20)
    // document.querySelector('body').addEventListener('click', self.addNew)
    // document.querySelector('.refresh').addEventListener('click', function() {
    //   self.addNew()
    // })
    //
    // document.querySelector('.btn-open').addEventListener('click', function() {
    //   self.addNew()
    // })
  }

  this._init = function() {
    self._bind()
    let nameArray = self.resL()
    self.renderRes(nameArray)
  }

  this._init()
}
let nw = new Network()
