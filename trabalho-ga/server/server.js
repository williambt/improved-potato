"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var fs = require("fs");
var dirname = path.dirname(require.main.filename) + '/phangular';
var app = express();
var port = 8080;
app.use(express.static(dirname));
var json = null;
fs.readFile('scores.json', function (err, data) {
    json = JSON.parse(data.toString());
});
app.get('/', function (req, res) {
    res.sendFile(dirname + '/index.html');
});
app.get('/score', function (req, res) {
    if (json == null) {
        res.send({ status: 'retry' });
    }
    else {
        res.send({ status: 'ok', data: json.scores });
    }
});
app.listen(port, function () { return console.log('Listening on port ' + port); });
