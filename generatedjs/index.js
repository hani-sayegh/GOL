"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var Board_1 = __importDefault(require("./Board"));
var boardConfig = JSON.parse(fs.readFileSync("./board.txt", "utf8"));
var board = new Board_1.default(boardConfig.row, boardConfig.col);
for (var _i = 0, _a = boardConfig.aliveCells; _i < _a.length; _i++) {
    var point = _a[_i];
    board.setAlive(point[0], point[1]);
}
setInterval(function () {
    board.displayBoard();
    board.updateState();
}, 1000);
