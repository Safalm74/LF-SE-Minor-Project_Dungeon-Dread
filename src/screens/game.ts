import mapConstants from "../constants/mapConstants";
import stateConstants from "../constants/stateConstants";
import Map from "../modules/map";
import Hero from "../modules/hero";
import Point from "../modules/points";
import getRandomInt from "../util/randomNumber";
import heroSprite from "../sprites/hero";
import GruntType1 from "../modules/grunt[Type1]";
import gruntType1Sprite from "../sprites/grunt[Type1]Sptite";
import gameMap from "../assets/map/map.png"
import { canvas } from "../main";
//loading map background
const mapImage = new Image;
mapImage.src = gameMap;

//loading map obsticles and bushes
const map = new Map(
    mapConstants.tileSize
);

let hero: Hero;
function createHero() {
    //defining hero object
    hero = new Hero(
        new Point(
            window.innerWidth / 2, window.innerHeight / 2),
        "blue",
        true,
        120,
        35 * canvas.width / 1000,
        44 * canvas?.width / 1000
    );
}


//spwan Type1 enemies
const gruntType1Array: GruntType1[] = []
function createType1() {
    setInterval(
        () => {
            const gruntObj = new GruntType1(
                new Point(
                    getRandomInt(mapConstants.tileSize + mapConstants.displayPosition.x, window.innerWidth - mapConstants.tileSize),
                    getRandomInt(mapConstants.tileSize +mapConstants.displayPosition.y, window.innerHeight - mapConstants.tileSize * 2)),
                "red",
                true,
                100,
                24 * canvas.width / 1000,
                34 * canvas.width / 1000
            );
            if (gruntType1Array.length < 100) {

                gruntType1Array.push(gruntObj);
            }

        }
        ,
        1500
    );
}
//function that handles all display
function displayAll(ctx: CanvasRenderingContext2D) {

    //Map background
    ctx.drawImage(
        mapImage,
        mapConstants.displayPosition.x,
        mapConstants.displayPosition.y,
        window.innerWidth * 4,
        window.innerHeight * 4

    );

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
    displayAll(ctx);
    //looping game
    if (stateConstants.ingame) {
        requestAnimationFrame(
            () => {
                gameLoop(ctx)
            });
    }
}


export { hero, gruntType1Array }
export default function gameMain(
    ctx: CanvasRenderingContext2D) {
    stateConstants.ingame = true;
    createType1();
    createHero();
    gameLoop(ctx);
}