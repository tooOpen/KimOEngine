function ResourcePreLoader() {
    
    this.isLoadComplete = false;
    this.nowResourceLoadedCount = 0;    // now loaded Resource
    this.intAllResourceCount = 0;
    this.arrResource = new Array();
    return this;
}


ResourcePreLoader.prototype = {

    PreInit : function() {
    },
    AddImage : function(p_fileName) {
        for (var i = 0; i < this.arrResource.length; i++) {
            if (this.arrResource[i].name == p_fileName) {
                return;
            }
        }
        var img = new Image();
        img.src = p_fileName;
        img.addEventListener("load", onLoadImageResourceComplete, false);
        this.arrResource.push({
            name : p_fileName,
            image : img

        });
        this.intAllResourceCount++;
    },

    GetImage : function(p_fileName) {
        for (var i = 0; i < this.arrResource.length; i++) {
            if (this.arrResource[i].name == p_fileName) {
                return this.arrResource[i].image;
            }
        }
        return null;
    }
};

function onLoadImageResourceComplete() {
    resourcePreLoader.nowResourceLoadedCount++;    
    if (resourcePreLoader.nowResourceLoadedCount >= resourcePreLoader.intAllResourceCount) {
        resourcePreLoader.isLoadComplete = true;
        slashObject = new SlashSprite();
    }
}

resourcePreLoader = new ResourcePreLoader();

function ChangeGameState(nextGameState) {    // check essential method.
    if (nextGameState.Update == undefined)
        return;
    if (nextGameState.Render == undefined)
        return;
        
    game_state = nextGameState;
    game_state.Init();
}

function LoadingState() {
    return this;
}

LoadingState.prototype = {

    Render : function() {
        var totalResourceCount = resourcePreLoader.intAllResourceCount + soundSystem.intAllResourceCount;
        var nowCompleteResourceCount = resourcePreLoader.nowResourceLoadedCount + soundSystem.nowResourceLoadedCount;

        game.context.fillStyle = "#FFFFFF";
        game.context.font = b_canvasWidth / 16 + "px italic";
        game.context.fillText("Now Loading. ." + nowCompleteResourceCount + "/" + totalResourceCount, game.context.canvas.width / 2 - b_canvasWidth / 4, game.context.canvas.height / 2 - 20);

    },

    Update : function() {       
        if (resourcePreLoader.isLoadComplete && soundSystem.isLoadComplete) { //all resouces loaded
            ChangeGameState(after_loading_state);
            nowGameStateis = 2;
        }
    }
}; 

