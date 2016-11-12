var prepare = function () {
    document.querySelector('#name').classList.add('type-name')
    var pList = document.querySelectorAll('.name>p')
    pList[0].classList.add('type-del')
    pList[1].classList.add('type-1st')
    pList[2].classList.add('type-2nd')
}
var threeD = function () {
    var threeD = document.querySelector('.threeD')
    threeD.addEventListener('mousemove', function(e) {
        var y = event.clientY - threeD.offsetTop - threeD.offsetHeight/2
        var x = event.clientX - threeD.offsetLeft - threeD.offsetWidth/2
        // console.log(y, threeD.offsetHeight)
        threeD.style.transform = `rotateY(${x/30}deg) rotateX(${-y/30}deg)`
    })
}
var __main = function () {
    window.onload = function () {prepare()}
    threeD()
}
__main()
