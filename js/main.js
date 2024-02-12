// Alles was funktioniert hier rein.

const canvas = document.getElementById("gameCenter");
const ctx = canvas.getContext("2d");

var score = document.getElementById("score");

let player = {
    x: 0,
    y: 220,
    speed: 3,
    playerSize: 100,
    gravity: 2.5,
    jumpPower: 3,
    jumpheight: 150,
    jumping: false
}

let coin = {
    x: 0,
    y: 0,
    size: 10,
    isTaken: false
}

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let spacePressed = false;
let jumplock = false;
let point = false;
let coinCount = 0;


// var keyW = 87, keyA = 65, keyS = 83, keyD = 68;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);



function drawPlayer() {
    var image = new Image();
    image.src = '../images/testing char.png';

    image.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, player.x, player.y, player.playerSize,  player.playerSize,)
        drawCoin();
    }
}

function jump() {
    ctx.clearRect(player.x, player.y, player.rectsize, player.rectsize);
    
    if (player.jumping && player.y > player.jumpheight) {
        player.y -= player.jumpPower;
        jumplock = true;
    } else if (player.y < 220 && !player.jumping) {
        player.y += player.gravity ;
    } else {
        jumpblock = false;
        player.jumping = false;
    }
  }

function wallCollision() {
    if (player.y + player.playerSize >= canvas.height) { 
        player.y = canvas.height - player.playerSize;
    }
    else if (player.y <= 0) {
        player.y = 0;
    }
    if (player.x + player.playerSize >= canvas.width) { 
        player.x = canvas.width - player.playerSize;
    }
    else if (player.x <= 0) {
        player.x = 0;
    }
}


function keyDownHandler(e) {
    if (e.key === "d" || e.key === "ArrowRight") {
      rightPressed = true;
    } else if (e.key === "a" || e.key === "ArrowLeft") {
      leftPressed = true;
    } else if(e.key == "w" || e.key === "ArrowUp"){
        upPressed = true;
    } else if (e.key == "s" || e.key === "ArrowDown"){
        downPressed = true;
    } else if (e.key === " "){
      spacePressed = true;
    }
  }
  
  function keyUpHandler(e) {
    if (e.key === "d" || e.key === "ArrowRight") {
      rightPressed = false;
    } else if (e.key === "a" || e.key === "ArrowLeft") {
      leftPressed = false;
    } else if(e.key == "w" || e.key === "ArrowUp"){
        upPressed = false;
    } else if (e.key == "s" || e.key === "ArrowDown"){
        downPressed = false;
    } else if (e.key == " "){
      spacePressed = false;
    }
  }

  function checkinput() {
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
      coinCollision();
}

function drawCoin() {
    // var coinImg = new Image();
    // coinImg.src = '../images/coin.png'

    ctx.beginPath();
    ctx.arc(coin.x, coin.y, coin.size, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}
function spawnCoin() {
    if(!coin.isTaken) {
        coin.x = Math.random() * (canvas.width - 2 * coin.size) + coin.size;
        coin.y = Math.random() * (canvas.height - 2 * coin.size) + coin.size;
    }
}

function coinCollision() {
    if (
        player.x < coin.x + coin.size &&
        player.x + player.playerSize > coin.x &&
        player.y < coin.y + coin.size &&
        player.y + player.playerSize > coin.y
    ) {
        coin.isTaken = true;
        coinCount++;
        spawnCoin();
        score.innerHTML = "Your Coins: " + coinCount; 
    }
}

function startGame() {
    spawnCoin();
    checkinput();
    wallCollision();
    drawPlayer();
}

setInterval(startGame, 10);
