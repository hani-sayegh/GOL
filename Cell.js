CellState = {
    ALIVE: 0,
    DEAD: 1
};

class Cell
{
    constructor(row, col, state, board)
    {
        this.row = row;
        this.col = col;
        this.state = state;
        this.board = board;
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
            return CellState.ALIVE;

        if (cell.dead && alive === 3)
            return CellState.ALIVE;

        return CellState.DEAD;
    }

    get aliveNeighborCount()
    {
        return this.getNeighbors().filter(x => x.state === CellState.ALIVE).length;
    }
    get dead()
    {
        return this.state === CellState.DEAD;
    }
    get alive()
    {
        return this.state === CellState.ALIVE;
    }
    get deadNeighborCount()
    {
        return this.getNeighbors().filter(x => x.state === CellState.DEAD).length;
    }
}
exports.Cell = Cell;
