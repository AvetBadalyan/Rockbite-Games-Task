import { Circle, generateRandomColor } from "./Circle";

const gameCanvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const canvasContext = gameCanvas.getContext("2d") as CanvasRenderingContext2D;

const circles: Circle[] = [];
const maxCircles = 15;

let gravity = 9.81;
let isPaused = false;

export function setGravity(newGravity: number) {
  gravity = newGravity;
}

export function togglePause() {
  isPaused = !isPaused;
  return isPaused;
}

export function resetCircles() {
  circles.length = 0;
  updateCircleCount();
}

export function handleCanvasClick(event: MouseEvent) {
  if (circles.length < maxCircles) {
    spawnCircle(event.clientX, event.clientY);
  }
}

function spawnCircle(clientX: number, clientY: number) {
  const rect = gameCanvas.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  const radius = Math.random() * 20 + 10;
  const color = generateRandomColor();
  circles.push({
    x,
    y,
    radius,
    color,
    vx: (Math.random() - 0.5) * 20,
    vy: (Math.random() - 0.5) * 20,
    gravity: gravity * 40,
    damping: 0.7,
    friction: 0.99,
    bounceThreshold: 0.5,
  });
  updateCircleCount();
}

function updateCircle(circle: Circle, deltaTime: number) {
  circle.vy += circle.gravity * deltaTime;
  circle.y += circle.vy * deltaTime;
  circle.x += circle.vx * deltaTime;
  circle.vx *= circle.friction;

  if (circle.y + circle.radius >= gameCanvas.height) {
    circle.y = gameCanvas.height - circle.radius;
    circle.vy *= -circle.damping;

    if (Math.abs(circle.vy) < circle.bounceThreshold) {
      circle.vy = 0;
    }
  }

  if (
    circle.x - circle.radius <= 0 ||
    circle.x + circle.radius >= gameCanvas.width
  ) {
    circle.vx *= -1;
  }

  drawCircle(circle);
}

function drawCircle(circle: Circle) {
  canvasContext.beginPath();
  canvasContext.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
  const gradient = canvasContext.createRadialGradient(
    circle.x,
    circle.y,
    circle.radius / 2,
    circle.x,
    circle.y,
    circle.radius
  );
  gradient.addColorStop(0, "white");
  gradient.addColorStop(1, circle.color);
  canvasContext.fillStyle = gradient;
  canvasContext.fill();
  canvasContext.closePath();
}

function updateCircleCount() {
  const circleCount = document.getElementById("circleCount") as HTMLSpanElement;
  circleCount.textContent = `Circles: ${circles.length}`;
}

let lastTime = 0;

export function tick(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  if (!isPaused) {
    canvasContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    for (let i = circles.length - 1; i >= 0; i--) {
      const circle = circles[i];
      updateCircle(circle, deltaTime);

      if (
        Math.abs(circle.vy) < circle.bounceThreshold &&
        circle.y + circle.radius >= gameCanvas.height
      ) {
        circles.splice(i, 1);
        updateCircleCount();
      }
    }
  }

  requestAnimationFrame(tick);
}

export function resizeCanvas() {
  const controls = document.getElementById("controls")!;
  gameCanvas.width = window.innerWidth;
  gameCanvas.height = window.innerHeight - controls.offsetHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

requestAnimationFrame(tick);
