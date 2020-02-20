<script type="text/javascript">
                    (function(window, document, undefined) {
                        var hearts = [];
                        window.requestAnimationFrame = (function() {
                            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
                            function(callback) {
                                setTimeout(callback, 1000 / 60);
                            }
                        })();
                        init();
                        function init() {
                            css(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: absolute;}.heart:after{top: -5px;}.heart:before{left: -5px;}");
                            attachEvent();
                            gameloop();
                        }
                        function gameloop() {
                            for (var i = 0; i < hearts.length; i++) {
                                if (hearts[i].alpha <= 0) {
                                    document.body.removeChild(hearts[i].el);
                                    hearts.splice(i, 1);
                                    continue;
                                }
                                hearts[i].y--;
                                hearts[i].scale += 0.004;
                                hearts[i].alpha -= 0.013;
                                hearts[i].el.style.cssText = "left:" + hearts[i].x + "px;top:" + hearts[i].y + "px;opacity:" + hearts[i].alpha + ";transform:scale(" + hearts[i].scale + "," + hearts[i].scale + ") rotate(45deg);background:" + hearts[i].color;
                            }
                            requestAnimationFrame(gameloop);
                        }
                        function attachEvent() {
                            var old = typeof window.onclick === "function" && window.onclick;
                            window.onclick = function(event) {
                                old && old();
                                createHeart(event);
                            }
                        }
                        function createHeart(event) {
                            var d = document.createElement("div");
                            d.className = "heart";
                            hearts.push({
                                el: d,
                                x: event.clientX - 5,
                                y: event.clientY - 5,
                                scale: 1,
                                alpha: 1,
                                color: randomColor()
                            });
                            document.body.appendChild(d);
                        }
                        function css(css) {
                            var style = document.createElement("style");
                            style.type = "text/css";
                            try {
                                style.appendChild(document.createTextNode(css));
                            } catch(ex) {
                                style.styleSheet.cssText = css;
                            }
                            document.getElementsByTagName('head')[0].appendChild(style);
                        }
                        function randomColor() {
                            return "rgb(" + (~~ (Math.random() * 255)) + "," + (~~ (Math.random() * 255)) + "," + (~~ (Math.random() * 255)) + ")";
                        }
                    })(window, document);
    </script>

    <script type="text/javascript">

  (function () {
         let cloorArr=['#FF83FA','#FF8247','#EEEE00','#6B8E23','#B4EEB4','#EE00EE','#FFFF00','#F5F5DC','#F08080'];
         function getMath(){     
       return Math.floor((Math.random()*10));
   }
    var COUNT = 300;
    var masthead = document.getElementsByTagName('body')[0];
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var width = masthead.clientWidth;
    var height =document.body.clientHeight;
    var i = 0;
    var active = false;
    function onResize() {
      width = masthead.clientWidth;
      height = masthead.clientHeight;
      canvas.width = width;
      canvas.height = height;
      ctx.fillStyle =cloorArr[getMath()];
      var wasActive = active;
      active = width > 600;
      if (!wasActive && active)
        requestAnimFrame(update);
    }
    var Snowflake = function () {
      this.x = 0;
      this.y = 0;
      this.vy = 0;
      this.vx = 0;
      this.r = 0;
      this.reset();
    };
    Snowflake.prototype.reset = function() {
      this.x = Math.random() * width;
      this.y = Math.random() * -height;
      this.vy = 1 + Math.random() * 3;
      this.vx = 0.5 - Math.random();
      this.r = 1 + Math.random() * 2;
      this.o = 0.5 + Math.random() * 0.5;
    };
    canvas.style.position = 'absolute';
    canvas.style.left = canvas.style.top = '0';
    var snowflakes = [], snowflake;
    for (i = 0; i < COUNT; i++) {
      snowflake = new Snowflake();
      snowflakes.push(snowflake);
    }
    function update() {
      ctx.clearRect(0, 0, width, 3000);
      if (!active)
        return;
      for (i = 0; i < COUNT; i++) {
        snowflake = snowflakes[i];
        snowflake.y += snowflake.vy;
        snowflake.x += snowflake.vx;
        ctx.globalAlpha = snowflake.o;
        ctx.beginPath();
        ctx.arc(snowflake.x, snowflake.y, snowflake.r, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
        if (snowflake.y > 3000) {
          snowflake.reset();
        }
      }
      requestAnimFrame(update);
    }
    // shim layer with setTimeout fallback
    window.requestAnimFrame = (function(){
      return window.requestAnimationFrame    ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame  ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
    })();
    onResize();
    window.addEventListener('resize', onResize, false);
    masthead.appendChild(canvas);  
  

  })();

</script>