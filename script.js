// 🔒 Block site access before Ramadan
const ramadanDate = new Date("2026-02-16T00:00:00");

if (window.location.pathname.endsWith("index.html")) {
  const now = new Date();
  if (now < ramadanDate) {
    window.location.href = "countdown.html";
  }
}

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
const STAR_COUNT = 180;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Create stars
for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5 + 0.5,
    speed: Math.random() * 0.3 + 0.1
  });
}

let mouse = { x: 0, y: 0 };
let lastMouseX = 0;
let lastMouseY = 0;
let mouseIdleTime = 0;

window.addEventListener("mousemove", (e) => {
  const newX = (e.clientX / window.innerWidth - 0.5) * 10;
  const newY = (e.clientY / window.innerHeight - 0.5) * 10;
  
  // Reset idle time if mouse has moved
  if (newX !== lastMouseX || newY !== lastMouseY) {
    mouseIdleTime = 0;
    lastMouseX = newX;
    lastMouseY = newY;
  }
  
  mouse.x = newX;
  mouse.y = newY;
});

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Increase idle time each frame
  mouseIdleTime++;
  
  // Reduce movement effect when mouse is idle (after 30 frames of no movement)
  const idleThreshold = 30;
  const movementMultiplier = mouseIdleTime > idleThreshold ? 0.2 : 1;

  stars.forEach(star => {
    star.x += mouse.x * star.speed * movementMultiplier;
    star.y += mouse.y * star.speed * movementMultiplier;

    // Wrap around edges
    if (star.x < 0) star.x = canvas.width;
    if (star.x > canvas.width) star.x = 0;
    if (star.y < 0) star.y = canvas.height;
    if (star.y > canvas.height) star.y = 0;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  });

  requestAnimationFrame(animateStars);
}

animateStars();
