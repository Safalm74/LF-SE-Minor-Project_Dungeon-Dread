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
//loading map background
const mapImage = new Image;
mapImage.src = gameMap;
//checking time to set next wave
let waveStartTime: Date;

//function to return time difference and detect end of wave
function remainingTime(){
    const remainingTimems=(new Date).getTime() - waveStartTime.getTime()
    if (remainingTimems>=mainConstants.waveIntervalTime) {
        //console.log('new wave')
        waveStartTime = new Date;
    }
    return remainingTimems;
}

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
        35 * canvas.height / 600,
        44 * canvas.height / 600
    );
}


//spwan Type1 enemies
const gruntType1Array: GruntType1[] = []
function createType1() {
    setInterval(
        () => {

            if (gruntType1Array.length < mainConstants.maxEnemies) {
            const gruntObj = new GruntType1(
                new Point(
                    getRandomInt(mapConstants.tileSize + mapConstants.displayPosition.x, window.innerWidth*5 - mapConstants.tileSize),
                    getRandomInt(mapConstants.tileSize + mapConstants.displayPosition.y, window.innerHeight*5 - mapConstants.tileSize * 2)),
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
let a=0
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
        new Point(canvas.width * 0.05, canvas.height * 0.05),
        hero.healthpoint,
        mainConstants.heroTotalHealth,
        canvas.width * 0.4,
        canvas.height * 0.03,
        'Life line'
    )
    progressBar(
        ctx,
        new Point(canvas.width * 0.95 - canvas.width * 0.4, canvas.height * 0.05),
        mainConstants.waveIntervalTime-remainingTime(),
        mainConstants.waveIntervalTime,
        canvas.width * 0.4,
        canvas.height * 0.03,
        'Time remaining'
    );

    pestolObj.draw(ctx,a/50);
    a++;

}
let pestolObj :Pestol;
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
    //eventlitner
    handleEvents();
    displayAll(ctx);
    gruntType1Array.forEach(
        (obj)=>{
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


export { hero, gruntType1Array }
export default function gameMain(
    ctx: CanvasRenderingContext2D) {
    stateConstants.ingame = true;
    createType1();
    createHero();
    waveStartTime = new Date;

    pestolObj= new Pestol(
        hero.weaponPositions[0],
        false,
        10,
        pestolSprite.width*hero.width*0.01,
        pestolSprite.height*hero.width*0.01
    );
        //moving focustohero


    gameLoop(ctx);
}