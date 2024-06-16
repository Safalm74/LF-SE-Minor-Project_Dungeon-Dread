import mapConstants from "../constants/mapConstants";
import stateConstants from "../constants/stateConstants";
import Map from "../modules/map";
import { canvas } from "../main";
import Hero from "../modules/hero";
import Point from "../modules/points";
import getRandomInt from "../util/randomNumber";
import heroSprite from "../sprites/hero";


const map= new Map(
    mapConstants.tileSize
);
const hero= new Hero(
    new Point(getRandomInt(0,window.innerWidth),getRandomInt(0,window.innerHeight)),
    "blue",
    true,
    120,
    heroSprite.width,
    heroSprite.height
);
//main Loop function
function gameLoop(
    ctx:CanvasRenderingContext2D
){
    // clearing screen 
    ctx?.clearRect(
        0,
        0,
        canvas.width,
        canvas.height);
    map.draw(ctx);
    hero.draw(ctx);
    //looping game
    if (stateConstants.ingame){
        requestAnimationFrame(
            ()=>{
                gameLoop(ctx)
            });
    }
}

export default function gameMain(
    ctx: CanvasRenderingContext2D){
    stateConstants.ingame=true;
    gameLoop(ctx);
}