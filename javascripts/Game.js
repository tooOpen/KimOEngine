var getTimeNow = function() {
    return Date.now();
};

 gameGUI = new GUI();
var nowGameStateis = 0;
var b_canvasWidth = 1100;
var b_canvasHeight = 850;
var b_canvasWidthfortransiton = window.innerWidth;
var b_canvasHeightfortransiton = window.innerHeight;
var Transitiondone = false;
var after_loading_state;
var GAME_FPS;
var game_state = new LoadingState();
var nowGameStateis = 1;
var stopControl = false; // playState ready
var enemyManagerObject = new enemyManager();
var direction;
var gameChange = false;
var lastAdvance = 0;
var soundSystem = new SoundSystem();
var inputSystem = new InputSystem();



//var blackhole = new BlackHole();
var Game = function(gameName, canvasId) {
    
    document.title = gameName;
    this.name  = gameName;
    var canvas = document.getElementById(canvasId), //캔버스 얻어오기
        self = this;
    this.context = canvas.getContext('2d');
    
    canvas.width = b_canvasWidth;
    canvas.height = b_canvasHeight;

    this.paused = false;
    this.staredPauseAt = 0;
    this.PAUSE_TIMEOUT = 100;
    this.jebal = true;
    doorsprite = new doorSprite();
    return this;
};

