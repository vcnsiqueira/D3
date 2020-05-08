//jshint esversion:6

const express = require('express');

const app = express();

app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/data', express.static(__dirname + '/data'));
app.use('/styles', express.static(__dirname + '/styles'));


//viewed at http://localhost:3000
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function() {
    console.log("Listening on port 3000!");
});