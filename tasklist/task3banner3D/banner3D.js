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
    // 使横幅变宽, 看不见左右边界 CSS
    var mainCont = document.querySelector('body')
    var threeD = document.querySelector('.threeD')
    threeD.style.transition = `all .5s`
    // 用百分比代替px, 使得不同宽度的屏幕效果一致
    mainCont.addEventListener('mousemove', function(e) {
        console.log(this)
        var y = (event.clientY - this.offsetTop - this.offsetHeight/2) / this.offsetHeight
        var x = (event.clientX - this.offsetLeft - this.offsetWidth/2) / this.offsetWidth
        threeD.style.transform = `rotateY(${x*30}deg) rotateX(${-y*10}deg)`
    })
    // 移出时, 缓慢归位
    // threeD.addEventListener('mouseleave', function () {
    //     threeD.style.transform = `rotateY(0deg) rotateX(0deg)`
    //     threeD.style.transition = `all .6s`
    //     if(br.timeid){clearTimeout(br.timeid)}
    // })
    // // 移入时, 刚开始缓慢跟随
    // threeD.addEventListener('mouseenter', function () {
    //     br.timeid = setTimeout(function () {
    //         threeD.style.transition = `all 0.1s`
    //     }, 600)
    // })
}
var __main = function () {
    window.onload = function () {br.prepare()}
    br.threeD()
}
__main()
