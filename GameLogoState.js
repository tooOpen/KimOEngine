function GameLogoState() {
    this.korean = "킴치니티티니치킴";
    this.font_size = 20;
    this.columns = game.context.canvas.width / this.font_size;
    this.drops = [];
}

GameLogoState.prototype = {

    Init : function() {
        this.korean = this.korean.split("");
        for (var x = 0; x < this.columns; x++)
            this.drops[x] = 1;
        setTimeout(function() {nowGameStateis = 3;
            ChangeGameState(new TransitionFadeOut(game_state, new TransitionFadeIn(game_state, gametitleState, 3.0), 5.0));
        }, 4000);
     //   soundSystem.PlaySound("intro.mp3");
    },

    Render : function() {
        game.context.save();
        game.context.fillStyle = "rgba(0, 0, 0, 0.05)";
        game.context.fillRect(0, 0, game.context.canvas.width, game.context.canvas.height);

        game.context.fillStyle = "#FF3524";
       
        game.context.font = this.font_size + "px arial";
      
        for (var i = 0; i < this.drops.length; i++) {
            var text = this.korean[Math.floor(Math.random() * this.korean.length)];
            game.context.fillText(text, i * this.font_size, this.drops[i] * this.font_size);
            var image = new Image();
            image.src = "bunny.png";
            game.context.drawImage(image, b_canvasWidth*0.6, b_canvasHeight*0.8);
            if (this.drops[i] * this.font_size > game.context.canvas.height && Math.random() > 0.975)
                this.drops[i] = 0;
            this.drops[i]++;
        }
        game.context.restore();

    },

    Update : function() {

    },
};

