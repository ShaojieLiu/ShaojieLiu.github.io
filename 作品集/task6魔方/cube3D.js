// cb命名空间代表cube
var cb = {
    mainCont : document.querySelector('mainCont'),
    threeD : document.querySelector('.wrap'),
    body : document.querySelector('body'),
    items : document.querySelectorAll('.wrap-item'),
    x: 0,
    y: 0,
    order: ['wrap-state1','wrap-state2','wrap-state3','wrap-state4','wrap-state5','wrap-state6'],
    orderS: ['wrap-state-S1','wrap-state-S2','wrap-state-S3','wrap-state-S4','wrap-state-S5','wrap-state-S6'],
    current: 1,
}
with(cb){
    cb.carousel = function () {
        console.log('carousel')
        cb.threeD.style.transform = ''
        for (let prop of items) {prop.classList.remove('trans')}
        cb.timeid = setInterval(() => {
            current = current % order.length
            // current = 0
            for (let prop of order) {threeD.classList.remove(prop)}
            for (let prop of orderS) {threeD.classList.remove(prop)}

            threeD.classList.add(order[current])
            console.log(current, threeD.classList)
            current++
        }, 2000)
    }
    cb.hover = function () {
        mainCont.addEventListener('mouseenter', function () {
            clearInterval(timeid)
            for (let prop of items) {prop.classList.add('trans')}
        })
        mainCont.addEventListener('mouseleave', carousel)
    }
    cb.drag = function () {
        // 用百分比代替px, 使得不同宽度的屏幕效果一致
        cb.mainCont.addEventListener('mousedown', function(e) {
            cb.threeD.style.transition = 'all 0.2s'
            // mousedown 时 mouse 的位置
            cb.mx = event.clientX
            cb.my = event.clientY
            // mousedown 时 view 的位置
            cb.vx = cb.x
            cb.vy = cb.y
            cb.hold = true
        })
        body.addEventListener('mousemove', function(e) {
            if (cb.hold) {
                console.log('hold', cb.x)
                cb.y = (event.clientY - cb.my) / this.offsetHeight + cb.vy
                cb.x = (event.clientX - cb.mx) / this.offsetWidth + cb.vx
                cb.threeD.style.transform = `rotateY(${cb.x*360}deg) rotateX(${-cb.y*360}deg)`
            }
        })
        body.addEventListener('mouseup', function () {
            cb.threeD.style.transition = 'all 1s'
            cb.hold = false
        })
    }
    cb.onload = function () {
        // 使横幅变宽, 看不见左右边界 CSS
        cb.drag()
        cb.carousel()
        cb.hover()
    }
}
__main = function () {
    window.onload = function () {
        cb.onload()
    }
}
__main()
