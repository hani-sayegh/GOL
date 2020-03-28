"use strict"
const fs = require('fs');

import Board from "./Board";



const boardConfig = JSON.parse(fs.readFileSync("./board.txt", "utf8"));

let board = new Board(boardConfig.row, boardConfig.col);
for (let point of boardConfig.aliveCells)
{
    board.setAlive(point[0], point[1]);
}


setInterval(() =>
{
    board.displayBoard();
    board.updateState()
}, 1000);





