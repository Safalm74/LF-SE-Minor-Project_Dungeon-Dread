import eventhandler from "./util/eventHandler";
import loadingScreen from "./screens/loadingScreen";
// initializing canvas
const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
//getting canvas context for 2d rendering
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

//loading event handlers
eventhandler();
//info screen
if (canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.background = "linear-gradient(172.33deg, #30303A -1.75%, #20202E 83.53%, #050519 104.9%)";
  //loadingScreen(ctx)
  //homeScreen(ctx);
  // infoScreen(
  //   ctx,
  //   "gameOver",
  //   "hello",
  //   "return",
     loadingScreen(ctx)
  // )
}

export { canvas, ctx };