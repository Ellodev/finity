var canvas = document.getElementById("canv");
var c = canvas.getContext("2d");

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 40;
        this.h = 80;
    }
    show() {
        c.fillStyle = 'red';
        c.fillRect(this.x, this.y, this.w, this.h);
    }
}

var p;

window.onload = function() {
    StaticRange();
    setInterval(update, 10);
}

function start() {
    p = new Player(400, 400);
}

function update() {
    canvas.width=canvas.width;
    //ground
    c.fillStyle = 'green';
    c.fillRect
    //player
    p.show();
}