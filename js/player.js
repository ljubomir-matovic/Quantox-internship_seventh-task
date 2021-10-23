var player = function () {
    this.video = document.querySelector("video");
    this.progress = document.querySelector(`input[name="progress"]`);
    this.playButton = document.querySelector(".play");
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
    return this;
}.call({});
window.onload = () => {
    player.progress.setAttribute("max", player.video.duration);
    document.querySelector(".duration").innerHTML = player.numberToTime(
        player.video.duration
    );
};
player.playButton.addEventListener("click", player.togglePlay);
document
    .querySelector(".fullscreen")
    .addEventListener("click", player.toggleFullscreen);
