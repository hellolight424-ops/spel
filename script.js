const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const message = document.getElementById("message");

const box = 20;
const canvasSize = 400;

let snake = [{x: 9*box, y: 9*box}];
let direction = "RIGHT"; // beginrichting
let score = 0;

// genereer voedsel
let food = {
  x: Math.floor(Math.random()*20)*box,
  y: Math.floor(Math.random()*20)*box
};

document.addEventListener("keydown", setDirection);

function setDirection(e){
  if(e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if(e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if(e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if(e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function draw(){
  // clear canvas
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,canvasSize,canvasSize);

  // draw snake
  for(let i=0;i<snake.length;i++){
    ctx.fillStyle = i===0 ? "lime" : "green";
    ctx.fillRect(snake[i].x,snake[i].y,box,box);
    ctx.strokeStyle="black";
    ctx.strokeRect(snake[i].x,snake[i].y,box,box);
  }

  // draw food
  ctx.fillStyle="red";
  ctx.fillRect(food.x,food.y,box,box);
}

function update(){
  let head = {...snake[0]};

  // beweeg de kop
  if(direction==="UP") head.y -= box;
  if(direction==="DOWN") head.y += box;
  if(direction==="LEFT") head.x -= box;
  if(direction==="RIGHT") head.x += box;

  // check botsing met muren
  if(head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize){
    clearInterval(game);
    message.textContent = "💀 Game Over!";
    return;
  }

  // check botsing met zichzelf
  for(let i=0;i<snake.length;i++){
    if(head.x === snake[i].x && head.y === snake[i].y){
      clearInterval(game);
      message.textContent = "💀 Game Over!";
      return;
    }
  }

  snake.unshift(head);

  // check voedsel
  if(head.x === food.x && head.y === food.y){
    score += 10;
    scoreDisplay.textContent = score;
    // nieuw voedsel
    food = {
      x: Math.floor(Math.random()*20)*box,
      y: Math.floor(Math.random()*20)*box
    };
  }else{
    snake.pop();
  }

  draw();
}

// start game
let game = setInterval(update,150);
