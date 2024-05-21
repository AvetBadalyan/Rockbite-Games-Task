# Bouncing Ballz

## Objective

Develop a web application using html5 canvas, where users can click on the screen to spawn a circle. This circle should realistically obey Earth-like gravity, moving vertically and bouncing upon hitting the bottom of the screen, with a dampening effect on each bounce until it comes to a stop. There can be multiple circle instances on screen at a time.

## Requirements

- **Programming Language**: Implement the task using JavaScript or TypeScript, with a preference for TypeScript.
- **Interaction**: Enable the spawning of a circle at the user's click location.
- **Realistic Physics Simulation**: The circle should fall and bounce realistically, with gravity settings resembling Earth's gravity. Bouncing should exhibit a dampening effect, reducing the bounce height progressively until the circle stops.
- **Code Quality**: Write clean, readable, and maintainable code.

## Third-Party Libraries and Tools

- **Minimal Use**: Rely primarily on your coding skills, limiting the use of third-party libraries.
- **Acceptable Libraries**: It’s ok to use something minimalistic for small aesthetics, but do not use graphics engines, things like pixi, react e.g. Ask if not sure. Ideally - nothing external.
- **Use canvas**: for anything visual use native stuff like canvas and css

## Game-Loop concept

In game dev it’s important to achieve movement of objects, by updating values a small fraction on each frame, usually in a tick method. A 'tick' method updates game elements each frame, using 'delta time' to ensure smooth motion regardless of frame rate.

```javascript
function tick(currentTime: number) {
  const deltaTime = currentTime - lastTime;
  // ... update game elements using deltaTime
  lastTime = currentTime;
  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);
```

## Setup and Execution Instructions

- This project is created with Vite.
- To run the project, first install the dependencies by running `npm install`.
- Then, start the development server by running `npm run dev`.
