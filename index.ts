"use strict"
const fs = require('fs');

const { Board } = require("./board");



const ra = JSON.parse(fs.readFileSync("./board.txt", "utf8"));

let myBoar = new Board(ra.row, ra.col);
for (let point of ra.aliveCells)
{
    myBoar.setAlive(point[0], point[1]);
}


setInterval(() =>
{
    myBoar.displayBoard();
    myBoar.updateState()
}, 1000);





