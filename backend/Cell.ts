import Board from './Board';

export enum State { ALIVE, DEAD };

export class Cell
{
    row: number;
    col: number;
    state: State;
    board: Board;
    newState: State;

    constructor(row: number, col: number, state: State, board: Board)
    {
        this.row = row;
        this.col = col;
        this.state = state;
        this.board = board;
        this.newState = State.DEAD;
    }

    getNeighbors()
    {
        const r = [0, 0, 1, -1, 1, -1, 1, -1];
        const c = [1, -1, 0, 0, 1, 1, -1, -1];
        const res = [];
        for (let i = 0; i < 8; ++i)
        {
            const newR = r[i] + this.row;
            const newC = c[i] + this.col;

            const cell = this.board.tryGetCell(newR, newC);
            if (cell)
            {
                res.push(cell);
            }
        }
        return res;
    }
    update()
    {
        this.state = this.newState;
    }

    updateNewState()
    {
        this.newState = this.getNewState();
    }

    getNewState()
    {
        const cell = this;
        const alive = cell.aliveNeighborCount;

        if (cell.alive && (alive === 2 || alive === 3))
            return State.ALIVE;

        if (cell.dead && alive === 3)
            return State.ALIVE;

        return State.DEAD;
    }

    get aliveNeighborCount()
    {
        return this.getNeighbors().filter(x => x.state === State.ALIVE).length;
    }
    get dead()
    {
        return this.state === State.DEAD;
    }
    get alive()
    {
        return this.state === State.ALIVE;
    }
    get deadNeighborCount()
    {
        return this.getNeighbors().filter(x => x.state === State.DEAD).length;
    }
}