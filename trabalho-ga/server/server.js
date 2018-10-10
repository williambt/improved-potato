"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var fs = require("fs");
var bp = require("body-parser");
var dirname = path.dirname(require.main.filename) + '/phangular';
var app = express();
var port = 8080;
app.use(express.static(dirname));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
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
app.post("/leaderboard", function (req, res) {
    json.scores.push(req.body);
    res.writeHead(200);
    res.write('{"ok" : true}');
    res.end();
    var writeJson = JSON.stringify(json);
    fs.writeFile('scores.json', writeJson, 'utf8', function () { return console.log("Written!"); });
});
app.listen(port, function () { return console.log('Listening on port ' + port); });
