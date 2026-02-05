
let birdY = 250;
let velocity = 0;
let gravity = 0.6;
let score = 0;
let gameOver = false;

let pipes = [];

function spawnPipe() {
  let gap = 150;
  let top = Math.random() * 200 + 50;

  pipes.push({
    x: canvas.width,
    top: top,
    bottom: top + gap,
    passed: false
  });
}

setInterval(() => {
  if (!gameOver) spawnPipe();
}, 1800);

function flap() {
  if (!gameOver) velocity = -9;
}

document.addEventListener("keydown", e => {
  if (e.code === "Space") flap();
});
canvas.addEventListener("click", flap);

function drawBird() {
  ctx.fillStyle = "gold";
  ctx.beginPath();
  ctx.arc(80, birdY, 14, 0, Math.PI * 2);
  ctx.fill();
}

function drawPipes() {
  ctx.fillStyle = "#1f9d6e";
  pipes.forEach(p => {
    ctx.fillRect(p.x, 0, 60, p.top);
    ctx.fillRect(p.x, p.bottom, 60, canvas.height);
  });
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  velocity += gravity;
  birdY += velocity;

  if (birdY < 0 || birdY > canvas.height) gameOver = true;

  pipes.forEach(p => {
    p.x -= 2;

    if (!p.passed && p.x < 80) {
      score++;
      p.passed = true;
    }

    if (
      80 + 14 > p.x &&
      80 - 14 < p.x + 60 &&
      (birdY - 14 < p.top || birdY + 14 > p.bottom)
    ) {
      gameOver = true;
    }
  });

  pipes = pipes.filter(p => p.x + 60 > 0);

  drawBird();
  drawPipes();

  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 10, 25);
}

function loop() {
  if (!gameOver) update();
  else {
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "gold";
    ctx.font = "28px Arial";
    ctx.fillText("Game Over", 95, 260);
  }
  requestAnimationFrame(loop);
}

loop();
