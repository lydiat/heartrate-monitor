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
          //  navigator.getUserMedia({ video: true }, function(stream) {
             //   video.src = window.URL.createObjectURL(stream);
          //  }, function(e) {});
        }

    },

    stopMonitor: function() {
        app.timerStarted = 'false';
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
