var getTimeNow = function() {
    return Date.now();
};

 gameGUI = new GUI();
 

var Transitiondone = false;
var after_loading_state;
var GAME_FPS;
var game_state = new LoadingState();
nowGameStateis = 1;
var stopControl = false; // playState ready
var enemyManagerObject = new enemyManager();
var direction;
var gameover = false;

var soundSystem = new SoundSystem();
var inputSystem = new InputSystem();

var doorPainter = new ImagePainter('cloesedGate.png');
var doorSprite = new Sprite('door',doorPainter);

//var blackhole = new BlackHole();
var Game = function(gameName, canvasId) {

    document.title = gameName;
    var canvas = document.getElementById(canvasId), //캔버스 얻어오기
        self = this;
    this.context = canvas.getContext('2d');
    gameField = null;

    this.sprites = [];
    canvas.width = b_canvasWidth;
    canvas.height = b_canvasHeight;

    this.startTime = 0;
    this.lastTime = 0;
    this.gameTime = 0;
    this.fps = 0;
    this.START_FPS = 60;

    this.paused = false;
    this.staredPauseAt = 0;
    this.PAUSE_TIMEOUT = 100;

    // Time

    this.startTime = 0;
    this.lastTime = 0;
    this.gameTime = 0;
    this.fps = 0;
    this.STARTING_FPS = 60;

    this.paused = false;
    this.startedPauseAt = 0;
    this.PAUSE_TIMEOUT = 100;
    return this;
};

Game.prototype = {
   
    start : function() {
        var self = this;
        // 게임 초기 시작 상태 설정
        after_loading_state = logoState;
        this.startTime = getTimeNow();
        doorSprite.width = blockWidth;
        doorSprite.height = blockWidth;

        resourcePreLoader.AddImage("exitSign.png");
        resourcePreLoader.AddImage("HPText.png");
        resourcePreLoader.AddImage("heartBeat.png");
        resourcePreLoader.AddImage("slash.png");
        resourcePreLoader.AddImage("pause.png");
        soundSystem.AddSound("intro.mp3");
        window.requestNextAnimationFrame(function(time) {
            self.animate.call(self, time);
        });

    },

    addField : function(field) {
        gameField = field;
    },

    //-----------------------Attack
    heroAttack : function() {
       var isWall = false;
        if (stopControl && !this.paused) {
            if (direction == "up") {
                if (heroObject.y - 1 >= 0) { //Boundary check
                    if (/enemy[0-9]+/.test(gameField[heroObject.y-1][heroObject.x])) {
                        enemyManagerObject.getObject(gameField[heroObject.y-1][heroObject.x]).AttackedByHero(heroObject.attack);
                    }
                    else if(/obstacle[0-9]+/.test(gameField[heroObject.y-1][heroObject.x]))
                    {
                        playState.getSprite(gameField[heroObject.y-1][heroObject.x]).PushedByHero();
                        isWall = true;
                    }
                    
                }
            } else if (direction == "down") {
                if (heroObject.y + 1 < gameField.length) { //Boundary check
                    if (/enemy[0-9]+/.test(gameField[heroObject.y+1][heroObject.x])) {
                     enemyManagerObject.getObject(gameField[heroObject.y+1][heroObject.x]).AttackedByHero(heroObject.attack);   
                    }
                    else if(/obstacle[0-9]+/.test(gameField[heroObject.y+1][heroObject.x]))
                    {
                        playState.getSprite(gameField[heroObject.y+1][heroObject.x]).PushedByHero();
                          isWall = true;
                    }
                }
            } else if (direction == "right") {
                if (heroObject.x + 1 < gameField[0].length) { //Boundary check
                    if (/enemy[0-9]+/.test(gameField[heroObject.y][heroObject.x + 1])) {
                     enemyManagerObject.getObject(gameField[heroObject.y][heroObject.x+1]).AttackedByHero(heroObject.attack);  
                    }
                    else if(/obstacle[0-9]+/.test(gameField[heroObject.y][heroObject.x + 1]))
                    {
                        playState.getSprite(gameField[heroObject.y][heroObject.x + 1]).PushedByHero();
                          isWall = true;
                    }
                }
            } else if (direction == "left") {
                if (heroObject.x - 1 >= 0) { //Boundary check
                    if (/enemy[0-9]+/.test(gameField[heroObject.y][heroObject.x - 1])) {
                      enemyManagerObject.getObject(gameField[heroObject.y][heroObject.x-1]).AttackedByHero(heroObject.attack);
                    }
                    else if(/obstacle[0-9]+/.test(gameField[heroObject.y][heroObject.x-1]))
                    {
                        playState.getSprite(gameField[heroObject.y][heroObject.x-1]).PushedByHero();
                          isWall = true;
                    }
                }
            }
        }
           if(!isWall)
           {
            soundSystem.PlaySound(effectSound);
          slashObject.slashDir(); //slash Animation
          }
    },
    //----------heroMoveCollisionCheck
    heroMoveCollisionCheck : function() {
    if(nowGameStateis == 4 && !this.paused)
    {
        if (stopControl) {
            if (direction == "up") {
                if (heroObject.y - 1 >= 0) {
                    if (gameField[heroObject.y-1][heroObject.x] == 0 || gameField[heroObject.y-1][heroObject.x] == "openDoor") {
                        heroObject.top -= blockWidth;
                        heroObject.y -= 1;
                    }
                }
            } else if (direction == "down") {
                if (heroObject.y + 1 < gameField.length) {
                    if (gameField[heroObject.y + 1][heroObject.x] == 0 || gameField[heroObject.y+1][heroObject.x] == "openDoor") {
                        heroObject.top += blockWidth;
                        heroObject.y += 1;
                    }
                }
            } else if (direction == "right") {
                if (heroObject.x + 1 < gameField[0].length) {
                    if (gameField[heroObject.y][heroObject.x + 1] == 0 || gameField[heroObject.y][heroObject.x+1] == "openDoor") {
                        heroObject.left += blockWidth;
                        heroObject.x += 1;
                    }
                }
            } else if (direction == "left") {
                if (heroObject.x - 1 >= 0) {
                    if (gameField[heroObject.y][heroObject.x - 1] == 0 || gameField[heroObject.y][heroObject.x-1] == "openDoor") {
                        heroObject.left -= blockWidth;
                        heroObject.x -= 1;
                    }
                }
            }
        }
        }
    },
    //collsion--------override It
    HeroCollisionCheck : function() { },

    animate : function(time) {
        var self = this;
        if (this.paused) {
            this.clearScreen();
           this.context.save();
           this.context.globalAlpha = 0.6;
            this.context.drawImage(resourcePreLoader.GetImage("pause.png"),0,0,b_canvasWidth,b_canvasHeight);
            this.context.restore();
            setTimeout(function() {
                window.requestNextAnimationFrame(function(time) {
                    self.animate.call(self, time);
                });
            }, this.PAUSE_TIMEOUT);
        } else {
            this.tick(time);
           if(nowGameStateis!=2)
            this.clearScreen();
           
            game_state.Update(time);
            game_state.Render(time);
            this.HeroCollisionCheck();
            gameTransi();
            window.requestNextAnimationFrame(function(time) {
                self.animate.call(self, time);
            });
        }
    },

    tick : function(time) {
        this.updateFrameRate(time);
        this.gameTime = (getTimeNow()) - this.startTime;

    },

    
    updateFrameRate : function(time) {
        if (this.lastTime === 0)
            this.fps = this.STARTING_FPS;
        else
            this.fps = 1000 / (time - this.lastTime);
    },

    clearScreen : function() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    },
};
