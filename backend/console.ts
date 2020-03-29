"use strict"
const fs = require('fs');

import Board from "./Board";
import ConsoleViewer from "./ConsoleViewer";

const boardConfig = JSON.parse(fs.readFileSync("config/board.json", "utf8"));

let board = new Board(boardConfig.row, boardConfig.col);
for (let point of boardConfig.aliveCells)
{
    board.setAlive(point[0], point[1]);
}


setInterval(() =>
{
    ConsoleViewer(board);
    board.updateState()
}, 1000);





