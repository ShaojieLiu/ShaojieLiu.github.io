(function() {
  document.querySelector('#progress').addEventListener('input', function(e) {
    audio.currentTime = this.value / 100 * audio.duration
  })

  document.querySelector('#volume').addEventListener('input', function(e) {
    audio.volume = this.value / 100
  })
})()
