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
import { handleEvents } from "../util/eventHandler";
import Bullet from "../modules/bullet";
import buyPannel from "./buyScreen";
import heroConstants from "../constants/heroConstants";
import gunConstants from "../constants/gunConstants";
import gruntConstants from "../constants/gruntConstants";
import GruntType4 from "../modules/gruntType4";
import gruntType4Sprite from "../sprites/grunt[Type4]Sprite";
//import heroConstants from "../constants/heroCopnstants";
//loading map background
const mapImage = new Image;
mapImage.src = gameMap;
//checking time to set next wave
let waveStartTime: Date;
//spwan Type1 enemies
let gruntType1Array: (GruntType1|GruntType4)[] = [];
//Bullet array
let bulletArray: Bullet[] = [];
//hero obj
let hero: Hero;
//weaponArray

// create enemy interval
let createEnemyInterval: any;

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
        mainConstants.heroTotalHealth,
        heroConstants.width,
        heroConstants.height
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
    createEnemyInterval = setInterval(
        () => {
            if (gruntType1Array.length < mainConstants.maxEnemies) {
                const randomNumber=getRandomInt(1,100);
                if ( 1 && randomNumber<50){
                    //creating Type3 enemy
                    gruntType1Array.push(
                        new GruntType4(
                            new Point(
                                getRandomInt(mapConstants.tileSize + mapConstants.displayPosition.x, window.innerWidth * 5 - mapConstants.tileSize),
                                getRandomInt(mapConstants.tileSize + mapConstants.displayPosition.y, window.innerHeight * 5 - mapConstants.tileSize * 2)),
                            "red",
                            true,
                            gruntConstants.type4.healthPoint,
                            gruntConstants.type4.width,
                            gruntConstants.type4.height,
                            gruntConstants.type4.damage,
                            gruntConstants.type4.attackRate,
                            gruntConstants.type4.image,
                            4,
                            gruntConstants.type4.velocity
                            
                        )
                    );

                }
                else if ( stateConstants.wave>1&& randomNumber<60){
                    //creating Type3 enemy
                    gruntType1Array.push(
                        new GruntType1(
                            new Point(
                                getRandomInt(mapConstants.tileSize + mapConstants.displayPosition.x, window.innerWidth * 5 - mapConstants.tileSize),
                                getRandomInt(mapConstants.tileSize + mapConstants.displayPosition.y, window.innerHeight * 5 - mapConstants.tileSize * 2)),
                            "red",
                            true,
                            gruntConstants.type3.healthPoint,
                            gruntConstants.type3.width,
                            gruntConstants.type3.height,
                            gruntConstants.type3.damage,
                            gruntConstants.type3.attackRate,
                            gruntConstants.type3.image,
                            3,
                            gruntConstants.type3.velocity
                            
                        )
                    );

                }
                else{
                    //creating Type1 enemy
                    gruntType1Array.push(
                        new GruntType1(
                            new Point(
                                getRandomInt(mapConstants.tileSize + mapConstants.displayPosition.x, window.innerWidth * 5 - mapConstants.tileSize),
                                getRandomInt(mapConstants.tileSize + mapConstants.displayPosition.y, window.innerHeight * 5 - mapConstants.tileSize * 2)),
                            "red",
                            true,
                            gruntConstants.type1.healthPoint,
                            gruntConstants.type1.width,
                            gruntConstants.type1.height,
                            gruntConstants.type1.damage,
                            gruntConstants.type1.attackRate,
                            gruntConstants.type1.image,
                            1,
                            gruntConstants.type1.velocity
                            
                        )
                    );
                }
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
                mainConstants.weaponArray[i]!.gunImage,
                -mainConstants.mapPosition.x + canvas.width * ((0.2 + 0.1 * i) + 0.025),
                -mainConstants.mapPosition.y + canvas.height * (0.8 + 0.03),
                canvas.width * 0.05,
                canvas.width * 0.05
            )

        }


    }

}
let a=0;

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
    if (remainingTime() >= mainConstants.waveIntervalTime) {
        stateConstants.wave++;
        mainConstants.weaponArray.forEach(
            (obj)=>{
                clearInterval(obj?.fireInterval);
            }
        );
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
    a++
    const position=Math.floor(a/5)%4
    // ctx.drawImage(
    //     gruntConstants.type3.image,
    //     gruntType4Sprite.positionRight[position].x,
    //     gruntType4Sprite.positionRight[position].y,
    //     gruntType4Sprite.width,
    //     gruntType4Sprite.height,
    //     100,100,
    //     gruntType4Sprite.width,
    //     gruntType4Sprite.height
    // );
    


}

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
            mainConstants.weaponArray.forEach(
                (wobj) => {
                    if (wobj) {
                        wobj.detectEnemy(obj)

                    }

                }
            );
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
function resetWaveChange() {
    //clearing all damages
    gruntType1Array.forEach(
        (obj) => {

            clearInterval(obj.attackInterval);

        }

    );
    //reset health
    hero.healthpoint=mainConstants.heroTotalHealth;

    bulletArray = [];
    gruntType1Array = [];
    clearInterval(createEnemyInterval);
    createEnemyInterval = null;
    waveStartTime = new Date;
    //if player has no gun
    if (!mainConstants.weaponArray[0]) {
        mainConstants.weaponArray[0] = new Pestol(
            hero.weaponPositions[0],
            false,
            gunConstants.pistol.damage,
            gunConstants.pistol.width,
            gunConstants.pistol.height,
            gunConstants.pistol.fireRate,
            gunConstants.pistol.cost,
            gunConstants.pistol.image,
            "pistol"
        );
    }
    //clearing all shootings
    mainConstants.weaponArray.forEach(
        (obj) => {
            if (obj) {
                clearInterval(obj.fireInterval);
            }
        }
    );

}


export { hero, gruntType1Array, bulletArray }
export default function gameMain(
    ctx: CanvasRenderingContext2D) {
    stateConstants.ingame = true;

    createHero();
    resetWaveChange();

    createType1();

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

   // buyPannel(ctx);
    ``
    gameLoop(ctx);
}