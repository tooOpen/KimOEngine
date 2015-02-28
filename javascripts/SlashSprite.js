

function SlashSprite() {
 
    spritesheet = resourcePreLoader.GetImage("http://tooopen.github.io/KimOEngine/images/slash.png");
    this.slashCells = [
      { left: 0,   top: 0, width: 60, height: 59 },
      { left: 60,  top: 0, width: 60, height: 59 },
      { left: 120, top: 0, width: 60, height: 59 },
      { left: 180, top: 0, width: 60, height: 59 },
    ];
    self = this;
    this.ssprite = new Sprite('slash', new SpriteSheetPainter(this.slashCells));
    this.interval;
    this.lastAdvance = 0;
    this.PAGEFLIP_INTERVAL = 5;
    this.Init();
    
};

SlashSprite.prototype = {
   
    Init : function() {
        this.ssprite.width = blockWidth;
        this.ssprite.height = blockWidth;
        this.ssprite.visible = false;
        this.lastAdvance = 0;
        this.ssprite.left = heroObject.left + blockWidth;
        this.ssprite.top = heroObject.top;
    },

    SlashDir : function()
    {
        if (direction == "up") {
             this.ssprite.left = heroObject.left;
             this.ssprite.top = heroObject.top - blockWidth;
        } else if (direction == "down") {
             this.ssprite.left = heroObject.left;
             this.ssprite.top = heroObject.top + blockWidth;
        } else if (direction == "left") {
             this.ssprite.left = heroObject.left-blockWidth;
             this.ssprite.top = heroObject.top;
        } else if (direction == "right") {
             this.ssprite.left = heroObject.left + blockWidth;
             this.ssprite.top = heroObject.top;
        }
        this.ssprite.painter.cellIndex =0;
        this.ssprite.visible = true;
    },

    Animate:function(p_time) {
        if (stopControl)
            if (direction == "left" || direction == "right") {
                this.scaleDir = direction == "left" ? -1 : 1;
            }

        game.context.save();
        if (this.scaleDir == -1)
            this.ssprite.SetPosition(-this.ssprite.left - blockWidth, this.ssprite.top);
        game.context.scale(this.scaleDir, 1);

        this.ssprite.Paint(game.context);
        game.context.restore();

        if (p_time - this.lastAdvance > this.PAGEFLIP_INTERVAL) {
            this.ssprite.painter.Advance();
            this.lastAdvance = p_time;
            if (this.ssprite.painter.cellIndex == 0) {
                this.ssprite.visible = false;
            }
        }
    } 

};

