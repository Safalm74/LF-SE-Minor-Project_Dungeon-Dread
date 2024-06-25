//modules
import Map from "../modules/map";
import Hero from "../modules/hero";
import Point from "../modules/points";
import GruntType1and3 from "../modules/gruntType1and3";
import Bullet from "../modules/bullet";
import GruntType4 from "../modules/gruntType4";
import GruntType2 from "../modules/gruntType2";
import Spit from "../modules/spit";
import Gem from "../modules/gem";
import Boss from "../modules/boss";
import Gun from "../modules/gun";
//constants
import mapConstants from "../constants/mapConstants";
import stateConstants from "../constants/stateConstants";
import mainConstants from "../constants/mainConstants";
import heroConstants from "../constants/heroConstants";
import gunConstants from "../constants/gunConstants";
import gruntConstants from "../constants/gruntConstants";
//utils
import getRandomInt from "../util/randomNumber";
import progressBar from "../util/bar";
import dropDownMsg from "../util/dropdownMsg";
import { handleEvents } from "../util/eventHandler";
import loadInfoScreen from "../util/infoScreenLoader";
import lowerInventory from "../util/lowerInventory";
//sprite information
import gemSprite from "../sprites/gemSprite";
//objs
import { canvas } from "../main";
//screens
import buyPannel from "./buyScreen";
import homeScreen from "./homeScreen";
//checking time to set next wave
let waveStartTime: Date;
//enemy array
let gruntArray: (GruntType1and3 | GruntType2 | GruntType4)[] = [];
//Bullet array
let bulletArray: Bullet[] = [];
//gem array
let gemArray: Gem[] = [];
//Spit aray
let spitArray: Spit[] = [];
//hero obj
let hero: Hero;
//boss
let boss: Boss | null;
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
    gruntArray = gruntArray.filter(
        (obj) => {
            if (obj.healthpoint < 0) {
                clearInterval(obj.attackInterval);
                obj.attackInterval = null;
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
            obj.checkOnhit(gruntArray, boss);
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
function createEnemy() {
    createEnemyInterval = setInterval(
        () => {
            if (gruntArray.length < mainConstants.maxEnemies) {
                const randomNumber = getRandomInt(1, 100);
                if (stateConstants.wave > 2 && randomNumber < 40) {
                    //creating Type3 enemy
                    gruntArray.push(
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
                    gruntArray.push(
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
                    gruntArray.push(
                        new GruntType1and3(
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
                    gruntArray.push(
                        new GruntType1and3(
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
function resetGame() {
    stateConstants.ingame = false;
    clearInterval(hero.abilityInterval);
    hero.abilityInterval = null
    mainConstants.weaponArray = [];
    stateConstants.wave = 1;
    gruntArray.forEach((obj) => {
        if (obj) {
            clearInterval(obj.attackInterval);
            obj.attackInterval = null;
        }
    });
    mainConstants.weaponArray.forEach(
        (obj) => {
            if (obj) {
                clearInterval(obj.fireInterval);
                obj.fireInterval = null;
                obj.detectedEnemy = false;
                obj.trackingEnemyObj = null;
            }
        }
    );
    if (boss) {
        clearInterval(boss.attackInterval);
        boss.attackInterval = null;
        clearInterval(boss.spitInterval);
        boss.spitInterval = null;
    }
    boss = null;
    createHero();
}
//function that handles all display
function displayAll(ctx: CanvasRenderingContext2D) {
    //Map background
    ctx.drawImage(
        mapConstants.mapImage,
        mapConstants.displayPosition.x,
        mapConstants.displayPosition.y,
        window.innerWidth * mapConstants.mapSizeMultiplier,
        window.innerHeight * mapConstants.mapSizeMultiplier
    );
    //drawmap
    map.draw(ctx);
    //draw enemy
    gruntArray.forEach(
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
        mainConstants.maxEnemies = 50
        mainConstants.weaponArray.forEach(
            (wobj) => {
                if (boss && wobj) {
                    wobj.detectEnemy(boss)
                }
            }
        );
        if (boss.healthpoint <= 0) {
            resetWaveChange();
            resetGame();
            loadInfoScreen(
                ctx,
                "gameWin",
                "<= return Home",
                homeScreen
            );
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
    }1
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
    const gemString = `x ${hero.gemCount}`
    ctx.drawImage(
        mainConstants.gemImage,
        gemSprite[1][0].position.x,
        gemSprite[1][0].position.y,
        gemSprite[1][0].width,
        gemSprite[1][0].height,
        canvas.width * 0.05 - mainConstants.mapPosition.x,
        (canvas.height / 5 -
            mainConstants.mapPosition.y),
        gemSprite[1][0].width * 0.3,
        gemSprite[1][0].height * 0.3
    );
    ctx.font = "1rem Eater"
    ctx.fillStyle = "white"
    const textMeasure = ctx.measureText(gemString);
    const textHeight = textMeasure.actualBoundingBoxAscent + textMeasure.actualBoundingBoxDescent;
    ctx.fillText(
        gemString,
        canvas.width * 0.05 - mainConstants.mapPosition.x + gemSprite[1][0].width * 0.5,
        (canvas.height / 5 -
            mainConstants.mapPosition.y) + textHeight * 1.5,
    );
    //showAbilityTimer
    ctx.drawImage(
        heroConstants.sharingan,
        canvas.width * 0.05 - mainConstants.mapPosition.x,
        (canvas.height / 5 -
            mainConstants.mapPosition.y) + gemSprite[1][0].height * 0.5,
        gemSprite[1][0].width * 0.4,
        gemSprite[1][0].height * 0.4
    );
    const timeRemainingForAbility = ((new Date).getTime() - hero.abilityTime.getTime()) / (15 * 1000);
    if (timeRemainingForAbility < 1 && !hero.abilityInUse) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(240,240,240,0.6)"
        ctx.arc(
            (canvas.width * 0.05 - mainConstants.mapPosition.x) + gemSprite[1][0].width * 0.2,
            (canvas.height / 5 - mainConstants.mapPosition.y) + gemSprite[1][0].height * 0.5 + gemSprite[1][0].height * 0.2,
            gemSprite[1][0].width * 0.2,
            0,
            2 * Math.PI * (1 - timeRemainingForAbility)
        );
        ctx.fill();
    } else {
        ctx.beginPath();
        ctx.strokeStyle = 'blue';
        ctx.fillStyle = "rgba(240,240,240,0.6)"
        ctx.arc(
            (canvas.width * 0.05 - mainConstants.mapPosition.x) + gemSprite[1][0].width * 0.2,
            (canvas.height / 5 - mainConstants.mapPosition.y) + gemSprite[1][0].height * 0.5 + gemSprite[1][0].height * 0.2,
            gemSprite[1][0].width * 0.2,
            0,
            2 * Math.PI
        );
        ctx.stroke();
    }
    //show stamina
    if (hero.staminaUse) {
        progressBar(
            ctx,
            new Point(canvas.width * 0.05 -
                mainConstants.mapPosition.x,
                (canvas.height / 5 - mainConstants.mapPosition.y) + gemSprite[1][0].height * 1.5),
            hero.stamina,
            heroConstants.stamina,
            canvas.width * 0.1,
            canvas.height * 0.02,
            'Stamina',
            "1rem Arial"
        )
    }
    //check hero on attack
    if (hero.onAttack){
        const gradientOnAttack = ctx.createRadialGradient(
        hero.position.x + hero.width / 2,
        hero.position.y + hero.height / 2,
        hero.width,
        hero.position.x + hero.width / 2,
        hero.position.y + hero.height / 2,
        1000
    );
    gradientOnAttack.addColorStop(0, "rgba(10,10,10,0)")
    ctx.fillStyle = gradient;
    ctx.fillRect(
        -mainConstants.mapPosition.x,
        -mainConstants.mapPosition.y,
        canvas.width,
        canvas.height
    )
    }
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
    //changing interval
    if (remainingTime() >= mainConstants.waveIntervalTime &&
        hero.healthpoint > 0 &&
        !boss
    ) {
        stateConstants.wave++;
        mainConstants.weaponArray.forEach(
            (obj) => {
                if (obj) {
                    clearInterval(obj.fireInterval);
                    obj.fireInterval = null
                }
            }
        );
        resetWaveChange();
        buyPannel(ctx);

    }
    if (!boss) {
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
    }
    else {
        dropDownMsg(
            ctx,
            `Final Wave`,
            new Point(
                -(ctx.measureText('Final Wave').width / 2 +
                    mainConstants.mapPosition.x),
                (canvas.height / 5 -
                    mainConstants.mapPosition.y)),
            "0.1rem"
        );
    }
    if (hero.healthpoint <= 0) {
        resetWaveChange();
        resetGame();
        loadInfoScreen(
            ctx,
            "gameOver",
            "<= return Home",
            homeScreen
        );
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
    mainConstants.maxEnemies = 500
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
    gruntArray.forEach(
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
    gruntArray.forEach(
        (obj) => {
            clearInterval(obj.attackInterval);
            obj.attackInterval = null;
        }
    );
    if (boss) {
        clearInterval(boss.attackInterval);
        clearInterval(boss.spitInterval);
        boss.attackInterval = null;
        boss.spitInterval = null;
    }
    //reset health
    hero.healthpoint = mainConstants.heroTotalHealth;

    //clearing all arrays
    bulletArray = [];
    gruntArray = [];
    spitArray = [];
    gemArray = [];
    //clearing creating enemy
    clearInterval(createEnemyInterval);
    createEnemyInterval = null;
    //assigning new time
    waveStartTime = new Date;
    //if player has no gun
    if (!mainConstants.weaponArray[0]) {
        mainConstants.weaponArray[0] = new Gun(
            hero.weaponPositions[0],
            false,
            gunConstants.pistol.damage,
            gunConstants.pistol.width,
            gunConstants.pistol.height,
            gunConstants.pistol.fireRate,
            gunConstants.pistol.cost,
            gunConstants.pistol.image,
            "pistol",
            new Audio(gunConstants.pistol.soundSrc)
        );
    }
    //clearing all shootings
    mainConstants.weaponArray.forEach(
        (obj, i) => {
            if (obj) {
                clearInterval(obj.fireInterval);
                obj.fireInterval = null
                obj.trackingEnemyObj = null;
                obj.detectedEnemy = false;
                obj.position = hero.weaponPositions[i];
            }
        }
    );
}
export { hero, gruntArray, bulletArray, spitArray, boss }
export default function gameMain(
    ctx: CanvasRenderingContext2D) {
    if (!stateConstants.infoScreenFlag) {
        stateConstants.ingame = true;
        if (!hero) {
            createHero();
        }
        resetWaveChange();
        createEnemy();
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

        if (boss) {
            clearInterval(boss.attackInterval);
            boss.attackInterval = null;
            clearInterval(boss.spitInterval);
            boss.spitInterval = null;
        }
        boss = null;
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
            mainConstants.maxEnemies = 50;
            boss.changeSpeed();
        }
        if (!stateConstants.ismute) {
            if (mainConstants.windSound) {
                mainConstants.windSound.pause();
                mainConstants.windSound.currentTime = 0;
            }
            mainConstants.windSound.play();
        }
        mainConstants.weaponArray.forEach(
            (obj) => {
                if (obj) {
                    clearInterval(obj.fireInterval);
                    obj.fireInterval = null;
                    obj.detectedEnemy = false;
                    obj.trackingEnemyObj = null;
                }
            }
        );
        gameLoop(ctx);
    }
}