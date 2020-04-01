import Board from "../backend/Board"

const rN = 10;
const cN = 10;

const cells = document.getElementsByTagName("td");
const playBtn = document.getElementById("play");

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

const darkStyle =
{
    background: "rgb(20 , 20, 20)",
    btnText: "Activate Light Theme",
    play: "invert(100%)",

};
const lightStyle =
{
    background: "rgb(190 , 190, 190)",
    btnText: "Activate Dark Theme",
    play: "",
};

let grid = document.getElementById("grid");
let theme = document.getElementById("theme");
let style = darkStyle;
applyStyle(style);

theme.onclick = () =>
{

    if (style === darkStyle)
        style = lightStyle;
    else
        style = darkStyle;

    applyStyle(style);

}

function applyStyle(style: any)
{
    document.body.style.background = style.background;
    theme.innerText = style.btnText;
    playBtn.style.filter = style.play;
    console.log(style.play);
    console.log(playBtn.style.filter);


}


grid.innerHTML = generateTableHtml();



let play: boolean = false;
let me: any = null;
playBtn.onclick = () =>
{
    if (!play)
    {
        playBtn.innerHTML = '<img src="../frontend/imgs/pause.svg">';
        me = setInterval(() =>
        {
            board.updateState();
            updateGrid();
        }, 1000);
    }
    else
    {
        playBtn.innerHTML = '<img src="../frontend/imgs/play.svg">';
        clearInterval(me);
    }

    play = !play;

};



function updateGrid()
{
    let i = 0;
    for (const cell of board)
    {
        cells[i].style.background = cell.alive ? "green" : "red";
        cells[i].style.transition = 'background-color 0.1s linear';
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




