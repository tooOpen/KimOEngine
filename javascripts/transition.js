function TransitionFadeOut(p_prevState, p_nextState, p_delay) {
    this.prevState = p_prevState;    //previous State
    this.nextState = p_nextState;    //next State
    this.delay = p_delay;
    this.alpha = 0;
}

TransitionFadeOut.prototype = {
    PreInit : function() {

    },
    Init : function() {
    },
    Render : function() {
        this.prevState.Render();

        var oldAlpha = game.context.globalAlpha;
        var oldFillStyle = game.context.fillStyle;

        game.context.globalAlpha = this.alpha / 255;
        game.context.fillStyle = "#000000";
        game.context.fillRect(0, 0, 1100, 850);
        game.context.globalAlpha = oldAlpha;
        game.context.fillStyle = oldFillStyle;
    },

    Update : function() {
        this.alpha += this.delay;
        if (this.alpha >= 255) {
            ChangeGameState(this.nextState);
        }
    }
};

function TransitionFadeIn(p_prevState, p_nextState, p_delay) {
    this.prevState = p_prevState;
    this.nextState = p_nextState;
    this.delay = p_delay;
    this.nextState.PreInit(); //call before Init()

    this.alpha = 255;
}

TransitionFadeIn.prototype = {
    PreInit : function() {
    },
    Init : function() {
    },
    Render : function() {
        this.nextState.Render();

        var oldAlpha = game.context.globalAlpha;
        var oldFillStyle = game.context.fillStyle;

        game.context.globalAlpha = this.alpha / 255;
        game.context.fillStyle = "#000000";
        game.context.fillRect(0, 0, 1100, 850);
        game.context.globalAlpha = oldAlpha;
        game.context.fillStyle = oldFillStyle;
    },

    Update : function() {
        this.alpha -= this.delay;
        if (this.alpha <= 0) {
            ChangeGameState(this.nextState);
        }
    }
};
