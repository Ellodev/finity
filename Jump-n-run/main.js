var canvas = document.getElementById("canv");
var c = canvas.getContext("2d");

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 40;
        this.h = 80;       
        this.ySpeed = 3;
        this.xSpeed = 0;
    }
    show() {
        c.fillStyle = 'red';
        c.fillRect(this.x, this.y, this.w, this.h);
    }
    update() {
        
        this.y += this.ySpeed;
        this.ySpeed += gravity;
        
        if (this.y >= 750-80) {
            this.ySpeed = 0;
            canJump = true;
        } else {
            canJump = false;
        }
    }
}

class Rock {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 40;
        this.h = 40;
    }
    show() {
        c.fillStyle = 'gray';
        c.fillRect(this.x, this.y, this.w, this.h);
    }
    update() {
        if (this.x < p.x + p.w && this.x + this.w > p.x && this.y < p.y + p.h && this.y + this.h > p.y) {
            location.reload();
        }
    }
}

var p;
var gravity = 0.1

var canJump = true;

var rocks = [];

var rockX = 800;

var score = 0;

window.onload = function() {
    start();
    setInterval(update, 10);
}

function start() {
    p = new Player(100, 400);
    
    for (let i = 0; i < 100; i++) {
        var r = new Rock(rockX, 710);
        rocks.push(r);
        rockX += Math.floor(Math.random() * 500) + 300;
    }
    
    p.xSpeed = 5;
}

function update() {
    canvas.width=canvas.width;
    //ground
    c.fillStyle = 'green';
    c.fillRect(0, 750, 800, 100);
    //player
    p.show();
    p.update();
    //rocks
    for (let i = 0; i < rocks.length; i++) {
        rocks[i].show();
        rocks[i].update();
        rocks[i].x -= p.xSpeed;
    }
    //show score
    document.getElementById("showScore").innerHTML = "Score: " + score;
}

function changeSpeed() {
    p.xSpeed += 0.1;
}

function increaseScore() {
    score++;
}

setInterval(changeSpeed, 500);
setInterval(increaseScore, 500);

function keyDown(e) {
    if (e.keyCode === 38 && canJump) {
        p.ySpeed = -4;
    }
}

document.onkeydown = keyDown;