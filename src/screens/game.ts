import mapConstants from "../constants/mapConstants";
import stateConstants from "../constants/stateConstants";
import Map from "../modules/map";
import { canvas} from "../main";
import Hero from "../modules/hero";
import Point from "../modules/points";
import getRandomInt from "../util/randomNumber";
import heroSprite from "../sprites/hero";
import GruntType1 from "../modules/grunt[Type1]";
import gruntType1Sprite from "../sprites/grunt[Type1]Sptite";


const map = new Map(
    mapConstants.tileSize
);
const hero = new Hero(
    new Point(getRandomInt(0, window.innerWidth), getRandomInt(0, window.innerHeight)),
    "blue",
    true,
    120,
    heroSprite.width,
    heroSprite.height
);

//spwan Type1 enemies
const gruntType1Array: GruntType1[] = []
function createType1() {
    setInterval(
        () => {
            const gruntObj = new GruntType1(
                new Point(
                    getRandomInt(0, window.innerWidth),
                    getRandomInt(0, window.innerHeight)),
                "red",
                true,
                100,
                gruntType1Sprite.width,
                gruntType1Sprite.height
            );
            gruntType1Array.push(gruntObj);

        }
        ,
        1500
    );
}
//main Loop function
function gameLoop(
    ctx: CanvasRenderingContext2D
) {
    // clearing screen 
    ctx?.clearRect(
        0,
        0,
        canvas.width,
        canvas.height);
    map.draw(ctx);
    hero.draw(ctx);
    gruntType1Array.forEach(
        (obj) => {
            if (obj.isSpwaned) {
                obj.draw(ctx);
            }
            else {
                obj.spwan(ctx);
            }

        }
    );
    //looping game
    if (stateConstants.ingame) {
        requestAnimationFrame(
            () => {
                gameLoop(ctx)
            });
    }
}
export { hero }
export default function gameMain(
    ctx: CanvasRenderingContext2D) {
    stateConstants.ingame = true;
    createType1();
    gameLoop(ctx);
}