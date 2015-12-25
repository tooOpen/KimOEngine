
function enemyManager() {
	this.enemyObjects = [];
	this.enemyNum =0;
}

enemyManager.prototype = {

	Init : function() {

	},

	updateSprites : function(time) {
		for (var i = 0; i < this.enemyObjects.length; ++i) {
			var sprite = this.enemyObjects[i].enemySprite;
			sprite.update(game.context, time);
		}
	},

	paintSprites : function(time) {
		for (var i = 0; i < this.enemyObjects.length; ++i) {
			var sprite = this.enemyObjects[i].enemySprite;
			if (sprite.visible)
				sprite.paint(game.context);
		}
	},

	Render : function(time) {
		this.paintSprites(time);
	},

	Update : function(time) {
		this.updateSprites(time);
	},

	Restart : function() {

	},

	addObject : function(sprite) {
		this.enemyObjects.push(sprite);
		++this.enemyNum;
		
	},

	getObject : function(name) {
		
		for (i in this.enemyObjects) {
			if (this.enemyObjects[i].enemySprite.name === name)
			{
				
				return this.enemyObjects[i];
			}
		}
		return null;
	},
	
	Notification : function(msg) {
		switch( msg ) {

		}
	}
};

