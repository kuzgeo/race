let screen = document.getElementById("screen");
let ctx = screen.getContext('2d');
let enemies = [];
let score = 0;
let distant = 0;
class Car{
    static type = 'CAR';
    constructor(options){
        this.x = options.x;
        this.y = options.y;
        this.width = options.width;
        this.height = options.height;
        this.color = options.color;
        this.dx = options.dx;
        this.dy = options.dy;
    }
}   

class Enemy{
    static type = 'ENEMY';
    constructor(options){
        this.x = options.x;
        this.y = options.y;
        this.dx = options.dx;
        this.dy = options.dy;
        this.color = options.color;
        this.width = options.width;
        this.height = options.height;
        this.collaps = options.collaps;
    }
}


function createEnemy(x, y, dx, dy, color, width, height, collaps){
    let enemy = new Enemy({
        x: x,
        y: y,
        dx: dx,
        dy: dy,
        color: color,
        width: width,
        height: height,
        collaps: collaps,
    })
    enemies.push(enemy);
}

let car = new Car({
    x: 100,
    y: screen.height - 60,
    width: 60,
    height: 60,
    color: "black",
    dx: 7,
    dy: 5,
})

function drawCar() {
    ctx.fillRect(car.x, car.y, car.width, car.height);
    ctx.fillStyle = car.color;
    ctx.fill();
}

function drawEnemy(){
    for (let i = 0; i < enemies.length; i++){
        ctx.fillRect(enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
        ctx.fillStyle = enemies[i].color;
        ctx.fill();
    }
}

function draw() {
    document.getElementById("score").innerHTML = score;
    document.getElementById("dist").innerHTML = distant.toFixed(1);
    //clear screen
    ctx.clearRect(0, 0, screen.width, screen.height);
    //draw car
    drawEnemy();   

    if (score > 20){
        alert('Все');
        score = 0;
        distant = 0;
        enemies = [];
        draw();
    }
    
    if(car.x + car.dx > screen.width-car.width) {
        car.x = screen.width-car.width;
    } else if (car.x < 0){
        car.x = 1 ;
        
    }

    //draw enemy
    drawCar();
    if (Math.random() * 100 > 50){
        createEnemy(Math.random() * 1000, 40, 5, 2, 'black', 30, 60, 0);
    }
    for (let i = 0; i < enemies.length; i++){
        enemies[i].y += enemies[i].dx;
        if (enemies[i].y > screen.height + 20 || enemies[i].x + (enemies[i].width / 2) > screen.width){
            enemies.splice(i, 1);
        } 

    }
    for (let i = 0; i < enemies.length; i++){
        if (
            (enemies[i].x < car.x + car.width) &&
            (enemies[i].x + enemies[i].width > car.x) &&
            (enemies[i].y < car.y + car.height) &&
            (enemies[i].y + enemies[i].height > car.y) &&
            (enemies[i].collaps == 0)){
                enemies[i].collaps = 1;
                score += 1;
            }
    }
    car.x += car.dx;
    distant += 0.1;
}
window.addEventListener("keydown", function(event) {
    // Число 13 в "Enter" и клавиши на клавиатуре
    if (event.keyCode === 32) {
      car.dx = -car.dx;
    }

  });

setInterval(draw, 60);
