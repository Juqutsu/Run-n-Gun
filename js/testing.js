const canvas = document.getElementById("gameCenter");
const ctx = canvas.getContext("2d");

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let spacePressed = false;
let point = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var image_right = new Image();
image_right.src = '../images/testing char.png';

let player = {
  x: 0,
  y: 220,
  speed: 3,
  rectsize: 100,
  gravity: 2.5,
  jumpPower: 2,
  jumpheight: 150,
  jumping: false
}

function jump() {
  ctx.clearRect(player.x, player.y, player.rectsize, player.rectsize);
  
  if (player.jumping && player.y > player.jumpheight) {
      player.y -= player.jumpPower;
  } else if (player.y < 220 && !player.jumping) {
      player.y += player.gravity ;
  } else {
      player.jumping = false;
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
    } else if (e.key === " "){
      spacePressed = true;
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
    } else if (e.key == " "){
      spacePressed = false;
    }
  }

  function wallcollision() {
    if (player.y + player.rectsize >= canvas.height) { // Untere Kollision
        player.y = canvas.height - player.rectsize; // Korrektur: Richtung umkehren und Geschwindigkeit subtrahieren
    }
    else if (player.y <= 0) { // Obere Kollision
        player.y = 0; // Korrektur: Setzen Sie y auf den Grenzwert
    }
    if (player.x + player.rectsize>= canvas.width) { // Rechte Kollision
        player.x = canvas.width - player.rectsize; // Korrektur: Richtung umkehren und Geschwindigkeit subtrahieren
    }
    else if (player.x <= 0) { // Linke Kollision
        player.x = 0; // Korrektur: Setzen Sie x auf den Grenzwert
    }
}  

function testrect(){
    ctx.beginPath();
    ctx.drawImage(image_right, player.x, player.y, player.rectsize, player.rectsize)
    ctx.closePath();
}


function checkinput(){
    if(rightPressed){
        player.x =+ Math.min(player.x + player.speed, canvas.width)
    }
    else if(leftPressed){
        player.x =+ Math.min(player.x - player.speed, canvas.width)
    }
    if(spacePressed){
      player.jumping = true
    }
    jump()
}

function update() {
    ctx.clearRect(player.x, player.y, player.rectsize, player.rectsize);
    checkinput();
    wallcollision()
    testrect();
    // draw_point();

  }

setInterval(update, 10);
  