function GameTitleState(fileName) {
    this.titleName = fileName;
    this.blink = false;
}
GameTitleState.prototype = {
    PreInit : function() {
    },
    Init : function() {
         soundSystem.PlaySound(titleSound);
    },

    Render : function() {
        game.context.drawImage(resourcePreLoader.GetImage(this.titleName), 0, 0, b_canvasWidth, b_canvasHeight);
        
        if(this.blink)
        game.context.drawImage(resourcePreLoader.GetImage("http://tooopen.github.io/KimOEngine/images/start.png"),200,550,700,300);
    },

    Update : function(time) {
     if (time - lastAdvance > 500) {
            lastAdvance = time;
            this.blink=!this.blink;
            }
    },
};

