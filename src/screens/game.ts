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
import progressBar from "../util/bar";
import mainConstants from "../constants/mainConstants";
import dropDownMsg from "../util/dropdownMsg";
import Pestol from "../modules/pestol";
import pestolSprite from "../sprites/pestolSprite";
import { handleEvents } from "../util/eventHandler";
import Bullet from "../modules/bullet";
//loading map background
const mapImage = new Image;
mapImage.src = gameMap;
//checking time to set next wave
let waveStartTime: Date;
//spwan Type1 enemies
let gruntType1Array: GruntType1[] = [];
//Bullet array
let bulletArray: Bullet[] = [];
//hero obj
let hero: Hero;

//function to return time difference and detect end of wave
function remainingTime() {
    const remainingTimems = (new Date).getTime() - waveStartTime.getTime()
    if (remainingTimems >= mainConstants.waveIntervalTime) {
        //console.log('new wave')
        waveStartTime = new Date;
    }
    return remainingTimems;
}

//loading map obsticles and bushes
const map = new Map(
    mapConstants.tileSize
);

//function that initiate hero
function createHero() {
    //defining hero object
    hero = new Hero(
        new Point(
            window.innerWidth / 2, window.innerHeight / 2),
        "blue",
        true,
        120,
        35 * canvas.height / 600,
        44 * canvas.height / 600
    );
}
//function that removes dead enemies
function removeDeadEnemy() {
    gruntType1Array = gruntType1Array.filter(
        (obj) => {
            return (obj.healthpoint > 0);
        }
    );
}
//function that removes unnecessary bullets
function removeBullet() {
    bulletArray = bulletArray.filter(
        (obj) => {
            return (
                !((obj.endPoint.x >=
                    window.innerHeight *
                    mapConstants.mapSizeMultiplier) ||
                (obj.startPoint.x <=
                    0) ||
                obj.isHit)
            );
        }
    );
}
//function that creates enemy every interval
function createType1() {
    setInterval(
        () => {

            if (gruntType1Array.length < mainConstants.maxEnemies) {
                const gruntObj = new GruntType1(
                    new Point(
                        getRandomInt(mapConstants.tileSize + mapConstants.displayPosition.x, window.innerWidth * 5 - mapConstants.tileSize),
                        getRandomInt(mapConstants.tileSize + mapConstants.displayPosition.y, window.innerHeight * 5 - mapConstants.tileSize * 2)),
                    "red",
                    true,
                    100,
                    24 * canvas.height / 700,
                    34 * canvas.height / 700
                );

                gruntType1Array.push(gruntObj);
            }

        }
        ,
        500
    );
}


//function that handles all display
function displayAll(ctx: CanvasRenderingContext2D) {
    //Map background
    ctx.drawImage(
        mapImage,
        mapConstants.displayPosition.x,
        mapConstants.displayPosition.y,
        window.innerWidth * mapConstants.mapSizeMultiplier,
        window.innerHeight * mapConstants.mapSizeMultiplier

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
    progressBar(
        ctx,
        new Point(canvas.width * 0.05 - mainConstants.mapPosition.x, canvas.height * 0.05 - mainConstants.mapPosition.y),
        hero.healthpoint,
        mainConstants.heroTotalHealth,
        canvas.width * 0.4,
        canvas.height * 0.03,
        'Life line'
    )
    progressBar(
        ctx,
        new Point(canvas.width * 0.95 - canvas.width * 0.4 - mainConstants.mapPosition.x, canvas.height * 0.05 - mainConstants.mapPosition.y),
        mainConstants.waveIntervalTime - remainingTime(),
        mainConstants.waveIntervalTime,
        canvas.width * 0.4,
        canvas.height * 0.03,
        'Time remaining'
    );
    //drawing bullets
    bulletArray.forEach(
        (bulletObj) => {
            bulletObj.draw(ctx);
        }
    );

    pestolObj.draw(ctx);
    pestolObj.position = hero.weaponPositions[0];


}
let pestolObj: Pestol;
//main Loop function
function gameLoop(
    ctx: CanvasRenderingContext2D
) {
    // clearing screen 
    ctx?.clearRect(
        -mainConstants.mapPosition.x,
        -mainConstants.mapPosition.y,
        mainConstants.mapPosition.x + canvas.width,
        mainConstants.mapPosition.y + canvas.height);
    //eventlitner
    handleEvents();
    //displaying handles
    displayAll(ctx);

    //remove dead enemies
    removeDeadEnemy();
    //remove unecessary bullets
    removeBullet();

    gruntType1Array.forEach(
        (obj) => {
            pestolObj.detectEnemy(obj)
        }
    );

    //looping game
    if (stateConstants.ingame) {
        requestAnimationFrame(
            () => {
                gameLoop(ctx)
            });
    }

    //dropDownMsg(ctx,'New Wave');
}


export { hero, gruntType1Array,bulletArray }
export default function gameMain(
    ctx: CanvasRenderingContext2D) {
    stateConstants.ingame = true;
    createType1();
    createHero();
    waveStartTime = new Date;
    const bulletObj = new Bullet(
        new Point(100, 100),
        new Point(500, 500),
        50,
        new Point(3, 3),
        new Point(0,0)
    );
    bulletArray.push(bulletObj);
    pestolObj = new Pestol(
        hero.weaponPositions[0],
        false,
        10,
        pestolSprite.width * hero.width * 0.01,
        pestolSprite.height * hero.width * 0.01
    );
    //moving focustohero


    gameLoop(ctx);
}