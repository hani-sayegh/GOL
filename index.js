"use strict";
var fs = require('fs');
var Board = require("./board").Board;
var ra = JSON.parse(fs.readFileSync("./board.txt", "utf8"));
var myBoar = new Board(ra.row, ra.col);
for (var _i = 0, _a = ra.aliveCells; _i < _a.length; _i++) {
    var point = _a[_i];
    myBoar.setAlive(point[0], point[1]);
}
setInterval(function () {
    myBoar.displayBoard();
    myBoar.updateState();
}, 1000);
