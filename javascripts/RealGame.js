
var heroImage = 'dealer.png';
var playerAttack = 1;
var playerHeart = 5;
     
function onGameInit(test) {
 isConnected = test;

if(test){//iftest
 
//sub
     blockWidth = 50;
     real_canvasWidth = blockWidth*30;
     real_canvasHeight = blockWidth*30;
    
     closedDoorSrc = 'cloesedGate.png';
     openDoorSrc = 'openGate.png';
    
     game = new Game('KimchynityGame', 'GameCanvas');
     playState = new PlayGameState();
     logoState =  new GameLogoState();
    
     mapBasesrc = 'kPge7l18vU2bvnfL5StW1Q==.png';
     gameoversrc = 'over.jpg';
     gameclearsrc = 'gameclear.jpg';
     heroHittedsrc = 'hitted.ogg';
     heroStepsrc = 'step.wav';
     heroDiesrc = 'herodie.mp3';
     gameoversound = 'gameover.ogg';
     gameclearsound = 'gameclear.ogg';
     backgroundSound = 'Tsukemen.mp3';
     titleSound = 'temptitle.ogg';
     effectSound = 'Pacific Rim (feat  Tom Morello)_Ramin Djawadi_퍼시픽 림 (Pacific Rim .wav';
     enemyDieSound = 'die.mp3';
     titleImage = 'title.jpg';
    
    
     gametitleState =  new GameTitleState(titleImage);
     heroObject = new HeroSprite(heroImage,playerHeart,playerAttack);
        gameField = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,{name : 'obstacle4',src : decodeURI('%EB%8F%8C%EB%B0%94%EB%8B%A5.png'),isMovable : 'unmovable'  },0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,{name : 'obstacle5',src : decodeURI('%EB%8F%8C%EB%B0%94%EB%8B%A5.png'),isMovable : 'movable'  },0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,{name : 'obstacle12',src : decodeURI('%EB%8F%8C%EB%B0%94%EB%8B%A5.png'),isMovable : 'unmovable'  },0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,{name : 'obstacle11',src : decodeURI('%EC%82%AC%EB%9E%8C.png'),isMovable : 'movable'  },0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,'hero',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,'door',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],];;
//tmp

}else{//elstt
                                                                                                           
                                                                                                            
 
                                                                                                           
 
                                                                                                           
 
                                                                                                           
 
                                                                                                           
 
                                                                                                           
 
                                                                                                           
 
                                                                                                           
 
                                                                                                           
 
                                                                                                           
 
                                                                                                           
 
                                                                                                           
 
//sub
     blockWidth = 50;
     real_canvasWidth = blockWidth*30;
     real_canvasHeight = blockWidth*30;
    
     closedDoorSrc = 'cloesedGate.png';
     openDoorSrc = 'openGate.png';
    
     game = new Game('KimchynityGame', 'GameCanvas');
     playState = new PlayGameState();
     logoState =  new GameLogoState();
    
       mapBasesrc = 'temp2.png';
     gameoversrc = 'over.jpg';
     gameclearsrc = 'gameclear.jpg';
     heroHittedsrc = 'hitted.ogg';
     heroStepsrc = 'step.wav';
     heroDiesrc = 'herodie.mp3';
     gameoversound = 'gameover.ogg';
     gameclearsound = 'gameclear.ogg';
     backgroundSound = 'Tsukemen.mp3';
     titleSound = 'temptitle.ogg';
     effectSound = 'Pacific Rim (feat  Tom Morello)_Ramin Djawadi_퍼시픽 림 (Pacific Rim .wav';
     enemyDieSound = 'die.mp3';
     titleImage = 'title.jpg';
    
    
     gametitleState =  new GameTitleState(titleImage);
     heroObject = new HeroSprite(heroImage,playerHeart,playerAttack);
      
      gameField = [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,{name : 'obstacle4',src : decodeURI('%EB%8F%8C%EB%B0%94%EB%8B%A5.png'),isMovable : 'unmovable'  },0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,{name : 'obstacle5',src : decodeURI('%EB%8F%8C%EB%B0%94%EB%8B%A5.png'),isMovable : 'movable'  },0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,{name : 'obstacle12',src : decodeURI('%EB%8F%8C%EB%B0%94%EB%8B%A5.png'),isMovable : 'unmovable'  },0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,{name : 'obstacle11',src : decodeURI('%EC%82%AC%EB%9E%8C.png'),isMovable : 'movable'  },0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,'hero',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,'door',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],];;

