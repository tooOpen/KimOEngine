
var temp_text_x = 400;
var temp_text_y = 300;

nowGameStateis = 0;

function InputSystem()
{
	
	this.keyListener = [];
	var self = this;
// window.onkeypress = function (e) { self.keyPressed(e);  }; //팀원과 상담
   window.onkeydown  = function (e) { self.keyPressed(e); };
	return this;
}

InputSystem.prototype ={
 addKeyListener:function ()
 {
    for(var i=0;i<arguments.length;i++)
 	this.keyListener.push(arguments[i]);
 },
 findKeyListener:function(key)
{
	var listener = undefined;
	
	this.keyListener.forEach(function(keyAndListener){
		var currentKey = keyAndListener.key;
		if(currentKey === key){
			listener = keyAndListener.listener;
		}
	});
	return listener;
},
keyPressed:function(e)
{
	var listener = undefined,
	key = undefined;
	
	switch(e.keyCode)
	{
		 case 13: key = 'enter';        break;
		 case 32: key = 'space';        break;
         case 68: key = 'd';            break;
         case 75: key = 'k';            break;
         case 83: key = 's';            break;
         case 80: key = 'p';            break;
         case 37: key = 'left arrow';   break;
         case 39: key = 'right arrow';  break;
         case 38: key = 'up arrow';     break;
         case 40: key = 'down arrow';   break;
	}
	
	listener = this.findKeyListener(key);
	if(listener)
	listener();
}
};



