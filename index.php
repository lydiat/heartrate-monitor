<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html class="no-js" lang="">

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
    <title>Heart Rate Monitor</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/normalize.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <script src="js/app.js"></script>
</head>

<body>
 <!--<video autoplay="true" id="videoElement"></video>-->
    <div id="container">
        <div id="tapper" class="hits">
            <div id="heart"><i class="material-icons">favorite</i></div>
            <div class="text laptop">Start pressing any key or tapping here along with your heartbeat</div>
        </div>
        <div id="milliseconds" class="hits">Seconds:
            <span id="millisecondNum">0</span>
        </div>
        <div id="bps" class="hits">Heartrate:
            <span id="bpsNum">0</span> bpm
        </div>
        <button id="stop">Stop</button>
        <button id="reset">Reset</button>
    </div>
</body>

</html>
