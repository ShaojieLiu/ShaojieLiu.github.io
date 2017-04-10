function _main() {
  let pub = new Pub()
  pub._bind()
  let cw = new ConsoleWindow()
  let sw = new StorageWindow()
  // console.log('main')
  // _test()
  if (window.localStorage.status) {
    let strA = window.localStorage.status.split('?')
    // console.log(strA)
    if (strA[0] != 'true') {document.querySelector('.btn-open').click()}
    document.getElementById(strA[2]).click()
    document.getElementById(strA[1]).click()
    if (strA[3] != 'true') {document.querySelector('.eye').click()}
    // console.log(document.getElementById(strA[1]))
  }
  document.addEventListener('click', () => {
    if (1) {
      let s1 = !document.querySelector('.console-window').classList.contains('none')
      let s2 = document.querySelector('.window-btn-top .active').id
      let s3 = document.querySelector('.window-network-top .active').id
      let s4 = document.querySelector('.eye span').classList.contains('glyphicon-eye-open')
      // console.log(document.querySelector('.eye span'))
      window.localStorage.status = `${s1}?${s2}?${s3}?${s4}`
    }
  })
}

_main()
