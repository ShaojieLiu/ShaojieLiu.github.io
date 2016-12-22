(function() {btnPlay = document.querySelector('#playpause')
  btnNext = document.querySelector('#next')
  window.audio = document.querySelector('audio')
  btnPlay.addEventListener('click', function(e) {
    var play = function() {audio.play(); this.classList.add('glyphicon-pause')}
    var pause = function() {audio.pause(); this.classList.remove('glyphicon-pause')}
    console.log(this)
    audio.paused ?  play.call(this) : pause.call(this)
  })
  btnNext.addEventListener('click', function(e) {
    current = (current+1) % getlist().length
    switchSong(current)
  })

  audio.addEventListener('ended', function(e) {
    btnNext.click()
  })
})()
