const board = document.getElementById("board");
const message = document.getElementById("message");

let size = 3;
let tiles = [];

function setSize(newSize){

size = newSize;
startGame();

}

function startGame(){

tiles = [];

for(let i=1;i<size*size;i++){
tiles.push(i);
}

tiles.push(null);

tiles = tiles.sort(()=>Math.random()-0.5);

draw();

}

function draw(){

board.innerHTML="";

board.style.gridTemplateColumns = `repeat(${size},80px)`;

tiles.forEach((num,index)=>{

let tile = document.createElement("div");

if(num===null){
tile.className="tile empty";
}else{
tile.className="tile";
tile.textContent=num;
}

tile.addEventListener("click",()=>move(index));

board.appendChild(tile);

});

checkWin();

}

function move(index){

let emptyIndex = tiles.indexOf(null);

let row = Math.floor(index/size);
let col = index%size;

let emptyRow = Math.floor(emptyIndex/size);
let emptyCol = emptyIndex%size;

let distance =
Math.abs(row-emptyRow)+Math.abs(col-emptyCol);

if(distance===1){

[tiles[index],tiles[emptyIndex]] =
[tiles[emptyIndex],tiles[index]];

draw();

}

}

function solve(){

tiles = [];

for(let i=1;i<size*size;i++){
tiles.push(i);
}

tiles.push(null);

draw();

}

function checkWin(){

let win = [];

for(let i=1;i<size*size;i++){
win.push(i);
}

win.push(null);

if(JSON.stringify(tiles)===JSON.stringify(win)){
message.textContent="🏆 Gewonnen!";
}

}

startGame();