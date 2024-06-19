import mapConstants from "../constants/mapConstants";
import stateConstants from "../constants/stateConstants";
import Map from "../modules/map";
import Hero from "../modules/hero";
import Point from "../modules/points";
import getRandomInt from "../util/randomNumber";
import GruntType1 from "../modules/gruntType1";
import gameMap from "../assets/map/map.png"
import { canvas } from "../main";
import progressBar from "../util/bar";
import mainConstants from "../constants/mainConstants";
import dropDownMsg from "../util/dropdownMsg";
import Pestol from "../modules/pestol";
import pestolSprite from "../sprites/pestolSprite";
import { handleEvents } from "../util/eventHandler";
import Bullet from "../modules/bullet";
import buyPannel from "./buyScreen";
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
//weaponArray

// create enemy interval
let createEnemyInterval :any;

//function to return time difference and detect end of wave
function remainingTime() {
    const remainingTimems = (new Date).getTime() - waveStartTime.getTime()
    
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
    hero.reheal();
}
//function that removes dead enemies
function removeDeadEnemy() {
    gruntType1Array = gruntType1Array.filter(
        (obj) => {
            if (obj.healthpoint < 0) {
                clearInterval(obj.attackInterval);
            }
            else {
                return true;
            }

        }
    );
}
//function that removes unnecessary bullets
function removeBullet() {
    bulletArray = bulletArray.filter(
        (obj) => {

            obj.checkOnhit(gruntType1Array);

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
    createEnemyInterval=setInterval(
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
//function creating lower inventory
function lowerInventory(ctx: CanvasRenderingContext2D) {
    const weponsNumber = 6;
    ctx.strokeStyle = "white"
    ctx.fillStyle = "rgba(40,200,40,0.1)"
    ctx.fillRect(
        -mainConstants.mapPosition.x + canvas.width * 0.2,
        -mainConstants.mapPosition.y + canvas.height * 0.8,
        canvas.width * 0.6,
        canvas.width * 0.08
    )
    ctx.strokeRect(
        -mainConstants.mapPosition.x + canvas.width * 0.2,
        -mainConstants.mapPosition.y + canvas.height * 0.8,
        canvas.width * 0.6,
        canvas.width * 0.08
    )
    ctx.fillStyle = "rgba(200,200,200,0.8)"
    for (let i = 0; i < weponsNumber; i++) {
        ctx.fillRect(
            -mainConstants.mapPosition.x + canvas.width * ((0.2 + 0.1 * i) + 0.025),
            -mainConstants.mapPosition.y + canvas.height * (0.8 + 0.03),
            canvas.width * 0.05,
            canvas.width * 0.05
        )
        if (mainConstants.weaponArray[i]) {
            ctx.drawImage(
                mainConstants.weaponArray[i]!.mysprite,
                -mainConstants.mapPosition.x + canvas.width * ((0.2 + 0.1 * i) + 0.025),
                -mainConstants.mapPosition.y + canvas.height * (0.8 + 0.03),
                canvas.width * 0.05,
                canvas.width * 0.05
            )

        }


    }

}


//function that handles all display
function displayAll(ctx: CanvasRenderingContext2D) {
    //Map background
   // console.log(gruntType1Array)
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
    if (mainConstants.dropdownInterval) {
        dropDownMsg(ctx, `wave : ${stateConstants.wave}`);
    }
    //background gradient
    const gradient = ctx.createRadialGradient(
        hero.position.x + hero.width / 2,
        hero.position.y + hero.height / 2,
        hero.width,
        hero.position.x + hero.width / 2,
        hero.position.y + hero.height / 2,
        1000

    );
    if (hero.healthpoint > 30) {

        gradient.addColorStop(0, "rgba(10,10,10,0)")
        gradient.addColorStop(1, "rgba(0,0,0,0.99)")
    }
    else {

        gradient.addColorStop(0, "rgba(10,10,10,0)")
        gradient.addColorStop(1, "rgba(200,0,0,0.99)")
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(
        -mainConstants.mapPosition.x,
        -mainConstants.mapPosition.y,
        canvas.width,
        canvas.height
    )

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
    if (remainingTime()>= mainConstants.waveIntervalTime) {
        stateConstants.wave++;
        buyPannel(ctx);

    }
    //drawing bullets
    bulletArray.forEach(
        (bulletObj) => {
            bulletObj.draw(ctx);
        }
    );

    mainConstants.weaponArray.forEach(
        (obj, i) => {
            if (obj) {

                obj.draw(ctx);
                obj.position = hero.weaponPositions[i]

            }
        }
    );

    //LowerInventory
    lowerInventory(ctx);



}
let pestolObj: Pestol;
let pestolObj2: Pestol;
let pestolObj3: Pestol;

//main Loop function
function gameLoop(
    ctx: CanvasRenderingContext2D
) {
    // clearing screen 
    ctx?.clearRect(
        -mainConstants.mapPosition.x,
        -mainConstants.mapPosition.y,
        canvas.width,
        canvas.height);
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
            pestolObj3.detectEnemy(obj)
            pestolObj2.detectEnemy(obj)
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


export { hero, gruntType1Array, bulletArray }
export default function gameMain(
    ctx: CanvasRenderingContext2D) {
    stateConstants.ingame = true;
    bulletArray=[];
    gruntType1Array=[];
    clearInterval(createEnemyInterval);
    createEnemyInterval=null;
    createType1();
    createHero();
    waveStartTime = new Date;
    //bulletArray.push(bulletObj);
    pestolObj = new Pestol(
        hero.weaponPositions[0],
        false,
        10,
        pestolSprite.width * hero.width * 0.01,
        pestolSprite.height * hero.width * 0.01
    );
    pestolObj2 = new Pestol(
        hero.weaponPositions[1],
        false,
        10,
        pestolSprite.width * hero.width * 0.01,
        pestolSprite.height * hero.width * 0.01
    );
    pestolObj3 = new Pestol(
        hero.weaponPositions[2],
        false,
        10,
        pestolSprite.width * hero.width * 0.01,
        pestolSprite.height * hero.width * 0.01
    );
    mainConstants.weaponArray[0] = (pestolObj);
    mainConstants.weaponArray[1] = (pestolObj2);
    mainConstants.weaponArray[2] = (pestolObj3);
    //moving focustohero
    mainConstants.dropdownInterval = true;
    setTimeout(
        () => { mainConstants.dropdownInterval = false; }
        ,
        5000
    );
    if (mainConstants.dropdownInterval) {
        dropDownMsg(ctx, `wave : ${stateConstants.wave}`);
    }

    //buyPannel(ctx);

    gameLoop(ctx);
}