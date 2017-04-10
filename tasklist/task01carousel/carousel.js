var cs = {
    current : 0, // 第一张图片
    mode : 0, // 初始模式
    intervalTime : 1000, // 延迟时间
    list : ["img/1.jpg","img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg"],
}
with(cs) {
    cs.count = list.length // 图片总数
    cs.init = function () {
        for (let index in this.list) {
            $('.poster-list').append(`<div class="change poster-item"><img src=${this.list[index]}></div>`)
            $('.indicater-cont').append(`<dot>${Number(index) + 1}</dot>`)
        }
    }
    cs.preprocess = function (active) {
        var allClass = 'fp1 fp2 fp3 fp4 active transparent rotateShow rotateHide prev1 prev next next1 lmxu-prev1 lmxu-prev lmxu-next lmxu-next1'
        $('.poster-item').removeClass(allClass)
        $('.active-dot').removeClass('active-dot')
        $($('dot')[active]).addClass('active-dot')
    }
    // 旋转木马
    cs.carousel0 = function (active) {
        cs.preprocess(active)
        $('.poster-item').removeClass('newone active transparent')
        $($('.poster-item')[(active + cs.count - 2) % cs.count]).addClass('prev1')
        $($('.poster-item')[(active + cs.count - 1) % cs.count]).addClass('prev')
        $($('.poster-item')[(active + cs.count + 1) % cs.count]).addClass('next')
        $($('.poster-item')[(active + cs.count + 2) % cs.count]).addClass('next1')
    }
    // 横向连续
    cs.carousel1 = function (active) {
        cs.preprocess(active)
        $('.poster-item').removeClass('newone active transparent')
        $($('.poster-item')[(active + cs.count - 2) % cs.count]).addClass('lmxu-prev1')
        $($('.poster-item')[(active + cs.count + 2) % cs.count]).addClass('lmxu-next1')
        $($('.poster-item')[(active + cs.count - 1) % cs.count]).addClass('lmxu-prev')
        $($('.poster-item')[(active + cs.count + 1) % cs.count]).addClass('lmxu-next')
    }
    // 单画渐隐
    cs.carousel2 = function (active) {
        cs.preprocess(active)
        $('.poster-item').addClass('transparent')
        $('.active').removeClass('active')
        $($('.poster-item')[active]).addClass('active')
    }
    // 卡片翻转
    cs.carousel3 = function (active) {
        cs.preprocess(active)
        $('.poster-item').addClass('rotateHide')
        $('.rotateShow').removeClass('rotateShow')
        $($('.poster-item')[active]).addClass('rotateShow')
    }
    // 发牌模式
    cs.carousel4 = function (active) {
        cs.preprocess(active)
        $('.poster-item').addClass('fp1')
        $('.poster-item').removeClass('fp2 fp3 fp4')
        $($('.poster-item')[(active + 1) % cs.count]).addClass('fp2')
        $($('.poster-item')[(active + cs.count - 1) % cs.count]).addClass('fp3')
        $($('.poster-item')[(active + cs.count - 2) % cs.count]).addClass('fp4')
        $($('.poster-item')[(active)]).removeClass('fp1')
    }

    cs.setInter = function () {
        cs.interID = setInterval(function () {
            cs.current = (cs.current + cs.count + 1) % cs.count
            cs.carousel(cs.current)
        }, cs.intervalTime);
    }
    cs.bindBtn = function () {
        $('.poster-prev-btn').on('click', function () {
            cs.current = (cs.current + cs.count - 1) % cs.count
            cs.carousel(cs.current)
        })
        $('.poster-next-btn').on('click', function () {
            cs.current = (cs.current + 1) % cs.count
            cs.carousel(cs.current)
        })
    }
    cs.bindIndic = function () {
        $('dot').on('click',function () {
            // console.log(event.target.innerHTML)
            cs.current = Number(event.target.innerHTML) - 1
            cs.carousel(cs.current)
        })
    }
    cs.bindSwitch = function () {
        $('.swi-btn').on('click', cs.swi)
    }
    cs.swi = function () {
        var modelist = [
            {func:cs.carousel0, name:' !<点 我>!'},
            {func:cs.carousel1, name:'横向连续'},
            {func:cs.carousel2, name:'单画渐隐'},
            {func:cs.carousel3, name:'卡片翻转'},
            {func:cs.carousel4, name:'发牌模式'},
        ]
        cs.carousel = modelist[cs.mode].func
        $('.swi-btn').text(modelist[cs.mode].name)
        cs.mode = (cs.mode + 1) % modelist.length
        cs.carousel(cs.current)
    }
}
cs.main = function () {
    with(cs) {
        init()
        swi()
        bindSwitch()
        bindBtn()
        bindIndic()
        carousel(current)
        setInter()
        $('.poster-main').hover(function () {
            clearInterval(interID)
        }, setInter)
    }
}
