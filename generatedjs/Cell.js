"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var State;
(function (State) {
    State[State["ALIVE"] = 0] = "ALIVE";
    State[State["DEAD"] = 1] = "DEAD";
})(State = exports.State || (exports.State = {}));
;
var Cell = /** @class */ (function () {
    function Cell(row, col, state, board) {
        this.row = row;
        this.col = col;
        this.state = state;
        this.board = board;
        this.newState = State.DEAD;
    }
    Cell.prototype.getNeighbors = function () {
        var r = [0, 0, 1, -1, 1, -1, 1, -1];
        var c = [1, -1, 0, 0, 1, 1, -1, -1];
        var res = [];
        for (var i = 0; i < 8; ++i) {
            var newR = r[i] + this.row;
            var newC = c[i] + this.col;
            var cell = this.board.tryGetCell(newR, newC);
            if (cell) {
                res.push(cell);
            }
        }
        return res;
    };
    Cell.prototype.update = function () {
        this.state = this.newState;
    };
    Cell.prototype.updateNewState = function () {
        this.newState = this.getNewState();
    };
    Cell.prototype.getNewState = function () {
        var cell = this;
        var alive = cell.aliveNeighborCount;
        if (cell.alive && (alive === 2 || alive === 3))
            return State.ALIVE;
        if (cell.dead && alive === 3)
            return State.ALIVE;
        return State.DEAD;
    };
    Object.defineProperty(Cell.prototype, "aliveNeighborCount", {
        get: function () {
            return this.getNeighbors().filter(function (x) { return x.state === State.ALIVE; }).length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "dead", {
        get: function () {
            return this.state === State.DEAD;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "alive", {
        get: function () {
            return this.state === State.ALIVE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cell.prototype, "deadNeighborCount", {
        get: function () {
            return this.getNeighbors().filter(function (x) { return x.state === State.DEAD; }).length;
        },
        enumerable: true,
        configurable: true
    });
    return Cell;
}());
exports.Cell = Cell;
