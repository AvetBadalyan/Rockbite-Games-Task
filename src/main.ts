interface Circle {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  gravity: number;
  damping: number;
  friction: number;
  bounceThreshold: number;
}

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const circles: Circle[] = [];
const maxCircles = 15;

let isPaused = false;
let gravity = 9.81;

const pauseButton = document.getElementById("pauseButton") as HTMLButtonElement;
const resetButton = document.getElementById("resetButton") as HTMLButtonElement;
const gravityRange = document.getElementById(
  "gravityRange"
) as HTMLInputElement;

pauseButton.addEventListener("click", () => {
  isPaused = !isPaused;
  pauseButton.textContent = isPaused ? "Resume" : "Pause";
});

resetButton.addEventListener("click", () => {
  circles.length = 0;
});

gravityRange.addEventListener("input", (event) => {
  gravity = parseFloat((event.target as HTMLInputElement).value);
});

canvas.addEventListener("click", (event: MouseEvent) => {
  if (circles.length < maxCircles) {
    spawnCircle(event.clientX, event.clientY);
  }
});

function spawnCircle(clientX: number, clientY: number) {
  const rect = canvas.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  const radius = Math.random() * 20 + 10;
  const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  circles.push({
    x,
    y,
    radius,
    color,
    vx: (Math.random() - 0.5) * 20, // Increased speed
    vy: (Math.random() - 0.5) * 20, // Initial vertical speed
    gravity: gravity,
    damping: 0.7,
    friction: 0.99,
    bounceThreshold: 0.5,
  });
}

let lastTime = 0;

function tick(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  if (!isPaused) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = circles.length - 1; i >= 0; i--) {
      const circle = circles[i];
      updateCircle(circle, deltaTime);

      if (circle.vy === 0 && circle.y + circle.radius === canvas.height) {
        circles.splice(i, 1);
      }
    }
  }

  requestAnimationFrame(tick);
}

function updateCircle(circle: Circle, deltaTime: number) {
  circle.gravity = gravity;
  circle.vy += circle.gravity * deltaTime;
  circle.y += circle.vy * deltaTime;
  circle.x += circle.vx * deltaTime;
  circle.vx *= circle.friction;

  if (circle.y + circle.radius >= canvas.height) {
    circle.y = canvas.height - circle.radius;
    circle.vy *= -circle.damping;

    if (Math.abs(circle.vy) < circle.bounceThreshold) {
      circle.vy = 0;
    }
  }

  if (
    circle.x - circle.radius <= 0 ||
    circle.x + circle.radius >= canvas.width
  ) {
    circle.vx *= -1;
  }

  drawCircle(circle);
}

function drawCircle(circle: Circle) {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
  ctx.fillStyle = circle.color;
  ctx.fill();
  ctx.closePath();
}

function resizeCanvas() {
  const controls = document.getElementById("controls")!;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - controls.offsetHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

requestAnimationFrame(tick);
