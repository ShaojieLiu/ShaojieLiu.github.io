var switchSong = function(num) {
  var songName = document.querySelector('#songName')
  var singer = document.querySelector('#singer')
  audio.src = getlist()[num].src
  songName.innerText = getlist()[num].name
  singer.innerText = ` - ${getlist()[num].singer}`
  var activeSong = function () {
    document.querySelectorAll('li').forEach(function(el) {el.classList.remove('red')})
    document.querySelectorAll('li')[current].classList.add('red')
  }
  activeSong()
  function success(result) {
    console.log(result, typeof(result))
    document.querySelector('#lrc').innerHTML = ''
    var time = 0
    result = ''
    result = resultLrc[current]
    result.split('\n').forEach(function(ele, index) {
      var patt1 = new RegExp(/\[.+?\]/)
      var patt2 = new RegExp(/\[.+?\]/)
      // patt1.exec(ele) ? console.log(patt1.exec(ele)[0].slice(1,-1)) : time = time
      var gettime = function() {
        var min = Number(patt1.exec(ele)[0].slice(1,-7))
        var sec = Number(patt2.exec(ele)[0].slice(-6,-1))
        return time = min * 60 + sec
      }
      patt1.exec(ele) != null ? time = gettime() : time = time

      ele.replace(/\[.+?\]/g, '') != '' ? document.querySelector('#lrc').insertAdjacentHTML('beforeend', `<li data-time=${time}>${ele.replace(/\[.+?\]/g, '')}</li>`) : 1
    })
  }
  // songService.getLrc(getlist()[current].lrcLink, success)
  success(1)
}