Game.prototype = {
   
    start : function() {
        var self = this;
        after_loading_state = logoState;
        this.startTime = getTimeNow();

        //resourcePreLoader.AddImage("http://tooopen.github.io/KimOEngine/images/exitSign.png");
        resourcePreLoader.AddImage("http://tooopen.github.io/KimOEngine/images/HPText.png");
        resourcePreLoader.AddImage("http://tooopen.github.io/KimOEngine/images/start.png");
        resourcePreLoader.AddImage("http://tooopen.github.io/KimOEngine/images/heartBeat.png");
        resourcePreLoader.AddImage("http://tooopen.github.io/KimOEngine/images/slash.png");
        resourcePreLoader.AddImage("http://tooopen.github.io/KimOEngine/images/pause.png");
        soundSystem.AddSound("http://tooopen.github.io/KimOEngine/sounds/intro.mp3",2);
       
        window.requestNextAnimationFrame(function(time) {
            self.Animate.call(self, time);
        });

    },


    //-----------------------Attack
    heroAttack : function() {
       var isWall = false;
        if (stopControl && !this.paused) {
            if (direction == "up") {
                if (heroObject.y - 1 >= 0) { //Boundary check
                    if (/enemy+/.test(gameField[heroObject.y-1][heroObject.x])) {
                        enemyManagerObject.GetObject(gameField[heroObject.y-1][heroObject.x]).AttackedByHero(heroObject.attack);
                    }
                    else if(/obstacle+/.test(gameField[heroObject.y-1][heroObject.x]))
                    {
                        playState.GetSprite(gameField[heroObject.y-1][heroObject.x]).PushedByHero();
                        isWall = true;
                    }
                    
                }
            } else if (direction == "down") {
                if (heroObject.y + 1 < gameField.length) { //Boundary check
                    if (/enemy+/.test(gameField[heroObject.y+1][heroObject.x])) {
                     enemyManagerObject.GetObject(gameField[heroObject.y+1][heroObject.x]).AttackedByHero(heroObject.attack);   
                    }
                    else if(/obstacle+/.test(gameField[heroObject.y+1][heroObject.x]))
                    {
                        playState.GetSprite(gameField[heroObject.y+1][heroObject.x]).PushedByHero();
                          isWall = true;
                    }
                }
            } else if (direction == "right") {
                if (heroObject.x + 1 < gameField[0].length) { //Boundary check
                    if (/enemy+/.test(gameField[heroObject.y][heroObject.x + 1])) {
                     enemyManagerObject.GetObject(gameField[heroObject.y][heroObject.x+1]).AttackedByHero(heroObject.attack);  
                    }
                    else if(/obstacle+/.test(gameField[heroObject.y][heroObject.x + 1]))
                    {
                        playState.GetSprite(gameField[heroObject.y][heroObject.x + 1]).PushedByHero();
                          isWall = true;
                    }
                }
            } else if (direction == "left") {
             
                if (heroObject.x - 1 >= 0) { //Boundary check
               
                    if (/enemy+/.test(gameField[heroObject.y][heroObject.x - 1])) {
                    
                      enemyManagerObject.GetObject(gameField[heroObject.y][heroObject.x-1]).AttackedByHero(heroObject.attack);
                    }
                    else if(/obstacle+/.test(gameField[heroObject.y][heroObject.x-1]))
                    {
                        playState.GetSprite(gameField[heroObject.y][heroObject.x-1]).PushedByHero();
                          isWall = true;
                    }
                }
            }
        }
           if(!isWall)
           {
            soundSystem.PlaySound(effectSound);
          slashObject.SlashDir(); //slash Animation
          }
    },
    //----------heroMoveCollisionCheck
    heroMoveCollisionCheck : function() {
    if(nowGameStateis == 4 && !this.paused)
    {
        if (stopControl) {
            if (direction == "up") {
                if (heroObject.y - 1 >= 0) {
                    if (gameField[heroObject.y-1][heroObject.x] == 0 || gameField[heroObject.y-1][heroObject.x] == "openDoor") { //enable to move
                        soundSystem.PlaySound(heroStepsrc);
                        if(Math.abs(heroObject.top - b_canvasHeight/2)<50 && startY != 0)
                        {
                        startY += 50;
                        }
                        else
                        {
                        heroObject.top -= blockWidth;
                        }
                         heroObject.y -= 1;
                    }
                }
            } else if (direction == "down") {
                if (heroObject.y + 1 < gameField.length) {
                    if (gameField[heroObject.y + 1][heroObject.x] == 0 || gameField[heroObject.y+1][heroObject.x] == "openDoor") {
                    soundSystem.PlaySound(heroStepsrc);
                     if(Math.abs(heroObject.top - b_canvasHeight/2)<50 &&b_canvasHeight - startY != real_canvasHeight)
                        {
                        startY -= 50;
                        }
                        else
                        {
                        heroObject.top += blockWidth;
                        }
                         heroObject.y += 1;
                    }
                }
            } else if (direction == "right") {
                if (heroObject.x + 1 < gameField[0].length) {
                    if (gameField[heroObject.y][heroObject.x + 1] == 0 || gameField[heroObject.y][heroObject.x+1] == "openDoor") {
                    soundSystem.PlaySound(heroStepsrc);
                     if(Math.abs(heroObject.left - b_canvasWidth/2)<50 &&b_canvasWidth - startX != real_canvasWidth)
                        {
                        startX -= 50;
                        }
                        else
                        {
                        heroObject.left += blockWidth;
                       
                        }
                         heroObject.x += 1;
                    }
                }
            } else if (direction == "left") {
                if (heroObject.x - 1 >= 0) {
                    if (gameField[heroObject.y][heroObject.x - 1] == 0 || gameField[heroObject.y][heroObject.x-1] == "openDoor") {
                    soundSystem.PlaySound(heroStepsrc);
                     if(Math.abs(heroObject.left - b_canvasWidth/2)<50 &&startX != 0)
                        {
                        startX += 50;
                        }
                        else
                        {
                        heroObject.left -= blockWidth;
                      
                        }
                          heroObject.x -= 1;
                    }
                }
            }
        }
        }
    },
  
  
    HeroCollisionCheck : function(time) {
    if(stopControl)
    {
        if (time - lastAdvance > 800) {
            lastAdvance = time;
            if (/enemy+/.test(gameField[heroObject.y][heroObject.x])) {
                soundSystem.PlaySound(heroHittedsrc);
                var enemyAttack = enemyManagerObject.GetObject(gameField[heroObject.y][heroObject.x]).attack;
                if(heroObject.health - enemyAttack > 0)
                {
                    heroObject.health -= enemyAttack;
                }  
                else
                {
                      soundSystem.PlaySound(heroDiesrc);
                     heroObject.health  = 0;
                    playState.Notification("gameOver");
                }
            } 
        }
        }
    },

    Animate : function(time) {
        var self = this;
        if (this.paused) {
           this.clearScreen();
           this.context.save();
           this.context.globalAlpha = 0.6;
            this.context.drawImage(resourcePreLoader.GetImage("http://tooopen.github.io/KimOEngine/images/pause.png"),0,0,b_canvasWidth,b_canvasHeight);
            this.context.restore();
            setTimeout(function() {
                window.requestNextAnimationFrame(function(time) {
                    self.Animate.call(self, time);
                });
            }, this.PAUSE_TIMEOUT);
        } else {
            this.tick(time);
           if(nowGameStateis!=2)
            this.clearScreen();
           
            game_state.Update(time);
            game_state.Render(time);
            this.HeroCollisionCheck(time);
            gameTransi();
            
            
            //----connect
             if (gameField[heroObject.y][heroObject.x] == 'openDoor') {
             if( isConnected)
             {
              soundSystem.PauseSound(backgroundSound);
                gameField[heroObject.y][heroObject.x] = 0;
                gameChange = true;
                stopControl = false;
               
                while(enemyManagerObject.enemyObjects.pop());
                while(playState.sprites.pop());
                 while(soundSystem.arrSounds.pop());
                 soundSystem.backgroundMusic = undefined;
                  soundSystem.AddSound("http://tooopen.github.io/KimOEngine/sounds/buzz.mp3",2);
                   soundSystem.PlaySound('http://tooopen.github.io/KimOEngine/sounds/buzz.mp3');
                   game.jebal = false ;
                  doorsprite = new doorSprite();
                  onGameInit(false);
                 game_state = gametitleState;
                gameGUI.Gcanvas.style.visibility = 'hidden';
              
                setTimeout(function(){  Transitiondone = true;    soundSystem.PauseSound('http://tooopen.github.io/KimOEngine/sounds/buzz.mp3'); nowGameStateis = 3;game_state.Init();}, 3000);
                }
                else
                {
                     playState.Notification("gameClear");
                }
            }
            
            
            if(this.jebal)
            window.requestNextAnimationFrame(function(time) {
                self.Animate.call(self, time);
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
