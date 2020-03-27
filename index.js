"use strict"
const fs = require('fs');

const { Board } = require("./board");

let myBoar = new Board(10, 10);

function boardParser()
{
    const me = fs.readFileSync("./board.txt", "utf8");
}

boardParser();

setInterval(() =>
{
    myBoar.displayBoard();
    myBoar.updateState()
}, 1000);





