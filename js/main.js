const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let x = 20
let y = 20
let speed = 3
const rectsize = 50;

function jump(e) {
  if(e.key === "Space") {
    y += 10;
  }
}

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = true;
    } else if(e.key == "Up" || e.key === "ArrowUp"){
        upPressed = true;
    } else if (e.key == "Down" || e.key === "ArrowDown"){
        downPressed = true;
    }
  }
  
  function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = false;
    } else if(e.key == "Up" || e.key === "ArrowUp"){
        upPressed = false;
    } else if (e.key == "Down" || e.key === "ArrowDown"){
        downPressed = false;
    } 
  }

  function wallcollision() {
    if (y + rectsize >= canvas.height) { // Untere Kollision
        y = canvas.height - rectsize; // Korrektur: Richtung umkehren und Geschwindigkeit subtrahieren
    }
    else if (y <= 0) { // Obere Kollision
        y = 0; // Korrektur: Setzen Sie y auf den Grenzwert
    }
    if (x + rectsize >= canvas.width) { // Rechte Kollision
        x = canvas.width - rectsize; // Korrektur: Richtung umkehren und Geschwindigkeit subtrahieren
    }
    else if (x <= 0) { // Linke Kollision
        x = 0; // Korrektur: Setzen Sie x auf den Grenzwert
    }
}  

function testrect(){
    ctx.beginPath();
    ctx.rect(x, y, rectsize, rectsize);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}

function draw_point(){
  ctx.beginPath();
  ctx.arc((Math.random()*canvas.width), (Math.random()*canvas.height), 10, 0, Math.PI * 2);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
  ctx.closePath();
}


function checkinput(){
    if(rightPressed){
        x =+ Math.min(x + speed, canvas.width)
    }
    if(leftPressed){
        x =+ Math.min(x - speed, canvas.width)
    }
    if(upPressed){
        y =+ Math.min(y - speed, canvas.height)
    }
    if(downPressed){
        y =+ Math.min(y + speed, canvas.height)
    }
}

function update() {
    ctx.clearRect(x, y, canvas.width, canvas.height)
    checkinput();
    wallcollision()
    testrect();
    draw_point();
    jump();
  }


setInterval(update, 10);
  