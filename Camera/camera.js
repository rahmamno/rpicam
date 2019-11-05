var io = require('socket.io-client');
var socket = io.connect('https://rpicam.herokuapp.com');
var fs = require('fs');
var cam = require('raspicam');
var c = new cam({ mode: "photo", output: "photo.jpg", w: 1920, h: 1080 });

socket.on("connect", () => {
    console.log("Connected to the server!");
    socket.emit("camera", "online");
})

socket.on("takeP", (mes, fn) => {
    console.log("Received picture request");
    c.start();
    c.on("read", () => {
        var data = new Buffer(fs.readFileSync("./photo.jpg")).toString("base64");
        fn(data);
        c.stop();
    });

});

