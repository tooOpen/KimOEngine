function TransitionFadeOut( prevState , nextState, delay )
{ 
    this.prevState = prevState;
    this.nextState = nextState;
    this.delay = delay;
    
    this.alpha = 0;
}


TransitionFadeOut.prototype = {
Init:function()
{
},
Render : function( )
{
    // 그리기
  

    this.prevState.Render();
    
    var oldAlpha    = game.context.globalAlpha;
    var oldFillStyle = game.context.fillStyle;
    
    game.context.globalAlpha  = this.alpha/255;
    game.context.fillStyle = "#000000";
    game.context.fillRect(0, 0, 1100, 850); 
    game.context.globalAlpha  = oldAlpha;
    game.context.fillStyle = oldFillStyle;
},


Update : function()
{
    this.alpha += this.delay;
    if( this.alpha >= 255 )
    {
        ChangeGameState( this.nextState );
    }
}


};


function TransitionFadeIn( prevState , nextState, delay )
{ 
    this.prevState = prevState;
    this.nextState = nextState;
    this.delay = delay;
    
    this.alpha = 255;
}

TransitionFadeIn.prototype = {
Init:function()
{
},
Render : function( )
{
    // 그리기
    this.nextState.Render();
    
    var oldAlpha = game.context.globalAlpha;
    var oldFillStyle = game.context.fillStyle;
    
    game.context.globalAlpha  = this.alpha/255;
    game.context.fillStyle = "#000000";
    game.context.fillRect(0, 0, 1100, 850); 
    game.context.globalAlpha  = oldAlpha;
    game.context.fillStyle = oldFillStyle;
},

Update : function()
{
    this.alpha -= this.delay;
    if( this.alpha <= 0 )
    {
    	
        ChangeGameState( this.nextState );
    }
}
};
