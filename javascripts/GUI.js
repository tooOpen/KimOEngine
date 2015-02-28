
var GUI = function() {
	this.Gcanvas = document.getElementById("GUICanvas"); //캔버스 얻어오기
	this.Gcontext = this.Gcanvas.getContext('2d');
	GUIself = this;
	return this;
};


GUI.prototype = {
    Init : function() {
        this.Gcontext.canvas.width = b_canvasWidth;
        this.Gcontext.canvas.height = b_canvasHeight;
        window.requestNextAnimationFrame(function(time) {
            GUIself.Animate.call(GUIself, time);
        });
    },
    
    Animate : function(p_time) {
       
        this.Gcontext.clearRect(0, 0, this.Gcontext.canvas.width, this.Gcontext.canvas.height);
        this.Gcontext.globalAlpha = 0.6;
        this.Gcontext.drawImage(resourcePreLoader.GetImage("http://tooopen.github.io/KimOEngine/images/HPText.png"), 0, 0);

        for (var i = 0; i < heroObject.health; i++) {

            var newLine = Math.floor(i / (game.context.canvas.width / blockWidth));
            this.Gcontext.drawImage(resourcePreLoader.GetImage("http://tooopen.github.io/KimOEngine/images/heartBeat.png"), blockWidth * (i % (game.context.canvas.width / blockWidth)), 100 + blockWidth * (newLine), blockWidth, blockWidth);
        }
        window.requestNextAnimationFrame(function(p_time) {
            GUIself.Animate.call(GUIself, p_time);
            // The this variable refers to the window
        });
    }
};

