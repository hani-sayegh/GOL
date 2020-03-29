import Board from "../backend/Board"

const rN = 10;
const cN = 10;

const board = new Board(rN, cN);

function generateTableHtml()
{
    let res = '<table>';
    for (let r = 0; r < rN; ++r)
    {
        res += '<tr>';

        for (let c = 0; c < cN; ++c)
        {
            res += `<td row="${r}" col="${c}"`;
            let color = "red";
            if (board.getCell(r, c).alive)
                color = "green";

            res += ` style="background: ${color};"></td>`;
        }
        res += '</tr>';
    }
    res += '</table>';
    return res;
}
let grid = document.getElementById("grid");

grid.innerHTML = generateTableHtml();



const cells = document.getElementsByTagName("td");

function updateGrid()
{
    let i = 0;
    for (const cell of board)
    {
        cells[i].style.background = cell.alive ? "green" : "red";
        ++i;
    }
}

for (const cell of cells as any)
{
    cell.onclick = () =>
    {
        const r = cell.getAttribute("row");
        const c = cell.getAttribute("col");
        board.setAlive(r, c);
        updateGrid();
    }
}


setInterval(() =>
{
    board.updateState();
    updateGrid();
}, 1000);
