const { Cell } = require("./Cell");
require('colors')
const logUpdate = require('log-update');


class Board
{
    constructor(rowCount, colCount)
    {
        this.rN = rowCount;
        this.cN = colCount;

        console.log("Creating board with: ", rowCount, colCount);

        this.board = new Array(rowCount);

        for (var r = 0; r != rowCount; r++)
        {
            this.board[r] = new Array(colCount);
            for (var c = 0; c < colCount; ++c)
            {
                this.board[r][c] = new Cell(r, c, CellState.DEAD, this);
            }
        }
    }

    setAlive(row, col)
    {
        this.board[row][col].state = CellState.ALIVE;
    }

    tryGetCell(row, col)
    {
        if (!(row < 0 || col < 0 || row > this.rN - 1 || col > this.cN - 1))
        {
            return this.board[row][col];
        }
        return null;
    }

    *[Symbol.iterator]()
    {
        for (var r = 0; r != this.rN; r++)
        {
            for (var c = 0; c < this.cN; ++c)
            {
                yield this.board[r][c];
            }
        }
    }

    updateState()
    {
        for (let cell of this)
        {
            cell.updateNewState();
        }
        for (let cell of this)
        {
            cell.update();
        }
    }

    displayBoard()
    {
        logUpdate(this.toString());
    }

    toString()
    {
        const aliveChar = 'A'.green;
        const deadChar = 'D'.red;

        let res = "";
        for (var r = 0; r != this.rN; r++)
        {
            for (var c = 0; c < this.cN; ++c)
            {
                res += this.board[r][c].state === CellState.DEAD ? deadChar : aliveChar;
                res += ' ';
            }
            res += '\n';
        }
        return res;
    }
}

module.exports = { Board, CellState };
