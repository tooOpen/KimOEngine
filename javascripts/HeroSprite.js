
function HeroSprite(p_imageName,p_health,p_attack) {
	this.heroSprite = new Sprite('hero', new ImagePainter(p_imageName));
	this.x = 0;
	this.y = 0;
	this.left = 0;
	this.top = 0;
	this.heroDirection = "right";
	this.scaleDir = 1;
	this.health = p_health;
	this.attack = p_attack;
	this.Init();
};

HeroSprite.prototype = {

	Init : function() {
    this.heroSprite.width = blockWidth;
    this.heroSprite.height = blockWidth;
	},

	Render : function() {
		if(stopControl)
		if(direction == "left" ||direction == "right")
		{
			this.scaleDir =  direction == "left" ? -1:1;
		}
			game.context.save();
			if(this.scaleDir == -1)
			this.heroSprite.SetPosition(-this.left-blockWidth, this.top);
			game.context.scale(this.scaleDir,1);
			this.heroSprite.Paint(game.context);
			game.context.restore();
	
	},
	Update : function() {
		
		this.Invalid();
	},

	Invalid : function() {
		this.heroSprite.SetPosition(this.left, this.top);
	}
};


