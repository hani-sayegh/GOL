import { Cell, State } from "./Cell";

export default class Board
{
    rN: number;
    cN: number;
    board: Array<Array<Cell>>;
    boardCopy: Array<Cell>;

    constructor(rowCount: number, colCount: number)
    {
        this.rN = rowCount;
        this.cN = colCount;

        console.log("Creating board with: ", rowCount, colCount);

        this.board = new Array(rowCount);
        this.boardCopy = new Array(rowCount * colCount);

        for (var r = 0; r != rowCount; r++)
        {
            this.board[r] = new Array(colCount);
            for (var c = 0; c < colCount; ++c)
            {
                this.board[r][c] = new Cell(r, c, State.DEAD, this);
                this.boardCopy[r * colCount + c] = this.board[r][c];
            }
        }
    }


    *[Symbol.iterator]()
    {
        for (const cell of this.boardCopy)
        {
            yield cell;
        }
    }

    getCell(row: number, col: number)
    {
        return this.board[row][col];
    }

    setAlive(row: number, col: number)
    {
        this.board[row][col].state = State.ALIVE;
    }

    tryGetCell(row: number, col: number)
    {
        if (!(row < 0 || col < 0 || row > this.rN - 1 || col > this.cN - 1))
        {
            return this.board[row][col];
        }
        return null;
    }

    updateState()
    {
        for (let cell of this.boardCopy)
        {
            cell.updateNewState();
        }
        for (let cell of this.boardCopy)
        {
            cell.update();
        }
    }



    toJson()
    {

        const alive = [];
        for (let r = 0; r != this.rN; ++r)
        {
            for (let c = 0; c < this.cN; ++c)
            {
                if (this.board[r][c].alive)
                    alive.push([r, c]);
            }
        }

        const jsonConfig = {
            row: this.rN,
            col: this.cN,
            aliveCells: alive
        }

        return JSON.stringify(jsonConfig);
    }

    toString(): string
    {
        const aliveChar = 'A';
        const deadChar = 'D';

        let res = "";
        for (let r = 0; r != this.rN; ++r)
        {
            for (let c = 0; c < this.cN; ++c)
            {
                res += this.board[r][c].state === State.DEAD ? deadChar : aliveChar;
                res += ' ';
            }
            res += '\n';
        }
        return res;
    }
}