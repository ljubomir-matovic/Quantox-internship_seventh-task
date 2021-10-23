/*Set video duration on load*/
window.onload = () => {
    player.progress.setAttribute("max", player.video.duration);
    document.querySelector(".duration").innerHTML = player.numberToTime(
        player.video.duration
    );
};
/*Play video if you click on button or video*/
player.playButton.addEventListener("click", player.togglePlay);
player.video.addEventListener("click", player.togglePlay);
/*Change image if video is played and paused*/
player.video.addEventListener("play", () => {
    player.playButton.src = "./images/pause.svg";
});
player.video.addEventListener("pause", () => {
    player.playButton.src = "./images/play.svg";
});
/*Update video time */
player.video.addEventListener("timeupdate", player.updateTime);
/*Change video time with progress*/
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
/*Change playback rate */
player.speed.addEventListener("change", () => {
    const index = Number(player.speed.value);
    player.video.playbackRate = index;
});
/*Toggle fullscreen*/
document
    .querySelector(".fullscreen")
    .addEventListener("click", player.toggleFullscreen);
/*Mute or unmute*/
document
    .querySelector("img.sound")
    .addEventListener("click", player.handleMute);
/*Change sound slider */
player.soundProgress.addEventListener("change", player.changeSound);
