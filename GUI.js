
var GUI = function() {

	var Gcanvas = document.getElementById("GUICanvas"); //캔버스 얻어오기
	this.Gcontext = Gcanvas.getContext('2d');
	GUIself = this;
	return this;
};

GUI.prototype = {
	Init : function() {
	this.Gcontext.canvas.width = b_canvasWidth;
    this.Gcontext.canvas.height =b_canvasHeight;
		window.requestNextAnimationFrame(function(time) {
				GUIself.animate.call(GUIself, time);
			});
	},
	
	animate : function(time)
	{
	
	this.Gcontext.clearRect(0, 0, this.Gcontext.canvas.width, this.Gcontext.canvas.height);
	this.Gcontext.globalAlpha = 0.6;
	this.Gcontext.drawImage(resourcePreLoader.GetImage("HPText.png"), 0, 0);
	
	for(var i=0;i<heroObject.health;i++)
	{
		
		var newLine =Math.floor( i/(game.context.canvas.width/blockWidth));
		this.Gcontext.drawImage(resourcePreLoader.GetImage("heartBeat.png"), blockWidth * (i % (game.context.canvas.width/blockWidth)), 100+blockWidth*(newLine),blockWidth,blockWidth);
	}
		window.requestNextAnimationFrame(function(time) {
				GUIself.animate.call(GUIself, time);
				// The this variable refers to the window
			});
	}
};

