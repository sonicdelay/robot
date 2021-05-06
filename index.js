var robot = require("robotjs");
var fs = require("fs-extra");

var size = robot.getScreenSize();
var img = robot.screen.capture(0, 0, size.width, size.height);

var jpeg = require('jpeg-js');

var express = require('express');
var fs = require('fs');

var app = express(); //express.logger());

app.get('/', (req, res) => {
  res.send(`
<html>
<head>
<style>
html,body {height:100%;margin:0;padding:0;}
img {object-fit:scale-down;width:100%;height:100%;}
</style>
</head>
<body style="margin:0;padding:0;">
    <!--canvas id='test_canvas' width='640px' height='480px' style='border:1px solid #d3d3d3'>
    </canvas-->
    <!--script language="JavaScript">
      var ctx = document.getElementById('test_canvas').getContext('2d');
      var img = new Image();
      img.onload = function() {
        ctx.drawImage(img, 0, 0);
      };
      var theDate = new Date();
      img.src = "count.mjpeg";
      window.setInterval("refreshCanvas()", 200);
      function refreshCanvas(){
        ctx.drawImage(img, 0, 0);
      };
    </script-->
    <img src="screen.mjpeg">
  </body>
</html>
`);
});

app.get('/screen.mjpeg', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'multipart/x-mixed-replace; boundary=theboundary',
    'Cache-Control': 'no-cache',
    'Connection': 'close',
    'Pragma': 'no-cache'
  });

  var i = 0;
  var stop = false;

  res.connection.on('close', () => { stop = true; });

  var send_next = () => {
    if (stop)
      return;
    //i = (i+1) % 100;
    //var filename = i + ".jpg";
    //fs.readFile(__dirname + '//resources/' + filename, (err, content) {

const size = robot.getScreenSize();
const img = robot.screen.capture(0, 0, size.width, size.height);
const content2 = jpeg.encode({
  data: img.image,
  width: size.width,
  height: size.height,
},50);

content = content2.data;

      res.write("--theboundary\r\n");
      res.write("Content-Type: image/jpeg\r\n");
      res.write("Content-Length: " + content.length + "\r\n");
      res.write("\r\n");
      res.write(content, 'binary');
      res.write("\r\n");
      setTimeout(send_next, 100);
    //});
  };
  send_next();
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

