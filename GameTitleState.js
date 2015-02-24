

function GameTitleState(fileName)
{
    this.titleName = fileName;
}


GameTitleState.prototype = {
	
Init : function( )
{
onGameTitleStart();
},

Render : function( )
{
    game.context.drawImage(resourcePreLoader.GetImage(this.titleName), 0, 0,b_canvasWidth,b_canvasHeight);
},


Update : function( )
{
  
  
},


Restart : function( )
{
  
},


Notification : function( msg )
{
    switch( msg )
    {
       
    }
}

};



