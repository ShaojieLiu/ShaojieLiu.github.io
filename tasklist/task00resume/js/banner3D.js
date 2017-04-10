// br命名空间代表banner
var br = {}
br.prepare = function () {
    document.querySelector('#name').classList.add('type-name')
    var pList = document.querySelectorAll('.name>p')
    pList[0].classList.add('type-del')
    pList[1].classList.add('type-1st')
    pList[2].classList.add('type-2nd')
}
br.threeD = function () {
    var body = document.querySelector('html')
    var threeD = document.querySelector('.threeD')
    threeD.style.transition = `all .5s`
    // 用百分比代替px, 使得不同宽度的屏幕效果一致
    body.addEventListener('mousemove', function(e) {
        // console.log(this)
        var y = (event.clientY  - body.offsetHeight/2) / body.offsetHeight
        var x = (event.clientX  -body.offsetWidth/2) / body.offsetWidth
        threeD.style.transform = `rotateY(${x*30}deg) rotateX(${-y*20}deg)`
    })
}
var __main = function () {
    window.onload = function () {
        br.prepare()
        br.threeD()
    }
}
__main()
