var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
var main = document.querySelector(".main");
var descW = 640;
var descH = 1006;
if (winW / winH > descW / descH) {
    main.style.webkitTransform = "scale(" + winW / descW + ")";
} else {
    main.style.webkitTransform = "scale(" + winH / descH + ")";
}


var oSpan = document.querySelector(".progress");
var loadBg = document.querySelector(".loadBg");
var loading = document.querySelector(".loading");
var list = document.querySelector(".list");
var oLis = list.querySelectorAll("li");
(function () {
    var ary = ['1.png', '1-1.png', '2.png', 'bot.png', 'list-c.gif', 'normalmusic.png', 'pic.png', 'skill.png', 'title.png'];

    function load() {
        for (var i = 0; i < ary.length; i++) {
            var cur = ary[i];
            var oImg = new Image();
            oImg.index = i+8 ;
            oImg.src = "images/" + cur;
            oImg.onload = function () {
                oSpan.style.width = (this.index / ary.length) * 100 + "%";
            }
        }
    }
    load();

    oSpan.addEventListener("webkitTransitionEnd", function () {
        loadBg.style.height = 0;
        loading.remove();
    });

    [].forEach.call(oLis, function () {
        var cur = arguments[0];
        cur.index = arguments[1];
        cur.addEventListener("touchstart", start, false);
        cur.addEventListener("touchmove", move, false);
        cur.addEventListener("touchend", end, false);
    });

    function start(e) {
        this.start = e.changedTouches[0].pageY;
    }

    function move(e) {
        e.preventDefault();
        var moveTouch = e.changedTouches[0].pageY;
        var changePos = moveTouch - this.start;
        cur = this.index;

        [].forEach.call(oLis, function () {
            if (arguments[1] != cur) {
                arguments[0].style.display = "none";
            }
            arguments[0].className = "";
            arguments[0].firstElementChild.id="";
        });

        if (changePos > 0) {
            this.prevIndex = cur == 0 ? oLis.length - 1 : cur - 1;
            var pos = -winH + changePos;
        }
        if (changePos < 0) {
            this.prevIndex = cur == oLis.length - 1 ? 0 : cur + 1;
            pos = winH + changePos;
        }
        oLis[this.prevIndex].className = "zIndex";
        oLis[this.prevIndex].style.display = "block";
        oLis[this.prevIndex].style.webkitTransform = "translate(0," + pos + "px)";
        oLis[cur].style.webkitTransform = "scale("+(1-Math.abs(changePos / winH /2))+ ")" + "translate(0," + changePos + "px)";
    }

    function end(e) {
        oLis[this.prevIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevIndex].style.webkitTransition = "0.5s";
        oLis[this.prevIndex].addEventListener("webkitTransitionEnd",function(){
            this.style.webkitTransition = "";
            this.firstElementChild.id="next"+(this.index+1);
        },false)
    }


})();
