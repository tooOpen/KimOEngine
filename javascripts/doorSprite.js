

function doorSprite() {
    this.x = 0;
    this.y = 0;
    this.left = 0;
    this.top = 0;
    this.localLeft = 0;
    this.localTop = 0;
    this.openPainter = new ImagePainter('http://tooopen.github.io/KimOEngine/images/openGate.png');
    this.closePainter = new ImagePainter('http://tooopen.github.io/KimOEngine/images/cloesedGate.png');
    this.doorsprite = new Sprite(this.id, this.closePainter);
    this.Init();
};

doorSprite.prototype = {

    Init : function() {
    this.doorsprite.width = blockWidth;
    this.doorsprite.height = blockWidth;
    },

    Render : function() {
     this.doorsprite.Paint(game.context);
    },
    
    Update : function() {
    if(enemyManagerObject.enemyObjects.length == 0)
    {
    gameField[this.y][this.x] = "openDoor";
    this.doorsprite.painter = this.openPainter;
    }
    else
    {
   for(i in enemyManagerObject.enemyObjects)
        {
            
            if(enemyManagerObject.enemyObjects[i].enemySprite.visible==true)
            break;
             
            if(i == enemyManagerObject.enemyObjects.length-1 &&  gameField[this.y][this.x] == "door")
            {
                
                gameField[this.y][this.x] = "openDoor";
                this.doorsprite.painter = this.openPainter;
            }
        }
        }
    },

    Invalid : function() {
        this.doorsprite.SetPosition(this.localLeft, this.localTop);
    }
};


