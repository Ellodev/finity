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
        this.x += this.xSpeed;

        this.y += this.ySpeed;
        this.ySpeed += gravity;

        if (this.y >= 750-80) {
            canJump = true;
            this.ySpeed = 0;
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
}

var p;
var gravity = 0.1

var canJump = true;

var rocks = [];

window.onload = function () {
    start();
    setInterval(update, 10);
}

function start() {
    p = new Player(400, 400);
}

function update() {
    canvas.width=canvas.width;
    //groud
    c.fillStyle = 'green';
    c.fillRect(0, 750, 800, 100);
    //player
    p.show();
    p.update();
}

function keyDown(e) {
    if (e.keyCode === 39) {
        p.xSpeed = 5;
    }
    if (e.keyCode === 37) {
        p.xSpeed = -5;
    }
    if (e.keyCode === 38 && canJump) {
        p.ySpeed = -3;
    }
}

function keyUp(e) {
    if (e.keyCode === 39) {
        p.xSpeed = 0;
    }
    if (e.keyCode === 37) {
        p.xSpeed = 0;
    }
}

document.onkeydown = keyDown;
document.onkeyup = keyUp;