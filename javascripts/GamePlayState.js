startX = 0;
startY = 0;

function PlayGameState() {
    this.sprites = [];
    this.gameover = 0;
}

PlayGameState.prototype = {
    PreInit : function() {
        if (heroObject.left + 25 < real_canvasWidth / 2) {
            if (heroObject.left + 25 - b_canvasWidth / 2 > 0) {
                startX = -(heroObject.left - b_canvasWidth / 2);
            } else {

                startX = 0;
            }
        } else {
            if (heroObject.left + 25 + b_canvasWidth / 2 < real_canvasWidth) {
                startX = -(heroObject.left - b_canvasWidth / 2);
            } else {
                startX = -(real_canvasWidth - b_canvasWidth);
            }
        }

        if (heroObject.top + 25 < real_canvasHeight / 2) {
            if (heroObject.top + 25 - b_canvasHeight / 2 > 0) {
                startY = -(heroObject.top + 25 - b_canvasHeight / 2);
            } else {
                startY = 0;
            }
        } else {
            if (heroObject.top + 25 + b_canvasHeight / 2 < real_canvasHeight) {
                startY = -(heroObject.top + 25 - b_canvasHeight / 2);
            } else {
                startY = -(real_canvasHeight - b_canvasHeight);
            }
        }
        heroObject.left += startX;
        heroObject.top += startY;
        heroObject.Invalid();    
    },
    Init : function() {
        stopControl = true;
        gameGUI.Init();
        gameGUI.Gcanvas.style.visibility = 'visible';
        soundSystem.PlayBackgroundMusic(backgroundSound);
    },

    UpdateSprites : function(time) {
        for (var i = 0; i < this.sprites.length; ++i) {
            var sprite = this.sprites[i].obstacleSprite;
            sprite.Update(game.context, time);
        }
    },

    PaintSprites : function(time) {
        for (var i = 0; i < this.sprites.length; ++i) {
            var sprite = this.sprites[i].obstacleSprite;
            if (sprite.visible)
                sprite.Paint(game.context);
        }
    },

    Render : function(time) {
    
        if(this.gameover==0)
        {
        //-------------world to local
        for (var i = 0; i < this.sprites.length; ++i) {
            var sprite = this.sprites[i];
            sprite.localLeft = sprite.left + startX;
            sprite.localTop = sprite.top + startY;
            sprite.Invalid();
        }
        for (i in enemyManagerObject.enemyObjects) {
            enemyManagerObject.enemyObjects[i].localTop = enemyManagerObject.enemyObjects[i].top + startY;
            enemyManagerObject.enemyObjects[i].localLeft = enemyManagerObject.enemyObjects[i].left + startX;
            enemyManagerObject.enemyObjects[i].Invalid();
        }
        doorsprite.localLeft = doorsprite.left + startX;
        doorsprite.localTop = doorsprite.top + startY;
        doorsprite.Invalid();

        game.context.drawImage(resourcePreLoader.GetImage(mapBasesrc), startX, startY, real_canvasWidth, real_canvasHeight);
        //	game.context.drawImage(resourcePreLoader.GetImage("http://tooopen.github.io/KimOEngine/images/exitSign.png"), 	doorSprite.left - blockWidth ,	doorSprite.top);
        doorsprite.Render();
        heroObject.Render();
        this.PaintSprites();
        for (i in enemyManagerObject.enemyObjects) {
            enemyManagerObject.enemyObjects[i].Render();
        }
        //	this.drawGrid('white', blockWidth, blockWidth);
        slashObject.Animate(time);
        }
        else if(this.gameover==1)
        {
        game.context.drawImage(resourcePreLoader.GetImage(gameoversrc), 0, 0, b_canvasWidth, b_canvasHeight);
        }
        else
        {
          game.context.drawImage(resourcePreLoader.GetImage(gameclearsrc), 0, 0, b_canvasWidth, b_canvasHeight);
        }

    },

    Update : function(time) {
        this.UpdateSprites(time);
        heroObject.Update();
        for (i in enemyManagerObject.enemyObjects) {
            enemyManagerObject.enemyObjects[i].Update();
        }
        doorsprite.Update();
    },

    AddSprite : function(sprite) {
        this.sprites.push(sprite);
    },
    GetSprite : function(id) {

        for (i in this.sprites) {
            if (this.sprites[i].id === id)
                return this.sprites[i];
        }
        return null;
    },
    DrawGrid : function(color, stepx, stepy) {
        game.context.save();

        game.context.shadowColor = undefined;
        game.context.shadowOffsetX = 0;
        game.context.shadowOffsetY = 0;

        game.context.strokeStyle = color;
        game.context.fillStyle = '#ffffff';
        game.context.lineWidth = 0.5;

        for (var i = stepx + 0.5; i < game.context.canvas.width; i += stepx) {
            game.context.beginPath();
            game.context.moveTo(i, 0);
            game.context.lineTo(i, game.context.canvas.height);
            game.context.stroke();
        }

        for (var i = stepy + 0.5; i < game.context.canvas.height; i += stepy) {
            game.context.beginPath();
            game.context.moveTo(0, i);
            game.context.lineTo(game.context.canvas.width, i);
            game.context.stroke();
        }

        game.context.restore();
    },
    Notification : function(msg) {
        switch( msg ) {
          case "gameOver":
          soundSystem.PauseSound(backgroundSound);
          soundSystem.PlaySound(gameoversound);
          this.gameover = 1;
          stopControl = false;
           gameGUI.Gcanvas.style.visibility = 'hidden';
          break;
           case "gameClear":
             soundSystem.PauseSound(backgroundSound);
           soundSystem.PlaySound(gameclearsound);
          this.gameover = 2;
          stopControl = false;
           gameGUI.Gcanvas.style.visibility = 'hidden';
          break;
        }
    }
};

