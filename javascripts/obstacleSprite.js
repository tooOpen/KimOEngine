
function ObstacleSprite(p_id,p_imageName,p_ismove) {
    this.x = 0;
    this.y = 0;
    this.left = 0;
    this.top = 0;
    this.localLeft = 0;
    this.localTop = 0;
    this.state = p_ismove; //movable , unmovable
    this.name = p_imageName;
    this.id = p_id;
    this.obstacleSprite = new Sprite(this.id, new ImagePainter(this.name));
    this.Init();
};

ObstacleSprite.prototype = {

    Init : function() {
    this.obstacleSprite.width = blockWidth;
    this.obstacleSprite.height = blockWidth;
    },

    Render : function() {
     this.obstacleSprite.paint(game.context);
    },
    
  
    PushedByHero : function() {
        if (this.state == "movable") {
         console.log("nope");
            if (direction == "up") {
                if (this.y - 1 >= 0) {
                    if (gameField[this.y-1][this.x] == 0 ) {
                        gameField[this.y][this.x] = 0;
                        this.y -= 1;
                        this.top -= 50;
                        gameField[this.y][this.x] = this.id;
                    }
                }
            } else if (direction == "down") {
              if (this.y + 1 < gameField.length) {
                    if (gameField[this.y+1][this.x] == 0 ) {
                      gameField[this.y][this.x] = 0;
                        this.y += 1;
                        this.top += 50;
                        gameField[this.y][this.x] = this.id;
                    }
                }
            } else if (direction == "left") {
              if (this.x - 1 >= 0) {
                    if (gameField[this.y][this.x-1] == 0 ) {
                        gameField[this.y][this.x] = 0;
                        this.x -= 1;
                        this.left -= 50;
                         gameField[this.y][this.x] = this.id;
                    }
                }
            } else if (direction == "right") {
              if (this.y + 1 >= 0) {
                    if (gameField[this.y][this.x+1] == 0 ) {
                        gameField[this.y][this.x] = 0;
                        this.x += 1;
                        this.left += 50;
                        gameField[this.y][this.x] = this.id;
                    }
                }
            }
        }
        this.Invalid();
    },

    
    Update : function() {
   
    },

    Invalid : function() {
        this.obstacleSprite.SetPosition(this.localLeft, this.localTop);
    }
};


