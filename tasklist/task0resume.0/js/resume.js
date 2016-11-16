var addT1 = function (where, icon, txtC, txtE) {
    var temperate = `
        <div class="title1">
            <span class="fa-stack fa-lg title1-icon">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-stack-1x fa-${icon} fa-inverse"></i>
            </span>
            <div class="title1-txt">
                <span class="title1-txt-c">${txtC}</span><br>
                <span class="title1-txt-e">${txtE}</span>
            </div>
        </div>`
    $(`.${where}`).append(temperate)
}
var addT2 = function (where, icon, txt, isbtn='nobtn') {
    var demo = ``
    if (isbtn != 'nobtn') {demo = `<button class="btn btn-primary demo" onclick="location.href='${isbtn}'"><i class="fa fa-chain"></i> Demo</button>`}
    var temperate = `
        <div class="title2">
            <span class="fa-stack fa-lg title2-icon">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-stack-1x fa-${icon} fa-inverse"></i>
            </span>
            <div class="title2-txt">${txt}</div>${demo}
        </div>`
    $(`.${where}`).append(temperate)
}
var addT3 = function (where, icon, txt) {
    var item = ``
    for (let index in txt) {
        item += `<i class="fa fa-${icon[index]}"> &nbsp; </i>${txt[index]}<br>`
    }
    var temperate = `
        <div class="title3">
            ${item}
        </div>`
    $(`.${where}`).append(temperate)
}

var initPrint = function () {
    $('.btnPrint').on('click', function() {
        windowPrint()
    })
}
var windowPrint = function () {
    // $('.main').addClass('print')
    $('head').append(`<link rel="stylesheet" href="css/print.css">`)
    var giveImg = function() {
        if ($('.name .p1')){$('.name .p1').remove()}
        var state = document.readyState
        console.log('newImg')
        if (state == 'complete') {
            html2canvas(document.getElementsByClassName('printWindow'), {
                onrendered: function(canvas) {
                    $('.content').append(canvas);//生成画布后如何处理，当然可以在新标签打开，在浮层展示等等
                        var image = document.querySelector('.content canvas')
                        // console.log(image)
                        var mysrc =  image.toDataURL('image/png')
                        printWindow = window.open()
                        printWindow.document.write(`<img src=${mysrc}>`)
                        printWindow.print()
                        $('link').last().remove()
                        $('.content canvas').remove()
                },
                canvas_id: 'canvas1',
            });//通过修改html2canvas源码添加canvas的id
        }
    }
    setTimeout(() => {
        giveImg()
    }, 500)
}
