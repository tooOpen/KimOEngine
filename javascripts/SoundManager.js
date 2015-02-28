function SoundSystem() {
    this.isLoadComplete = false;
    this.nowResourceLoadedCount = 0;    // Loaded Resource
    this.intAllResourceCount = 0;    // should be loaded Resource
    this.volume = 1;
    this.arrSounds = new Array();
    this.backgroundMusic = undefined;
    return this;
}

SoundSystem.prototype = {
    
    PauseSound : function(p_fileName) {
        if (p_fileName != 'undefined') {

            if (this.backgroundMusic && p_fileName == this.backgroundMusic.name) {
                this.backgroundMusic.sound.pause();
            }
            for (var i = 0; i < this.arrSounds.length; i++) {
                if (this.arrSounds[i].name == p_fileName) {
                    if (this.arrSounds[i].sound.ended == false) {
                   
                        if (!this.arrSounds[i].sound.paused) {
                           
                            this.arrSounds[i].sound.pause();
                            this.arrSounds[i].isPlayed = false;
                            break;
                        }
                    }
                }
            }
        }
    },

    AddSound : function(p_fileName, p_resourceCount) {

        if (p_fileName!='undefined') {
            var SOUND_RESOURCE_MAX = 8;

            if (p_resourceCount == undefined)
                p_resourceCount = SOUND_RESOURCE_MAX;

            for (var i = 0; i < p_resourceCount; i++) {
                var soundMusic = new Audio();
                soundMusic.src = p_fileName;
                soundMusic.volume = this.volume;
                soundMusic.isPlayed = false;
                soundMusic.addEventListener("canplaythrough", onLoadSoundComplete, false);
                soundMusic.addEventListener("ended", function() {
                    if (window.chrome)
                        this.load();
                    this.pause();
                }, false);

                document.body.appendChild(soundMusic);

                this.arrSounds.push({
                    name : p_fileName,
                    sound : soundMusic,
                    isPlayed : false
                });
                this.intAllResourceCount++;
            }
        }
    },

    PlaySound : function(p_fileName) {//effect Sound Play //재시작때 들어오지 않음
        if (p_fileName!='undefined') {
            for (var i = 0; i < this.arrSounds.length; i++) {
                if (this.arrSounds[i].name == p_fileName) {
                // console.log("nope2");
                    if (this.arrSounds[i].sound.ended == true || this.arrSounds[i].sound.isPlayed == false) {
                  //      console.log("nope");
                        if (this.arrSounds[i].sound.paused) {
                            this.arrSounds[i].sound.volume = this.volume;
                            this.arrSounds[i].sound.play();
                            this.arrSounds[i].isPlayed = true;
                            break;
                        }
                    }
                }
            }
        }
    },

    PlayBackgroundMusic : function(p_fileName) {//backgournd Sound Play
        if (p_fileName!='undefined') {
            if (this.backgroundMusic) {
                this.BackgroundMusic.sound.pause();
                this.BackgroundMusic.isPlayed = false;
                this.backgroundMusic = undefined;
            }

            for (var i = 0; i < this.arrSounds.length; i++) {
                if (this.arrSounds[i].name == p_fileName) {
                    var backgroundMusic = this.arrSounds[i];
                    backgroundMusic.sound.pause();
                    // already playing sound should be paused
                    if (window.chrome)
                        backgroundMusic.sound.load();
                    backgroundMusic.sound.loop = true;
                    backgroundMusic.isPlayed = true;

                    this.backgroundMusic = backgroundMusic;
                    this.backgroundMusic.sound.play();
                    // play new background Sound
                }
            }
        }
    },

    SetVolume : function(p_volume) {
        this.volume = p_volume;
        for (var i = 0; i < this.arrSounds.length; i++) {
            this.arrSounds[i].sound.volume = this.volume;
        }
    }
};

function onLoadSoundComplete() {

    soundSystem.nowResourceLoadedCount++;
    // compare whole Resource and loaded Resource
    if (soundSystem.nowResourceLoadedCount >= soundSystem.intAllResourceCount) {// load complete
        soundSystem.isLoadComplete = true;
    }
}
