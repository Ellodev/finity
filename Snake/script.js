const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class SnakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 16;
let tileSize = canvas.width / tileCount;

let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

//game loop
function drawGame(){

    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;
    }

    clearScreen();

    checkAppleCollision();
    drawApple();
    drawSnake();

    drawScore();

    setTimeout(drawGame, 1000/ speed);
}

function isGameOver(){
    let gameOver = false;

    if(yVelocity === 0 && xVelocity === 0){
        return false;
    }    

    //walls
    if(headX < 0 ){
        gameOver = true;
    }
    if(headX >= 20){
        gameOver = true;
    }
    else if(headY < 0){
        gameOver = true;
    }
    else if(headY === 20){
        gameOver = true;
    }

    for(let i =0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "40px Verdana";

        var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", "white");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "white");
        // Fill with gradient
        ctx.fillStyle = gradient;

        ctx.fillText("Game Over!", canvas.width / 9, canvas.height / 2);
    }
    return gameOver;
}

function drawScore(){
    ctx.fillstyle = 'white';
    ctx.font = "10px Verdana";
    ctx.fillText("Score:" + score, canvas.width-50, 10);
}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake(){
   
    ctx.fillStyle = 'green';
    for(let i =0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY));
    while(snakeParts.length > tailLength){
        snakeParts.shift();
    }

    ctx.fillStyle = 'darkgreen';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize,tileSize);


}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple(){
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision(){
    if (appleX === headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
    }
}

document.body.addEventListener("keydown", keyDown);

document.body.addEventListener("keydown", keyDown);

function keyDown(event) {
    switch (event.key) {
        case "w":
        case "ArrowUp": // Up
            if (yVelocity !== 1) {
                yVelocity = -1;
                xVelocity = 0;
            }
            break;
        case "s":
        case "ArrowDown": // Down
            if (yVelocity !== -1) {
                yVelocity = 1;
                xVelocity = 0;
            }
            break;
        case "a":
        case "ArrowLeft": // Left
            if (xVelocity !== 1) {
                yVelocity = 0;
                xVelocity = -1;
            }
            break;
        case "d":
        case "ArrowRight": // Right
            if (xVelocity !== -1) {
                yVelocity = 0;
                xVelocity = 1;
            }
            break;
    }
}



drawGame();