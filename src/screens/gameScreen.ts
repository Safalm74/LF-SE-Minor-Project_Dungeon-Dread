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
import GruntType2 from "../modules/gruntType2";
import Spit from "../modules/spit";
import Gem from "../modules/gem";
import gemSprite from "../sprites/gemSprite";
import Boss from "../modules/boss";
import gameOver from "./gameoverScreen";
import aboutScreen from "./aboutScreen";
//import heroConstants from "../constants/heroCopnstants";
//loading map background
const mapImage = new Image;
mapImage.src = gameMap;
//checking time to set next wave
let waveStartTime: Date;
//spwan Type1 enemies

let gruntType1Array: (GruntType1 | GruntType2 | GruntType4)[] = [];
//Bullet array
let bulletArray: Bullet[] = [];
//gem array
let gemArray: Gem[] = [];

//Spit aray
let spitArray: Spit[] = [];
//hero obj
let hero: Hero;
//boss
let boss: Boss;
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
function collectGem() {
    gemArray = gemArray.filter(
        (obj) => {
            return obj.collected();
        }
    );
}
//function that removes dead enemies
function removeDeadEnemy() {
    gruntType1Array = gruntType1Array.filter(
        (obj) => {
            if (obj.healthpoint < 0) {
                clearInterval(obj.attackInterval);
                gemArray.push(
                    new Gem(
                        obj.position,
                        16,
                        gemSprite[1][0].width * 0.2,
                        gemSprite[1][0].height * 0.2,
                    )
                );
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

            obj.checkOnhit(gruntType1Array, boss);

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
    spitArray = spitArray.filter(
        (obj) => {
            obj.checkOnhit();

            return (
                !((obj.position.x >=
                    window.innerHeight *
                    mapConstants.mapSizeMultiplier) ||
                    (obj.position.x <=
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
                const randomNumber = getRandomInt(1, 100);
                if (stateConstants.wave > 2 && randomNumber < 40) {
                    //creating Type3 enemy
                    gruntType1Array.push(
                        new GruntType2(
                            new Point(
                                getRandomInt(mapConstants.tileSize +
                                    mapConstants.displayPosition.x,
                                    window.innerWidth * 5 -
                                    mapConstants.tileSize),
                                getRandomInt(mapConstants.tileSize +
                                    mapConstants.displayPosition.y,
                                    window.innerHeight * 5 -
                                    mapConstants.tileSize * 2)),
                            "red",
                            true,
                            gruntConstants.type2.healthPoint,
                            gruntConstants.type2.width,
                            gruntConstants.type2.height,
                            gruntConstants.type2.damage,
                            gruntConstants.type2.attackRate,
                            gruntConstants.type2.image,
                            2,
                            gruntConstants.type2.velocity

                        )
                    );

                }
                if (stateConstants.wave > 3 && randomNumber < 50) {
                    //creating Type4 enemy
                    gruntType1Array.push(
                        new GruntType4(
                            new Point(
                                getRandomInt(mapConstants.tileSize +
                                    mapConstants.displayPosition.x,
                                    window.innerWidth * 5 -
                                    mapConstants.tileSize),
                                getRandomInt(mapConstants.tileSize +
                                    mapConstants.displayPosition.y,
                                    window.innerHeight * 5 -
                                    mapConstants.tileSize * 2)),
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
                else if (stateConstants.wave > 1 && randomNumber < 60) {
                    //creating Type3 enemy
                    gruntType1Array.push(
                        new GruntType1(
                            new Point(
                                getRandomInt(mapConstants.tileSize +
                                    mapConstants.displayPosition.x,
                                    window.innerWidth * 5 -
                                    mapConstants.tileSize),
                                getRandomInt(mapConstants.tileSize +
                                    mapConstants.displayPosition.y,
                                    window.innerHeight * 5 -
                                    mapConstants.tileSize * 2)),
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
                else {
                    //creating Type1 enemy
                    gruntType1Array.push(
                        new GruntType1(
                            new Point(
                                getRandomInt(mapConstants.tileSize +
                                    mapConstants.displayPosition.x,
                                    window.innerWidth * 5 -
                                    mapConstants.tileSize),
                                getRandomInt(mapConstants.tileSize +
                                    mapConstants.displayPosition.y,
                                    window.innerHeight * 5 -
                                    mapConstants.tileSize * 2)),
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
//reset
function resetGame() {
    stateConstants.ingame = false;
    clearInterval(hero.abilityInterval);
    if (boss) {
        clearInterval(boss.attackInterval);
    }
    mainConstants.weaponArray.forEach(
        (obj) => {
            if (obj) {
                clearInterval(obj.fireInterval);
                obj.detectedEnemy = false;
                obj.trackingEnemyObj = null;
            }
        }
    );
    mainConstants.weaponArray = [];
    stateConstants.wave = 1;
    gruntType1Array.forEach((obj) => {
        if (obj) {
            clearInterval(obj.attackInterval);
        }
    });
    createHero();

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
    //drawmap
    map.draw(ctx);
    //draw enemy

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

    if (boss) {
        boss.draw(ctx);
        mainConstants.weaponArray.forEach(
            (wobj) => {
                if (wobj) {
                    wobj.detectEnemy(boss)

                }
            }
        );
        if (boss.healthpoint <= 0) {
            resetWaveChange();
            resetGame();
            aboutScreen(ctx);
        }
    }
    //draw hero
    hero.draw(ctx);
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
    //show player health
    progressBar(
        ctx,
        new Point(canvas.width * 0.05 -
            mainConstants.mapPosition.x,
            canvas.height * 0.1 -
            mainConstants.mapPosition.y),
        hero.healthpoint,
        mainConstants.heroTotalHealth,
        canvas.width * 0.45,
        canvas.height * 0.03,
        'Life line'
    )
    //show gemcount
    const gemString = `Gems: ${hero.gemCount}`
    dropDownMsg(
        ctx,
        gemString,
        new Point(
            -canvas.width * 0.4 - mainConstants.mapPosition.x,
            (canvas.height / 5 -
                mainConstants.mapPosition.y)),
        "1rem Eater"
    );
    //show essence
    progressBar(
        ctx,
        new Point(canvas.width * 0.95 -
            canvas.width * 0.4 -
            mainConstants.mapPosition.x,
            canvas.height * 0.1 -
            mainConstants.mapPosition.y),
        hero.essenceCount,
        heroConstants.maxEssence,
        canvas.width * 0.4,
        canvas.height * 0.03,
        'Essence'
    );
    //Display time remaining
    const remainingTimeString = `${Math.floor
        ((mainConstants.waveIntervalTime -
            remainingTime())
            / 1000)}`
    dropDownMsg(
        ctx,
        `${remainingTimeString}`,
        new Point(
            -(ctx.measureText(remainingTimeString).width / 2 +
                mainConstants.mapPosition.x),
            (canvas.height / 5 -
                mainConstants.mapPosition.y)),
        "0.1rem"
    );
    //changing interval
    if (remainingTime() >= mainConstants.waveIntervalTime &&
        hero.healthpoint > 0) {
        stateConstants.wave++;
        mainConstants.weaponArray.forEach(
            (obj) => {
                clearInterval(obj?.fireInterval);
            }
        );
        buyPannel(ctx);

    }
    if (hero.healthpoint <= 0) {
        resetWaveChange();
        resetGame();
        aboutScreen(ctx);
        //gameOver(ctx);
    }
    //drawing bullets
    bulletArray.forEach(
        (bulletObj) => {
            bulletObj.draw(ctx);
        }

    );
    //drawing spit
    spitArray.forEach(
        (spitObj) => {
            spitObj.draw(ctx);
        }

    );
    //drawing gems
    gemArray.forEach(
        (obj) => {
            obj.draw(ctx);
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
    //collecting gem
    collectGem();

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
    //reset sound
    mainConstants.windSound.pause();
    mainConstants.windSound.currentTime = 0
    //clearing all damages
    gruntType1Array.forEach(
        (obj) => {

            clearInterval(obj.attackInterval);
        }

    );
    if (boss) {
        clearInterval(boss.attackInterval);
        clearInterval(boss.spitInterval);
    }
    //reset health
    hero.healthpoint = mainConstants.heroTotalHealth;

    bulletArray = [];
    gruntType1Array = [];
    spitArray = [];
    gemArray = [];
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
        (obj, i) => {
            if (obj) {
                clearInterval(obj.fireInterval);
                obj.trackingEnemyObj = null;
                obj.detectedEnemy = false;
                obj.position = hero.weaponPositions[i];
            }
        }
    );

}


export { hero, gruntType1Array, bulletArray, spitArray, boss }
export default function gameMain(
    ctx: CanvasRenderingContext2D) {
    stateConstants.ingame = true;
    if (!hero) {
        createHero();
    }
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
    //creating boss
    if (stateConstants.wave >= 5) {
        boss = new Boss(new Point(
            getRandomInt(mapConstants.tileSize +
                mapConstants.displayPosition.x,
                window.innerWidth * 5 -
                mapConstants.tileSize),
            getRandomInt(mapConstants.tileSize +
                mapConstants.displayPosition.y,
                window.innerHeight * 5 -
                mapConstants.tileSize * 2)),
            "red",
            true,
            gruntConstants.boss.healthPoint,
            gruntConstants.boss.width,
            gruntConstants.boss.height,
            gruntConstants.boss.damage,
            gruntConstants.boss.attackRate,
            gruntConstants.boss.image,
            2,
            gruntConstants.boss.velocity
        );
        boss.changeSpeed();

    }
    if (!stateConstants.ismute) {
        if (mainConstants.windSound) {
            mainConstants.windSound.pause();
            mainConstants.windSound.currentTime = 0;
        }
        mainConstants.windSound.play();
    }
    gameLoop(ctx);
}