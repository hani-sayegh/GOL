"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Cell_1 = require("./Cell");
var colors_1 = __importDefault(require("colors"));
var log_update_1 = __importDefault(require("log-update"));
var Board = /** @class */ (function () {
    function Board(rowCount, colCount) {
        this.rN = rowCount;
        this.cN = colCount;
        console.log("Creating board with: ", rowCount, colCount);
        this.board = new Array(rowCount);
        this.boardCopy = new Array(rowCount * colCount);
        for (var r = 0; r != rowCount; r++) {
            this.board[r] = new Array(colCount);
            for (var c = 0; c < colCount; ++c) {
                this.board[r][c] = new Cell_1.Cell(r, c, Cell_1.State.DEAD, this);
                this.boardCopy[r * colCount + c] = this.board[r][c];
            }
        }
    }
    Board.prototype.setAlive = function (row, col) {
        this.board[row][col].state = Cell_1.State.ALIVE;
    };
    Board.prototype.tryGetCell = function (row, col) {
        if (!(row < 0 || col < 0 || row > this.rN - 1 || col > this.cN - 1)) {
            return this.board[row][col];
        }
        return null;
    };
    Board.prototype.updateState = function () {
        for (var _i = 0, _a = this.boardCopy; _i < _a.length; _i++) {
            var cell = _a[_i];
            cell.updateNewState();
        }
        for (var _b = 0, _c = this.boardCopy; _b < _c.length; _b++) {
            var cell = _c[_b];
            cell.update();
        }
    };
    Board.prototype.displayBoard = function () {
        log_update_1.default(this.toString());
    };
    Board.prototype.toString = function () {
        var aliveChar = colors_1.default.green('A');
        var deadChar = colors_1.default.red('D');
        var res = "";
        for (var r = 0; r != this.rN; r++) {
            for (var c = 0; c < this.cN; ++c) {
                res += this.board[r][c].state === Cell_1.State.DEAD ? deadChar : aliveChar;
                res += ' ';
            }
            res += '\n';
        }
        return res;
    };
    return Board;
}());
exports.default = Board;