//tmp
//elstt
                                                                                                           
                                                                                                            
 
                                                                                                           
 
                                                                                                           
 
                                                                                                           
 
                                                                                                           
 
                                                                                                           
 
                                                                                                           
 
                                                                                                           
 
                                                                                                           
 
                                                                                                           
 
                                                                                                           
 
                                                                                                        }//insert

    resourcePreLoader.AddImage(titleImage);
    resourcePreLoader.AddImage(gameoversrc);
    resourcePreLoader.AddImage(gameclearsrc);
    resourcePreLoader.AddImage(mapBasesrc);
    soundSystem.AddSound(backgroundSound, 2);
    soundSystem.AddSound(heroHittedsrc);
    soundSystem.AddSound(heroStepsrc);
    soundSystem.AddSound(heroDiesrc,2);
    soundSystem.AddSound(gameoversound,2);
    soundSystem.AddSound(gameclearsound,2);
    soundSystem.AddSound(effectSound);
    soundSystem.AddSound(enemyDieSound);
    soundSystem.AddSound(titleSound,2);
    
    for (var i = 0; i < gameField.length; ++i) {
        for (var j = 0; j < gameField[0].length; ++j) {
            if ( typeof gameField[i][j] == 'string') {
                if(gameField[i][j] == 'hero')
                {
                    heroObject.left = blockWidth * j;
                    heroObject.top = blockWidth * i;
                    heroObject.x = j;
                    heroObject.y = i;
                    heroObject.Invalid();
                    gameField[i][j] = 0;
                    
                }
                else if(gameField[i][j]=='door'){
                    
                    doorsprite.y = i;
                    doorsprite.x = j;
                    doorsprite.top = blockWidth * i;
                    doorsprite.left = blockWidth * j;
                    doorsprite.Invalid();
                }
            }
            else if(typeof gameField[i][j] == 'object')
            {
            if(/enemy+/.test(gameField[i][j].name)){
            
                    var data = gameField[i][j];
                    var temp = new EnemySprite(data.name,data.src,data.isAI,data.health,data.attack);
                    temp.left = blockWidth * j;
                    temp.top = blockWidth * i;
                    temp.x = j;
                    temp.y = i;
                    temp.Invalid();
                    temp.AIUpdate();
                    gameField[i][j] = data.name;
                    enemyManagerObject.AddObject(temp);
                }
                else if(/obstacle+/.test(gameField[i][j].name))
                {
                    var data = gameField[i][j];
                    var temp = new ObstacleSprite(data.name,data.src,data.isMovable);
                    temp.left = blockWidth * j;
                    temp.top = blockWidth * i;
                    temp.x = j;
                    temp.y = i;
                    temp.Invalid();
                    playState.AddSprite(temp);
                    gameField[i][j] = data.name;;
                }
            }
        }
    }
    
    inputSystem.AddKeyListener({
        key : 'up arrow',
        listener : function() {
        
                direction = 'up';
                game.heroMoveCollisionCheck();
            
        }
    },
    {
        key : 'down arrow',
        listener : function() {
                           direction = 'down';
                game.heroMoveCollisionCheck();
                
            

        }
    },
    {
        key : 'right arrow',
        listener : function() {
           
                direction = 'right';
                game.heroMoveCollisionCheck();
            

        }
    },
    {
        key : 'left arrow',
        listener : function() {
           
                direction = 'left';
                game.heroMoveCollisionCheck();
            

        }
     },
     {
        key : 'enter',
        listener : function() {
            if (nowGameStateis == 3) {
                soundSystem.PauseSound(titleSound);
                ChangeGameState(new TransitionFadeOut(game_state,new TransitionFadeIn(game_state,playState,3.0),5.0));
                nowGameStateis = 4;
            }
        }
    },
    {
        key : 'space',
        listener : function() {
            if (nowGameStateis == 4) {
                game.heroAttack();
              
            }

        }
    },
    {
        key : 'p',
        listener : function() {
            if (nowGameStateis == 4) {
            console.log('nope');
              game.paused =! game.paused;
            }

        }
    }
    ); 
      
     game.start();
}

window.addEventListener('load', onGameInit(true), false);/////////this