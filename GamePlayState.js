
function PlayGameState() {
	this.sprites = [];
	
}

PlayGameState.prototype = {

	Init : function() {
	stopControl = true;
		gameGUI.Init();
	},

	updateSprites : function(time) {
		for (var i = 0; i < this.sprites.length; ++i) {
			var sprite = this.sprites[i].obstacleSprite;
			sprite.update(game.context, time);
		}
	},

	paintSprites : function(time) {
		for (var i = 0; i < this.sprites.length; ++i) {
			var sprite = this.sprites[i].obstacleSprite;
			if (sprite.visible)
				sprite.paint(game.context);
		}
	},

	Render : function(time) {
		
	game.context.drawImage(resourcePreLoader.GetImage(mapBase), 0, 0);
	game.context.drawImage(resourcePreLoader.GetImage("exitSign.png"), 	doorSprite.left - blockWidth ,	doorSprite.top);
		doorSprite.paint(game.context);
		heroObject.Render();
		this.paintSprites();
		for(i in enemyManagerObject.enemyObjects)
		{
			enemyManagerObject.enemyObjects[i].Render();
		}
	//	this.drawGrid('white', blockWidth, blockWidth);
		 slashObject.animate(time);
     
	},

	Update : function(time) {
		this.updateSprites(time);
		heroObject.Update();
		for(i in enemyManagerObject.enemyObjects)
		{
			enemyManagerObject.enemyObjects[i].Update();
		}
		for(i in enemyManagerObject.enemyObjects)
		{
			if(enemyManagerObject.enemyObjects[i].enemySprite.visible==true)
			break;
			
			if(i == enemyManagerObject.enemyNum-1 &&  gameField[doorSprite.top/blockWidth][doorSprite.left/blockWidth] == "door")
			{
			    gameField[doorSprite.top/blockWidth][doorSprite.left/blockWidth] = "openDoor";
				doorSprite.painter.image.src = "openGate.png";
			}
		}
		
	},

	Restart : function() {

	},

	addSprite : function(sprite) {
		this.sprites.push(sprite);
	},

	getSprite : function(id) {
	
		for (i in this.sprites) {
			if (this.sprites[i].id === id)
				return this.sprites[i];
		}
		return null;
	},
	drawGrid : function(color, stepx, stepy) {
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

		}
	}
};

