var listInit = function() {
  var ol = document.querySelector('ol')
  for (let prop of getlist()) {
    ol.insertAdjacentHTML('beforeend', `<li>${prop.name}</li>`)
  }
  document.querySelector('ol').addEventListener('click', function(e) {
    document.querySelectorAll('#songlist>li').forEach(function(el, index) {
      el == e.target ? (function() {current = index; switchSong(current)})() : current = current
    })
  })
}
var getlist = function() {
  var songlist =
  [
    {singer: "周杰伦",
      name: '简单爱',
    	src: 'http://yinyueshiting.baidu.com/data2/music/41526971/107364441482058861128.mp3?xcode=f5d02321a9bb979a8c3c42cb27c397d9',
    	lrcLink: 'http://musicdata.baidu.com/data2/lrc/13822026/13822026.lrc?_=1482151911775',
      img: '',},
    {singer: "周杰伦",
      name: '半岛铁盒',
    	src: 'http://yinyueshiting.baidu.com/data2/music/241199568/813234237600128.mp3?xcode=340b1b7cb66ad31737ff48ca31f559c2',
    	lrcLink: 'http://musicdata.baidu.com/data2/lrc/13854358/13854358.lrc?_=1482151995961',
      img: '',},
  ]
  return songlist
}
listInit()
