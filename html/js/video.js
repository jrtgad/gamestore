function playVideo() {
    if ($("video").paused) {
        $("video").play();
        $("play").style.backgroundPosition = "-4.30em";
    } else {
        $("video").pause();
        $("play").style.backgroundPosition = "0";
    }
}

function volUpVideo() {
    $("video").volume += 0.1;
}

function volDownVideo() {
    $("video").volume -= 0.1;
}

function $(id) {
    return document.getElementById(id);
}

function updateProgressBar() {
    var value = (100 / video.duration) * video.currentTime;
    $("bar").value = value;
}

function updateVideo() {
    var time = video.duration * ($("bar").value / 100);
    video.currentTime = time;
}

function videoPauseOnDrag() {
    $("video").pause();
}

function videoPlayOnDrag() {
    $("video").play();
    $("play").style.backgroundPosition = "-4.30em";
}

function reset() {
    $("play").style.backgroundPosition = "0";
}

function events() {
    $("bar").value = 0;
    $("play").addEventListener("click", playVideo, false);
    $("volup").addEventListener("click", volUpVideo, false);
    $("voldown").addEventListener("click", volDownVideo, false);
    $("video").addEventListener("timeupdate", updateProgressBar, false);
    $("video").addEventListener("click", playVideo, false);
    $("video").addEventListener("ended", reset, false);
    $("bar").addEventListener('change', updateVideo, false);
    $("bar").addEventListener('mousedown', videoPauseOnDrag, false);
    $("bar").addEventListener('mouseup', videoPlayOnDrag, false);
}

function $(id) {
    return document.getElementById(id);
}

window.onload = events;