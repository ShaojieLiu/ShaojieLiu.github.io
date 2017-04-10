(function() {
    var songService = {
        getLrc: getLrc
    }

    function getLrc(lrcLink, success) {
        fetch(lrcLink, {
            method: 'get'
        }).then(function(result){
    		result.text().then(success)
        });
    }
    window.songService = songService;
})(window);
