var ImagePainter = function(p_imageUrl) {
    this.image = new Image;
    this.url = p_imageUrl;
    this.image.src = this.url;
};
ImagePainter.prototype = {
    Paint : function(p_sprite, p_context) {

        if (this.image !== undefined) {

            this.image.onload = function(e) {
                p_sprite.width = this.width;
                p_sprite.height = this.height;
            };
            if (!this.image.complete) {
                this.image.onload = function(e) {
                    p_sprite.width = this.width;
                    p_sprite.height = this.height;
                    p_context.drawImage(this, p_sprite.left, p_sprite.top, p_sprite.width, p_sprite.height);
                };
            }
            p_context.drawImage(this.image, p_sprite.left, p_sprite.top, p_sprite.width, p_sprite.height);
        }
    }
};

SpriteSheetPainter = function(cells) {
    this.cells = cells;
};

SpriteSheetPainter.prototype = {
    cells : [],
    cellIndex : 0,
    Advance : function() {
        if (this.cellIndex == this.cells.length - 1) {
            this.cellIndex = 0;
        } else {
            this.cellIndex++;
        }
    },

    Paint : function(sprite, context) {

        var cell = this.cells[this.cellIndex];
        context.drawImage(spritesheet, cell.left, cell.top, cell.width, cell.height, sprite.left, sprite.top, sprite.width, sprite.height);
    }
};

var SpriteAnimator = function(p_painters, p_elapsedCallback) {
    this.painters = p_painters;
    if (elapsedCallback) {
        this.elapsedCallback = p_elapsedCallback;
    }
};

SpriteAnimator.prototype = {
    painters : [],
    duration : 1000,
    startTime : 0,
    index : 0,
    elapsedCallback : undefined,

    End : function(sprite, originalPainter) {
        sprite.animating = false;

        if (this.elapsedCallback) {
            this.elapsedCallback(sprite);
        } else {
            sprite.painter = originalPainter;
        }
    },

    Start : function(sprite, duration) {
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

var Sprite = function(p_name, p_painter, p_behaviors) {
    this.left = 0;
    this.top = 0;
    this.width = 0;
    this.height = 0;
    this.velocityX = 0;
    this.velocityY = 0;
    this.visible = true;
    this.animating = false;
    this.painter = undefined;
    this.behaviors = [];
    
    if (p_name !== undefined)
        this.name = p_name;
    if (p_painter !== undefined)
        this.painter = p_painter;
    if (p_behaviors !== undefined)
        this.behaviors = p_behaviors;

    return this;
};

Sprite.prototype = {
    Paint : function(p_context) {
        if (this.painter !== undefined && this.visible) {
            this.painter.Paint(this, p_context);
        }
    },

    Update : function(p_context, p_time) {
        for (var i = this.behaviors.length; i > 0; --i) {
            this.behaviors[i - 1].Execute(this, p_context, p_time);
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
