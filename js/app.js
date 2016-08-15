// TODO: webcam video canvas element color detection 
// capture a frame from the webcam each millisecond
// analyze a subsection for min and max pixel hue in R from RBG 
// (i.e. for two seconds capture a value each millisecond )
// with those two hundred datapoints, create a mean
// every time the count goes above the mean, count as a beat


var app = {

    timerStarted: 'false',
    startTime: 0,
    countingTime: 0,
    beatCount: 0,
    timerInterval: '',
    stopVideo: 'false',


    init: function() {

        window.addEventListener("DOMContentLoaded", app.setUpHandlers, false);

    },

    setUpHandlers: function() { // comment about function

        window.addEventListener("keydown", app.countBeats, false);
        document.getElementById("tapper").addEventListener("click", app.countBeats);
        document.getElementById("reset").addEventListener("click", app.resetMonitor);
        document.getElementById("stop").addEventListener("click", app.stopMonitor);

        var video = document.querySelector("#videoElement");

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

        if (navigator.getUserMedia) {
            navigator.getUserMedia({ video: true }, function(stream) {
                video.src = window.URL.createObjectURL(stream);
                app.drawVideo();

            }, function(e) {});
        }

    },

    drawVideo: function() {

        var videoElement = document.getElementById('videoElement');
        var canvasElement = document.getElementById('canvasElement');
        var canvasContext = canvasElement.getContext('2d');

        var canvasWidth = Math.floor(canvasElement.clientWidth);
        var canvasHeight = Math.floor(canvasElement.clientHeight);
        canvasElement.width = canvasWidth;
        canvasElement.height = canvasHeight;

        videoElement.addEventListener('play', function() {

            app.drawImage(videoElement, canvasContext, canvasWidth, canvasHeight);

        }, false);

    },

    drawImage: function(videoElement, canvasContext, canvasWidth, canvasHeight) {

        if (videoElement.paused || videoElement.ended || app.stopVideo === 'true')
            return false;

        canvasContext.drawImage(videoElement, 0, 0, canvasWidth, canvasHeight);

        setTimeout(app.drawImage, 20, videoElement, canvasContext, canvasWidth, canvasHeight);

        // so far just fooling around with averaging points to get the R from the RGB
        var a = canvasContext.getImageData(0, 0, 1, 1);
        var b = canvasContext.getImageData(10, 10, 1, 1);
        var c = canvasContext.getImageData(20, 20, 1, 1);
        var d = canvasContext.getImageData(30, 30, 1, 1);
        var e = canvasContext.getImageData(40, 40, 1, 1);

        var avg = (a.data[0] + c.data[0] + c.data[0] + d.data[0] + e.data[0]) / 5;

        console.log(Math.floor(avg));
    },

    stopMonitor: function() {
        app.timerStarted = 'false';
        app.stopVideo = 'true';
        clearInterval(app.timerInterval);
    },

    resetMonitor: function() {
        app.timerStarted = 'false';
        clearInterval(app.timerInterval);
        document.getElementById('bpsNum').innerHTML = '0';
        document.getElementById("millisecondNum").innerHTML = '0';
        app.countingTime = 0;
        app.beatCount = 0;
    },

    countBeats: function(event) {

        // account for tap or key
        var keyPressed = (event !== undefined) ? event.which : null;

        // ignore command and tab because it's annoying when switching between programs
        if (keyPressed !== 91 && keyPressed !== 9) {

            app.heartPulse();
            app.beatCount++;

            if (app.timerStarted === 'false') {
                app.timerStarted = 'true';
                app.startTime = Date.now();
                app.timerInterval = setInterval(app.countUp, 100);
                document.getElementById('bpsNum').innerHTML = 'First ';
            } else {

                document.getElementById('bpsNum').innerHTML = Math.floor((app.beatCount * 60) / app.countingTime);
            }
        }
    },

    heartPulse: function() {
        document.getElementById('heart').className = "beat";
        setTimeout(function() {
            document.getElementById('heart').classList.remove("beat");
        }, 100);
    },

    countUp: function() {
        var elapsedTime = Date.now() - app.startTime;
        app.countingTime = (elapsedTime / 1000).toFixed(3);
        document.getElementById("millisecondNum").innerHTML = app.countingTime;
    },

};

(function() {
    "use strict";
    app.init();
})();
