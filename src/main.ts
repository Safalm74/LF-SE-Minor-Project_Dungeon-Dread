import mapConstants from "./constants/mapConstants";
import gameMain from "./screens/game";
import eventhandler from "./util/eventHandler";
// initializing canvas
const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
//getting canvas context for 2d rendering
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

//loading event handlers
eventhandler();

if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.backgroundColor=mapConstants.mapColor;
  
    //calling game
    gameMain(ctx);
}

export { canvas ,ctx};