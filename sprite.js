
var ImagePainter = function(imageUrl) {
	this.image = new Image;
	this.url = imageUrl;
	this.image.src = this.url;
};
ImagePainter.prototype = {
	image : undefined,

	paint : function(sprite, context) {

		if (this.image !== undefined) {

			this.image.onload = function(e) {
				sprite.width = this.width;
				sprite.height = this.height;
				
			};
			if (!this.image.complete) {
				this.image.onload = function(e) {
					sprite.width = this.width;
					sprite.height = this.height;
					context.drawImage(this, sprite.left, sprite.top, sprite.width, sprite.height);
				};
			}
			//this.image.src = this.url;
			context.drawImage(this.image, sprite.left, sprite.top, sprite.width, sprite.height);

		}
	}
};

SpriteSheetPainter = function(cells) {
	this.cells = cells;
};

SpriteSheetPainter.prototype = {
	cells : [],
	cellIndex : 0,

	advance : function() {
		if (this.cellIndex == this.cells.length - 1) {
			this.cellIndex = 0;
		} else {
			this.cellIndex++;
		}
	},

	paint : function(sprite, context) {
	
		var cell = this.cells[this.cellIndex];
		context.drawImage(spritesheet, cell.left, cell.top, cell.width, cell.height, sprite.left, sprite.top, sprite.width, sprite.height);
	}
};


var SpriteAnimator = function(painters, elapsedCallback) {
	this.painters = painters;
	if (elapsedCallback) {
		this.elapsedCallback = elapsedCallback;
	}
};

SpriteAnimator.prototype = {
	painters : [],
	duration : 1000,
	startTime : 0,
	index : 0,
	elapsedCallback : undefined,

	end : function(sprite, originalPainter) {
		sprite.animating = false;

		if (this.elapsedCallback) {
			this.elapsedCallback(sprite);
		} else {
			sprite.painter = originalPainter;
		}
	},

	start : function(sprite, duration) {
		var endTime = +new Date() + duration,
		    period = duration / (this.painters.length),
		    interval =
		    undefined,
		    animator = this, // for setInterval() function
		    originalPainter = sprite.painter;

		this.index = 0;
		sprite.animating = true;
		sprite.painter = this.painters[this.index];

		interval = setInterval(function() {
			if (+new Date() < endTime) {
				sprite.painter = animator.painters[++animator.index];
			} else {
				animator.end(sprite, originalPainter);
				clearInterval(interval);
			}
		}, period);
	},
};


var Sprite = function(name, painter, behaviors) {
	if (name !== undefined)
		this.name = name;
	if (painter !== undefined)
		this.painter = painter;
	if (behaviors !== undefined)
		this.behaviors = behaviors;

	return this;
};

Sprite.prototype = {
	left : 0,
	top : 0,
	width : 0,
	height : 0,
	velocityX : 0,
	velocityY : 0,
	visible : true,
	animating : false,
	painter : undefined, 
	behaviors : [], 
	paint : function(context) {
		if (this.painter !== undefined && this.visible) {
		
			this.painter.paint(this, context);
		}
	},

	update : function(context, time) {
		for (var i = this.behaviors.length; i > 0; --i) {
			this.behaviors[i - 1].execute(this, context, time);
		}
	},
	Translate : function(x, y) {
		this.left += x;
		this.top += y;
	},

	SetPosition : function(x, y) {
		this.left = x;
		this.top = y;
	}
};
