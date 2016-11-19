var timeformat = function (second) {
    var fill = function (x) {
        x = String(x)
        if (x.length < 2) {
            return ['0']+x
        }
        return x
    }
    var min = fill(Math.floor(second / 60))
    var sec = fill(Math.floor(second % 60))
    return `${min}:${sec}`
}
var player = function(givenlist) {
    this.list = givenlist
    this.curr = 0
    this.ele = $('audio')
    this.mode = 'random' //order random replay
    this.slider = $('.slider')
    this.volslider = $('.slider-vol')
}
player.prototype.reload = function() {
    this.ele[0].src = this.list[this.curr].src
    $('.songlist li .fa-music').remove()
    $($('.songlist li')[this.curr]).append(`<span class="fa fa-music"></span>`)
    // console.log(`reloading`,this,this.list[this.curr].src)
}
player.prototype.prev = function() {
    this.curr = (this.curr + this.list.length - 1) % this.list.length
    this.reload()
}
player.prototype.next = function() {
    switch (this.mode) {
        case 'random':
            var rand = Math.floor(Math.random() * (this.list.length - 1)) + 1
            this.curr = (this.curr + rand) % (this.list.length)
            this.reload()
            break
        case 'replay':
        case 'order':
        default:
            this.curr = (this.curr + 1) % this.list.length
            this.reload()
    }
}
player.prototype.toggleMuted = function() {
    if (!this.ele[0].muted) {
        $('#vol').removeClass('fa-volume-up')
    } else {$('#vol').addClass('fa-volume-up')}
    this.ele[0].muted = !$('#vol').hasClass('fa-volume-up')
}
player.prototype.update = function() {
    // console.log('update',this,this.ele[0])
    var currentTime = this.ele[0].currentTime
    var duration = this.ele[0].duration
    $('.slider').val(100 * currentTime / duration)
    $('.prog').width(($('.slider').val()) / 100 * $('range').width())
    $('.time1').text(`${timeformat(currentTime)}`)
    $('.time2').text(`${timeformat(duration)}`)
    $('.current').text(`${this.list[this.curr].singer} - ${this.list[this.curr].name}`)
}
player.prototype.end = function() {
    switch (this.mode) {
        case 'random':
            var rand = Math.floor(Math.random() * (this.list.length - 1)) + 1
            this.curr = (this.curr + rand) % (this.list.length)
            this.reload()
            break
        case 'replay':
            this.reload()
            break
        case 'order':
            this.curr = (this.curr + 1) % this.list.length
            this.reload()
        default:
            this.curr = (this.curr + 1) % this.list.length
            this.reload()
    }
    this.coverChange(this.list[this.curr].pic)
}
player.prototype.switchMode = function() {
    var self = this
    var list = ['order', 'random', 'replay']
    var modelist = {
        random: function() {
            // self.mode = 'random'
            $('#mode').addClass('btn glyphicon glyphicon-random')
        },
        order: function() {
            // self.mode = 'order'
            $('#mode').addClass('btn glyphicon glyphicon-sort-by-order')
        },
        replay: function() {
            // self.mode = 'replay'
            $('#mode').addClass('btn glyphicon glyphicon-retweet')
        }
    }
    $('#mode').removeClass()
    this.mode = list[(list.indexOf(self.mode) + 1) % list.length]
    modelist[this.mode]()
    console.log(self.mode,list.indexOf(self.mode),this.mode)
}
player.prototype.toggleList = function() {
    $('.songlist').fadeToggle(1000)
    $('.circle').toggle(1000)
    // $('.background').fadeIn(300)
    this.coverChange(this.list[this.curr].pic)
}
player.prototype.switch = function() {
    if(!this.ele[0].paused) {
        $('#play').removeClass('glyphicon-pause')
        $('.circle').css("animation-play-state", "paused")
        this.ele[0].autoplay = false
        this.ele[0].pause()
    } else {
        $('#play').addClass('glyphicon-pause')
        $('.circle').css("animation-play-state", "running")
        this.ele[0].autoplay = true
        this.ele[0].play()
    }
}
player.prototype.changeTime = function() {
    this.ele[0].currentTime = this.slider.val() / 100 * this.ele[0].duration
}
player.prototype.coverChange = function(url) {
    $('.background').css("background-image", `url('${url}')`)
    $('.circle').css("background-image", `url('${url}')`)
}
player.prototype.changeVol = function() {
    console.log('changevol', this)
    this.ele[0].volume = this.volslider.val() / 100
}
player.prototype.initPlayer = function () {
    var self = this
    var show = $('.timeshow')
    // initial the list show, time show
    $(this.list).map(function(){
        $('.songlist').append(`<li>${this.singer} - ${this.name}</li>`)
    })
    this.slider.hover(
        function(){show.removeClass('none')},
        function(){show.addClass('none')
    })
    this.slider.on('mousemove', function() {
        // console.log('mousemove', self)
        show.offset({ left: event.clientX + document.body.scrollLeft - 20})
        var progress = (event.clientX + document.body.scrollLeft - self.slider.offset().left) / self.slider.width() * self.ele[0].duration
        show.text(timeformat(progress))
    })
    // other initial configure
    this.ele[0].autoplay = true
    this.ele[0].volume = $('.slider-vol').val() / 100
    this.reload()
    // register the main slider
    this.ele.on('timeupdate', this.update.bind(self))
    this.slider.on('input', this.changeTime.bind(self))
    // register the volume slider
    this.volslider.on('input', this.changeVol.bind(self))
    // register task when ended
    this.ele.on('ended', this.end.bind(self))
    // register the buttons, songlist
    $('.btnArea').on('click', '.btn', function() {
        self[event.target.dataset.action]()
        self.coverChange(self.list[self.curr].pic)
    })
    $('.songlist').on('click', 'li', function() {
        self.curr = $('.songlist li').index(event.target)
        self.reload()
        // $('.background').fadeOut(200)
        self.toggleList()
    })
}
