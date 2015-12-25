
function EnemySprite(p_id,p_imageName,p_isAI,p_health,p_attack) {
	this.x = 0;
	this.y = 0;
	this.left = 0;
	this.top = 0;
	this.isAI = p_isAI;
	this.state = "patrol"; //patrol , tracking
	this.name = p_imageName;
	this.id = p_id;
    this.health = p_health;
    this.attack = p_attack;
	this.enemySprite = new Sprite(this.id, new ImagePainter(this.name));
	this.Init();
};

EnemySprite.prototype = {

	Init : function() {
	this.enemySprite.width = blockWidth;
    this.enemySprite.height = blockWidth;
	},

	Render : function() {
			this.enemySprite.paint(game.context);
	},
    
   AttackedByHero : function(p_damage)
    {
        if(this.health > p_damage)
        {
            this.health = this.health - p_damage;
        }
        else
        {
               soundSystem.PlaySound(enemyDieSound);
              gameField[this.y][this.x] = 0;
              this.enemySprite.visible = false;
              this.state = "die";
             
        }
    },

	AIUpdate:function() {

		if (this.isAI) {
			if (stopControl && !game.paused) {
				if (this.state == "patrol") {
					var verticalAndhorizon = Math.random() < 0.5 ? "vertical" : "horizon";
					var plusOrMinus = Math.random() < 0.5 ? -1 : 1;

					if (verticalAndhorizon == "vertical") {
					if(this.y + plusOrMinus < gameField.length &&this.y + plusOrMinus > -1 &&gameField[this.y + plusOrMinus][this.x] == 0)
                        {
                            if (this.y + plusOrMinus >= 0 && this.y + plusOrMinus < gameField.length) {
                                gameField[this.y][this.x] = 0;
                                this.y += plusOrMinus;
                                gameField[this.y][this.x] = this.id;
                                this.top += plusOrMinus * blockWidth;
                            } else {

                                plusOrMinus *= -1;
                                gameField[this.y][this.x] = 0;
                                this.y += plusOrMinus;
                                gameField[this.y][this.x] = this.id;
                                this.top += plusOrMinus * blockWidth;
                            }
                        }

					} 
                    else {
                        if (gameField[this.y ][this.x + plusOrMinus] == 0) {
                            if (this.x + plusOrMinus >= 0 && this.x + plusOrMinus < gameField[0].length ) {
                                gameField[this.y][this.x] = 0;
                                this.x += plusOrMinus;
                                gameField[this.y][this.x] = this.id;
                                this.left += plusOrMinus * blockWidth;
                            } else {

                                plusOrMinus *= -1;
                                gameField[this.y][this.x] = 0;
                                this.x += plusOrMinus;
                                gameField[this.y][this.x] = this.id;
                                this.left += plusOrMinus * blockWidth;

                            }
                        }
                    }
				} else if (this.state == "tracking"){
					var T_verticalAndhorizon = Math.random() < 0.5 ? "vertical" : "horizon";
					if (T_verticalAndhorizon == "vertical") {
						if (this.x - heroObject.x < 0) {
							if (this.x + 1 >= 0 && this.x + 1 < gameField[0].length && gameField[this.y ][this.x + 1] == 0) {
							gameField[this.y][this.x] = 0;
							this.x += 1;
							gameField[this.y][this.x] = this.id;
							this.left += blockWidth;
							}
						} else {
							if (this.x - 1 >= 0 && this.x - 1 < gameField[0].length && gameField[this.y ][this.x - 1] == 0) {
							gameField[this.y][this.x] = 0;
							this.x += -1;
							gameField[this.y][this.x] = this.id;
							this.left -= blockWidth;
							}
						}
					} else {
						if (this.y - heroObject.y < 0) {
							if (this.y + 1 >= 0 && this.y + 1 < gameField.length && gameField[this.y + 1][this.x] == 0) {
							gameField[this.y][this.x] = 0;
							this.y += 1;
							gameField[this.y][this.x] = this.id;
							this.top += blockWidth;
							}
						} else {
							if (this.y - 1 >= 0 && this.y - 1 < gameField.length && gameField[this.y - 1][this.x] == 0) {
							gameField[this.y][this.x] = 0;
							this.y += -1;
							gameField[this.y][this.x] = this.id;
							this.top -= blockWidth;
							}
						}
					}
				}
				else
				{
				
				}
				this.Invalid();
				
			}
			var self = this;
			setTimeout(function() {
				self.AIUpdate();
			}, 1200);
		}

	},

	Update : function() {
	if(this.state != "die")
	{
		var distanceX = heroObject.x - this.x;
		var distanceY = heroObject.y - this.y;
		
		if(Math.abs(distanceX + distanceY) < 5)
		{
			this.state = "tracking";
		}
		else
		{
			this.state = "patrol";
		}
	}
		this.Invalid();
	},

	Invalid : function() {
  		this.enemySprite.SetPosition(this.left, this.top);
	}
};


