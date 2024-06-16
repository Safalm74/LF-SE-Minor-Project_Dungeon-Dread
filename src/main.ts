import mapConstants from "./constants/mapConstants";
import Point from "./modules/points";
import gameMain, { hero } from "./screens/game";
// initializing canvas
const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
//getting canvas context for 2d rendering
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

//Defining Event Handlers
window.addEventListener(
    'keydown',
    (e) => {
        switch (e.key.toLowerCase()) {
            case "a" :
                if (canvas) {
                    hero.moveLeft(true);
                }
                

                break;
            case "d":
                hero.moveLeft(false);
                break;

            case "w":
                hero.moveUp(true);
                break;

            case "s":
                hero.moveUp(false);
                break;
        }
    }
);
window.addEventListener(
    'keyup',
    () => {
        hero.velocity=new Point(0,0);
        hero.isMoving=false;
    }
);
if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.backgroundColor = mapConstants.mapColor;

    //calling game
    gameMain(ctx);
}

export { canvas ,ctx};