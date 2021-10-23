var player = function () {
    this.video = document.querySelector("video");
    this.progress = document.querySelector(`input[name="progress"]`);
    this.playButton = document.querySelector(".play");
    this.time = document.querySelector(".time");
    this.speed = document.querySelector("[name='speed']");
    this.soundProgress = document.querySelector("[name='sound']");
    this.mouseOnProgress = false;
    this.previousVolume = 1;
    /**Converts seconds to string format mm:ss
     * @param {*} num
     * @returns string
     */
    this.numberToTime = (num) => {
        num = Number(num);
        let min = parseInt(num / 60);
        let s = parseInt(num) % 60;
        return `${min.toString().padStart(2, "0")}:${s
            .toString()
            .padStart(2, "0")}`;
    };
    this.togglePlay = function () {
        if (this.video.paused) {
            this.video.play();
        } else {
            this.video.pause();
        }
    }.bind(this);
    this.toggleFullscreen = function () {
        if (this.full) {
            this.el.requestFullscreen();
        } else {
            document.webkitExitFullscreen();
        }
        this.full = !this.full;
    }.bind({ el: this.video.parentElement, full: true });
    this.updateTime = (e) => {
        this.progress.value = this.video.currentTime;
        this.time.innerHTML = this.numberToTime(this.video.currentTime);
    };
    this.updateProgress = () => {
        this.video.currentTime = this.progress.value;
        this.time.innerHTML = this.numberToTime(this.video.currentTime);
    };
    this.slideProgress = (e) => {
        let offSet;
        if (e.type == "touchmove")
            offSet = e.touches[0].pageX - e.touches[0].target.offsetLeft;
        else offSet = e.offsetX;
        const slideTime =
            (offSet / this.progress.offsetWidth) * this.video.duration;
        this.video.currentTime = slideTime;
    };
    this.handleMute = function () {
        if (this.muted) {
            this.video.muted = false;
            this.el.src = "./images/sound.svg";
            this.progress.value = 1;
        } else {
            this.video.muted = true;
            this.progress.value = 0;
            this.el.src = "./images/mute.svg";
            player.previousVolume = 0;
        }
        this.muted = !this.muted;
    }.bind({
        video: this.video,
        progress: this.soundProgress,
        muted: false,
        el: document.querySelector("img.sound"),
    });
    this.changeSound = () => {
        const volume = Number(this.soundProgress.value);
        if (volume == 0) {
            this.handleMute();
        } else {
            if (this.previousVolume == 0) {
                this.handleMute();
                this.soundProgress.value = volume;
            }
            this.video.volume = volume;
        }
        this.previousVolume = volume;
    };
    return this;
}.call({});
