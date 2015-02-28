
function enemyManager() {
	this.enemyObjects = [];
	this.enemyNum =0;
}

enemyManager.prototype = {

	Init : function() {

	},

	UpdateSprites : function(p_time) {
		for (var i = 0; i < this.enemyObjects.length; ++i) {
			var sprite = this.enemyObjects[i].enemySprite;
			sprite.update(game.context, p_time);
		}
	},

	PaintSprites : function() {
		for (var i = 0; i < this.enemyObjects.length; ++i) {
			var sprite = this.enemyObjects[i].enemySprite;
			if (sprite.visible)
				sprite.paint(game.context);
		}
	},

	Render : function() {
		this.paintSprites();
	},

	Update : function(time) {
		this.updateSprites(p_time);
	},

	Restart : function() {

	},

	AddObject : function(p_sprite) {
		this.enemyObjects.push(p_sprite);
		++this.enemyNum;
		
	},

	GetObject : function(p_name) {
		
		for (i in this.enemyObjects) {
			if (this.enemyObjects[i].enemySprite.name === p_name)
			{
				return this.enemyObjects[i];
			}
		}
		return null;
	}
};

