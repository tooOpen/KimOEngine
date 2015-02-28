function InputSystem() {

    this.keyListener = [];
    var self = this;
    window.onkeydown = function(e) {
    self.KeyPressed(e);
    };
    return this;
}

InputSystem.prototype = {
    AddKeyListener : function() {
        for (var i = 0; i < arguments.length; i++)
            this.keyListener.push(arguments[i]);
    },
    FindKeyListener : function(key) {
        var listener = undefined;

        this.keyListener.forEach(function(keyAndListener) {
            var currentKey = keyAndListener.key;
            if (currentKey === key) {
                listener = keyAndListener.listener;
            }
        });
        return listener;
    },
    KeyPressed : function(e) {
        var listener = undefined,
            key =
            undefined;

        switch(e.keyCode) {
        case 13:
            key = 'enter';
            break;
        case 32:
            key = 'space';
            break;
        case 68:
            key = 'd';
            break;
        case 75:
            key = 'k';
            break;
        case 83:
            key = 's';
            break;
        case 80:
            key = 'p';
            break;
        case 37:
            key = 'left arrow';
            break;
        case 39:
            key = 'right arrow';
            break;
        case 38:
            key = 'up arrow';
            break;
        case 40:
            key = 'down arrow';
            break;
        }

        listener = this.FindKeyListener(key);
        if (listener)
            listener();
    }
};

