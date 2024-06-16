import mapConstants from "./constants/mapConstants";
import gameMain from "./screens/game";
// initializing canvas
const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
//getting canvas context for 2d rendering
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
if (canvas){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    canvas.style.backgroundColor=mapConstants.mapColor;

    //calling game
    gameMain(ctx);
}

export {canvas};