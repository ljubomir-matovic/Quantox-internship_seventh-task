var player = function () {
    this.video = document.querySelector("video");
    this.progress = document.querySelector(`input[name="progress"]`);
    this.playButton = document.querySelector(".play");
    this.time = document.querySelector(".time");
    this.speed = document.querySelector("[name='speed']");
    this.mouseOnProgress = false;
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
    return this;
}.call({});
window.onload = () => {
    player.progress.setAttribute("max", player.video.duration);
    document.querySelector(".duration").innerHTML = player.numberToTime(
        player.video.duration
    );
};
player.playButton.addEventListener("click", player.togglePlay);
player.video.addEventListener("click", player.togglePlay);
player.video.addEventListener("play", () => {
    player.playButton.src = "./images/pause.svg";
});
player.video.addEventListener("pause", () => {
    player.playButton.src = "./images/play.svg";
});
player.video.addEventListener("timeupdate", player.updateTime);
player.progress.addEventListener("change", player.updateProgress);
/*Mouse events for progress*/
player.progress.addEventListener("mousedown", () => {
    player.mouseOnProgress = true;
});
player.progress.addEventListener("mouseup", () => {
    player.mouseOnProgress = false;
});
player.progress.addEventListener(
    "mousemove",
    (e) => player.mouseOnProgress && player.slideProgress(e)
);
/*Touch events for progress*/
player.progress.addEventListener("touchstart", () => {
    player.mouseOnProgress = true;
});
player.progress.addEventListener("touchend", () => {
    player.mouseOnProgress = false;
});
player.progress.addEventListener(
    "touchmove",
    (e) => player.mouseOnProgress && player.slideProgress(e)
);
player.speed.addEventListener("change", () => {
    const index = Number(player.speed.value);
    player.video.playbackRate = index;
});
document
    .querySelector(".fullscreen")
    .addEventListener("click", player.toggleFullscreen);
