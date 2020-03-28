import { Cell, State } from "./Cell";
import colors from 'colors';
import logUpdate from 'log-update';

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

    displayBoard()
    {
        logUpdate(this.toString());
    }

    toString()
    {
        const aliveChar = colors.green('A');
        const deadChar = colors.red('D');

        let res = "";
        for (var r = 0; r != this.rN; r++)
        {
            for (var c = 0; c < this.cN; ++c)
            {
                res += this.board[r][c].state === State.DEAD ? deadChar : aliveChar;
                res += ' ';
            }
            res += '\n';
        }
        return res;
    }
}