import {
  handleCanvasClick,
  setGravity,
  togglePause,
  resetCircles,
  tick,
} from "./CanvasManager";

const pauseButton = document.getElementById("pauseButton") as HTMLButtonElement;
const resetButton = document.getElementById("resetButton") as HTMLButtonElement;
const gravityRange = document.getElementById(
  "gravityRange"
) as HTMLInputElement;
const gravityValue = document.getElementById("gravityValue") as HTMLSpanElement;

pauseButton.addEventListener("click", () => {
  const isPaused = togglePause();
  pauseButton.textContent = isPaused ? "Resume" : "Pause";
});

resetButton.addEventListener("click", resetCircles);

gravityRange.addEventListener("input", (event) => {
  const newValue = (event.target as HTMLInputElement).value;
  setGravity(parseFloat(newValue));
  gravityValue.textContent = newValue;
});

const gameCanvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
gameCanvas.addEventListener("click", handleCanvasClick);

requestAnimationFrame(tick);
