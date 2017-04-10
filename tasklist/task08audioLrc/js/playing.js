(function() {
  // audio.addEventListener('timeupdate', function(e) {
  audio.addEventListener('timeupdate', function(e) {
    document.querySelector('#progress').value = 100 * this.currentTime / this.duration
    document.querySelector('#current-time').innerText = formatTime(this.currentTime)
    document.querySelector('#duration').innerText = formatTime(this.duration)
    // console.log(this.currentTime)
    var activeTop = 0
    document.querySelectorAll('#lrc>li').forEach(function(ele, index) {
      // console.log(ele.dataset.time)
      // console.log(ele)
      var active = function (elem) {
        document.querySelectorAll('#lrc>li').forEach(function(el) {
          el.classList!=undefined ? el.classList.remove('active') : 1
        })
        elem.classList!=undefined ? elem.classList.add('active') : 1
        return elem.offsetTop
      }
      var diff = audio.currentTime - ele.dataset.time
      diff>0 && diff<3 ? activeTop = active(ele) : 1
    })
    // console.log('activeTop', activeTop, 'scrollTop', document.querySelector('#lrc').scrollTop)
    var speed = (activeTop - 140 - document.querySelector('#lrc').scrollTop) / 10
    if ( speed > 0 ) {
      document.querySelector('#lrc').scrollTop += speed
    }
  })
})()

var formatTime = function(sec) {
  var minute = Math.floor(sec / 60)
  var second = Math.floor(sec % 60)
  second < 10 ? second = '0' + second : second
  minute < 10 ? minute = '0' + minute : minute
  var t = minute + ":" + second
  return t
}
