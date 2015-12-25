function ResourcePreLoader() {
    this.isLoadComplete = false;
    this.nowResourceLoadedCount = 0;
    // 현재 로딩된 리소스 수
    this.intAllResourceCount = 0;
    this.arrResource = new Array();
    return this;
}

ResourcePreLoader.prototype = {

    AddImage : function(fileName) {
        // 리소스 중복에 대한 처리
       for (var i = 0; i < this.arrResource.length; i++) {
            if (this.arrResource[i].name == fileName) {
                return;
            }
        }

        var img = new Image();
        img.src = fileName;
        img.addEventListener("load", onLoadImageResourceComplete, false);
        this.arrResource.push({
            name : fileName,
            image : img
           
        });
        this.intAllResourceCount++;
    },

    GetImage : function(fileName) {
        for (var i = 0; i < this.arrResource.length; i++) {
            if (this.arrResource[i].name == fileName) {
                return this.arrResource[i].image;
            }
        }

        debugSystem.Log("ERROR", "can't find resource " + fileName);
        return null;
    }
};

function onLoadImageResourceComplete() {
    resourcePreLoader.nowResourceLoadedCount++;
    // 현재 로딩된 리소스 수와 총 리소스 수 와 비교

    if (resourcePreLoader.nowResourceLoadedCount >= resourcePreLoader.intAllResourceCount) {
        // 모든 리소스 로딩 완료!!
        resourcePreLoader.isLoadComplete = true;
        slashObject = new SlashSprite();
    }
}

resourcePreLoader = new ResourcePreLoader();

function ChangeGameState(nextGameState) {
    // 필수 함수가 있는지 확인한다.
    if (nextGameState.Update == undefined)
        return;

    if (nextGameState.Render == undefined)
        return;

    // 필수 함수가 있으면 상태 전환
    game_state = nextGameState;
    game_state.Init();
}

function LoadingState() {
    return this;
}

LoadingState.prototype = {

    Render : function() {
        var totalResourceCount = resourcePreLoader.intAllResourceCount + soundSystem.intAllResourceCount;
        //사운드 주석 처리 이후 구현후 주석해제 요망
        var nowCompleteResourceCount = resourcePreLoader.nowResourceLoadedCount + soundSystem.nowResourceLoadedCount;

        game.context.fillStyle = "#FFFFFF";
        game.context.font = b_canvasWidth/16+"px italic";
        game.context.fillText("Now Loading. ." + nowCompleteResourceCount + "/" + totalResourceCount, game.context.canvas.width / 2 - b_canvasWidth/4, game.context.canvas.height / 2 - 20);

    },

    Update : function() {
        // 리소스를 모두 로딩했다면 게임 타이틀 상태로 전환한다.
        if (resourcePreLoader.isLoadComplete && soundSystem.isLoadComplete) {
           
            ChangeGameState(after_loading_state);
            nowGameStateis = 2;
        }
    }
};
