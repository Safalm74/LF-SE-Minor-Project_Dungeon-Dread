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
import { drawTouchControls, isTouchDevice } from "../util/touchControls";
import { spawnDamageNumber, drawDamageNumbers, clearDamageNumbers } from "../util/damageNumbers";
import { triggerShake, applyScreenShake } from "../util/screenShake";
import { getWaveTheme } from "../constants/waveConstants";
import { initParticles, drawParticles, triggerWaveIntro, drawWaveIntro, isIntroActive } from "../util/waveAtmosphere";
import { resetRunStats, recordKill, setRunWave } from "../util/gameStats";
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
let createEnemyInterval: ReturnType<typeof setInterval> | undefined;
// wave-themed spawn delay (ms); updated in resetWaveChange
let currentSpawnMs = 700;
// cached vignette gradient — only recreated when health threshold changes or canvas resizes
let vignetteGradient: CanvasGradient | null = null;
let vignetteIsHighHealth: boolean | null = null;
// max enemies per wave (device-aware)
const BASE_MAX_ENEMIES = isTouchDevice() ? 8 : 18;
// previous hero health for damage detection
let prevHeroHealth = -1;
// previous enemy health tracking for damage numbers and hit flash
const prevEnemyHealth = new WeakMap<object, number>();
const enemyFlashEnd = new WeakMap<object, number>();
// death particle burst
interface DeathParticle { x: number; y: number; vx: number; vy: number; life: number; color: string; }
const deathParticles: DeathParticle[] = [];
// boss enrage flag (triggered at 50% HP)
let bossEnraged = false;
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
                obj.attackInterval = undefined;
                recordKill();
                // gem value scales with wave so kills stay rewarding with fewer enemies
                const gemValue = 30 + stateConstants.wave * 15;
                gemArray.push(
                    new Gem(
                        obj.position,
                        gemValue,
                        gemSprite[1][0].width * 0.2,
                        gemSprite[1][0].height * 0.2,
                    )
                );
                // death particle burst
                const cx = obj.position.x + obj.width / 2;
                const cy = obj.position.y + obj.height / 2;
                for (let i = 0; i < 10; i++) {
                    deathParticles.push({
                        x: cx, y: cy,
                        vx: (Math.random() - 0.5) * 7,
                        vy: (Math.random() - 0.5) * 7 - 1.5,
                        life: 22 + Math.random() * 14,
                        color: i % 2 === 0 ? 'rgba(255,120,0,' : 'rgba(200,50,0,',
                    });
                }
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
            if (!isIntroActive() && gruntArray.length < mainConstants.maxEnemies) {
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
        currentSpawnMs
    );
}
function resetGame() {
    stateConstants.ingame = false;
    stateConstants.paused = false;
    clearInterval(hero.abilityInterval);
    hero.abilityInterval = undefined
    mainConstants.weaponArray = [];
    stateConstants.wave = 1;
    resetRunStats();
    gruntArray.forEach((obj) => {
        if (obj) {
            clearInterval(obj.attackInterval);
            obj.attackInterval = undefined;
        }
    });
    mainConstants.weaponArray.forEach(
        (obj) => {
            if (obj) {
                clearInterval(obj.fireInterval);
                obj.fireInterval = undefined;
                obj.detectedEnemy = false;
                obj.trackingEnemyObj = null;
            }
        }
    );
    if (boss) {
        clearInterval(boss.attackInterval);
        boss.attackInterval = undefined;
        clearInterval(boss.spitInterval);
        boss.spitInterval = undefined;
    }
    boss = null;
    createHero();
}
function drawPauseMenu(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = 'rgba(5,2,15,0.88)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const titleSize = Math.max(32, Math.min(canvas.width * 0.055, 72));
    ctx.font = `${titleSize}px ShadowOfTheDeadOver`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(180,80,255,0.9)';
    ctx.shadowBlur = 24;
    ctx.fillStyle = '#ffffff';
    ctx.fillText('PAUSED', cx, cy - titleSize * 1.1);

    const subSize = Math.max(14, Math.min(canvas.width * 0.022, 26));
    ctx.font = `${subSize}px Arial`;
    ctx.fillStyle = 'rgba(210,210,230,0.85)';
    ctx.shadowBlur = 0;
    ctx.fillText('Press  P  to resume', cx, cy + subSize * 0.5);
    ctx.fillText('Press  ESC  to return to main menu', cx, cy + subSize * 2.2);

    ctx.restore();
}
//function that handles all display
function displayAll(ctx: CanvasRenderingContext2D) {
    // apply screen shake offset
    ctx.save();
    applyScreenShake(ctx);

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
    // ambient particles (wave-themed, world space)
    drawParticles(ctx);
    //draw enemy (skip entities outside the visible viewport)
    gruntArray.forEach((obj) => {
        const sx = obj.position.x + mainConstants.mapPosition.x;
        const sy = obj.position.y + mainConstants.mapPosition.y;
        if (sx + obj.width < -50 || sx > canvas.width + 50 ||
            sy + obj.height < -50 || sy > canvas.height + 50) return;
        // track damage dealt to enemies for floating numbers and hit flash (world coords)
        const prev = prevEnemyHealth.get(obj) ?? obj.healthpoint;
        const dmg = prev - obj.healthpoint;
        if (dmg > 0) {
            spawnDamageNumber(new Point(obj.position.x + obj.width / 2, obj.position.y - 10), dmg, false);
            enemyFlashEnd.set(obj, Date.now() + 80);
        }
        prevEnemyHealth.set(obj, obj.healthpoint);
        if (obj.isSpawned) { obj.draw(ctx); } else { obj.spawn(ctx); }
        // white hit flash overlay
        if ((enemyFlashEnd.get(obj) ?? 0) > Date.now()) {
            ctx.save();
            ctx.globalCompositeOperation = 'source-atop';
            ctx.fillStyle = 'rgba(255,255,255,0.65)';
            ctx.fillRect(obj.position.x, obj.position.y, obj.width, obj.height);
            ctx.restore();
        }
    });
    if (boss) {
        // enrage at 50% HP: permanently faster and visually tinted
        if (!bossEnraged && boss.healthpoint <= 400) {
            bossEnraged = true;
            boss.velocity = new Point(3.5, 3.5);
        }
        boss.draw(ctx);
        if (bossEnraged) {
            ctx.save();
            ctx.globalCompositeOperation = 'source-atop';
            ctx.fillStyle = 'rgba(255,0,0,0.35)';
            ctx.fillRect(boss.position.x, boss.position.y, boss.width, boss.height);
            ctx.restore();
        }
        mainConstants.maxEnemies = isTouchDevice() ? 2 : 4;
        mainConstants.weaponArray.forEach((wobj) => {
            if (boss && wobj) wobj.detectEnemy(boss);
        });
        if (boss.healthpoint <= 0) {
            resetWaveChange();
            resetGame();
            loadInfoScreen(ctx, "gameWin", "<= return Home", homeScreen);
        }
    }
    //draw hero
    hero.draw(ctx);

    //drawing bullets
    bulletArray.forEach((bulletObj) => { bulletObj.draw(ctx); });
    //drawing spit
    spitArray.forEach((spitObj) => { spitObj.draw(ctx); });
    //drawing gems (with magnet pull toward hero)
    gemArray.forEach((obj) => { obj.draw(ctx); });

    mainConstants.weaponArray.forEach((obj, i) => {
        if (obj) {
            obj.draw(ctx);
            obj.position = hero.weaponPositions[i];
        }
    });

    // floating damage numbers (drawn in world space, before shake restore)
    drawDamageNumbers(ctx);

    // death particle bursts (world space)
    ctx.save();
    for (let i = deathParticles.length - 1; i >= 0; i--) {
        const p = deathParticles[i];
        const alpha = Math.min(1, p.life / 20);
        ctx.fillStyle = `${p.color}${alpha.toFixed(2)})`;
        ctx.fillRect(p.x - 3, p.y - 3, 6, 6);
        p.x += p.vx; p.y += p.vy; p.vy += 0.15; p.life--;
        if (p.life <= 0) deathParticles.splice(i, 1);
    }
    ctx.restore();

    // detect hero damage for floating numbers + screen shake
    if (prevHeroHealth >= 0 && hero.healthpoint < prevHeroHealth) {
        const dmgTaken = prevHeroHealth - hero.healthpoint;
        spawnDamageNumber(new Point(hero.position.x + hero.width / 2, hero.position.y), dmgTaken, true);
        triggerShake(dmgTaken > 10 ? 8 : 4, 10);
    }
    prevHeroHealth = hero.healthpoint;

    if (mainConstants.dropdownInterval) {
        dropDownMsg(ctx, `wave : ${stateConstants.wave}`);
    }

    // pop screen shake, back to pure map transform
    ctx.restore();

    // vignette gradient — cached; only rebuilt when health threshold or canvas size changes
    const healthHigh = hero.healthpoint > 30;
    if (vignetteGradient === null || vignetteIsHighHealth !== healthHigh) {
        vignetteIsHighHealth = healthHigh;
        const cx = canvas.width / 2, cy = canvas.height / 2;
        const outerR = Math.max(canvas.width, canvas.height) * 0.9;
        vignetteGradient = ctx.createRadialGradient(cx, cy, 60, cx, cy, outerR);
        vignetteGradient.addColorStop(0, 'rgba(0,0,0,0)');
        vignetteGradient.addColorStop(1, healthHigh ? 'rgba(0,0,0,0.97)' : 'rgba(170,0,0,0.97)');
    }
    // draw vignette + on-hit flash in screen space
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = vignetteGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (hero.onAttack) {
        ctx.fillStyle = 'rgba(255,0,0,0.18)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.restore();

    // wave intro cinematic overlay (screen space, on top of vignette)
    drawWaveIntro(ctx);

    // === HUD (drawn in screen space to avoid translation issues) ===
    const hudX = canvas.width * 0.05 - mainConstants.mapPosition.x;
    const hudY = canvas.height * 0.05 - mainConstants.mapPosition.y;

    //show player health
    progressBar(
        ctx,
        new Point(hudX, hudY + canvas.height * 0.06),
        hero.healthpoint,
        mainConstants.heroTotalHealth,
        canvas.width * 0.42,
        canvas.height * 0.028,
        'Life line'
    );
    //show essence
    progressBar(
        ctx,
        new Point(canvas.width * 0.53 - mainConstants.mapPosition.x, hudY + canvas.height * 0.06),
        hero.essenceCount,
        heroConstants.maxEssence,
        canvas.width * 0.42,
        canvas.height * 0.028,
        'Essence'
    );
    //show gemcount
    const gemString = `x ${hero.gemCount}`;
    const gemIconW = gemSprite[1][0].width * 0.28;
    const gemIconH = gemSprite[1][0].height * 0.28;
    const gemIconX = hudX;
    const gemIconY = hudY + canvas.height * 0.14;
    ctx.drawImage(
        mainConstants.gemImage,
        gemSprite[1][0].position.x, gemSprite[1][0].position.y,
        gemSprite[1][0].width, gemSprite[1][0].height,
        gemIconX, gemIconY, gemIconW, gemIconH
    );
    ctx.save();
    ctx.font = "bold 0.9rem Eater";
    ctx.fillStyle = "#ffdd55";
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 4;
    ctx.fillText(gemString, gemIconX + gemIconW + 4, gemIconY + gemIconH * 0.75);
    ctx.restore();

    //showAbilityTimer
    const abilityX = hudX + gemIconW + 80;
    const abilityY = gemIconY;
    const abilityR = gemIconH * 0.52;
    ctx.drawImage(heroConstants.sharingan, abilityX - abilityR, abilityY, abilityR * 2, abilityR * 2);
    const timeRemainingForAbility = ((new Date).getTime() - hero.abilityTime.getTime()) / (15 * 1000);
    ctx.save();
    ctx.beginPath();
    if (timeRemainingForAbility < 1 && !hero.abilityInUse) {
        ctx.fillStyle = "rgba(240,240,240,0.55)";
        ctx.arc(abilityX, abilityY + abilityR, abilityR, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * (1 - timeRemainingForAbility));
        ctx.fill();
    } else {
        ctx.strokeStyle = 'rgba(80,150,255,0.9)';
        ctx.lineWidth = 2;
        ctx.arc(abilityX, abilityY + abilityR, abilityR, 0, 2 * Math.PI);
        ctx.stroke();
    }
    ctx.restore();

    //show stamina
    if (hero.staminaUse) {
        progressBar(
            ctx,
            new Point(abilityX + abilityR * 2 + 8, gemIconY),
            hero.stamina,
            heroConstants.stamina,
            canvas.width * 0.1,
            canvas.height * 0.022,
            'Stamina',
            "0.85rem Arial"
        );
    }

    // wave timer / boss indicator
    if (!boss) {
        const secRemaining = Math.max(0, Math.floor((mainConstants.waveIntervalTime - remainingTime()) / 1000));
        const timeStr = `${secRemaining}s`;
        ctx.save();
        ctx.font = `bold ${Math.max(14, canvas.width * 0.018)}px Eater`;
        ctx.fillStyle = secRemaining <= 5 ? '#ff4444' : '#ffdd55';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0,0,0,0.9)';
        ctx.shadowBlur = 6;
        ctx.fillText(`Wave ${stateConstants.wave} · ${timeStr}`, canvas.width / 2 - mainConstants.mapPosition.x, hudY + canvas.height * 0.035);
        ctx.restore();
    } else {
        ctx.save();
        ctx.font = `bold ${Math.max(16, canvas.width * 0.02)}px Eater`;
        ctx.fillStyle = '#ff3333';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(255,0,0,0.8)';
        ctx.shadowBlur = 10;
        ctx.fillText('⚠ FINAL WAVE ⚠', canvas.width / 2 - mainConstants.mapPosition.x, hudY + canvas.height * 0.035);
        ctx.restore();
    }

    //changing interval
    if (remainingTime() >= mainConstants.waveIntervalTime &&
        hero.healthpoint > 0 &&
        !boss
    ) {
        stateConstants.wave++;
        mainConstants.weaponArray.forEach((obj) => {
            if (obj) {
                clearInterval(obj.fireInterval);
                obj.fireInterval = undefined;
            }
        });
        resetWaveChange();
        buyPannel(ctx);
    }

    if (hero.healthpoint <= 0) {
        resetWaveChange();
        resetGame();
        loadInfoScreen(ctx, "gameOver", "<= return Home", homeScreen);
    }

    //LowerInventory
    lowerInventory(ctx);
    //Virtual touch controls (only renders on touch devices)
    drawTouchControls(ctx);
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

    if (stateConstants.paused) {
        drawPauseMenu(ctx);
    } else {
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
    }
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
            obj.attackInterval = undefined;
        }
    );
    if (boss) {
        clearInterval(boss.attackInterval);
        clearInterval(boss.spitInterval);
        boss.attackInterval = undefined;
        boss.spitInterval = undefined;
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
    createEnemyInterval = undefined;
    //assigning new time
    waveStartTime = new Date;
    //scale enemy count with wave (capped per device type)
    mainConstants.maxEnemies = Math.min(
        BASE_MAX_ENEMIES + stateConstants.wave * 2,
        isTouchDevice() ? 18 : 35
    );
    //invalidate cached gradient so it rebuilds at wave start
    vignetteGradient = null;
    vignetteIsHighHealth = null;
    prevHeroHealth = -1;
    clearDamageNumbers();
    // apply wave-themed map, particles, and intro cinematic
    const theme = getWaveTheme(stateConstants.wave);
    currentSpawnMs = theme.enemySpawnMs;
    map.reinitialize(theme);
    initParticles(theme);
    triggerWaveIntro(theme);
    setRunWave(stateConstants.wave);
    bossEnraged = false;
    deathParticles.length = 0;
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
                obj.fireInterval = undefined
                obj.trackingEnemyObj = null;
                obj.detectedEnemy = false;
                obj.position = hero.weaponPositions[i];
            }
        }
    );
}
export { hero, gruntArray, bulletArray, spitArray, boss }
export function quitToHome(ctx: CanvasRenderingContext2D) {
    resetWaveChange();
    resetGame();
    homeScreen(ctx);
}
export function invalidateGradientCache() {
    vignetteGradient = null;
    vignetteIsHighHealth = null;
}
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
            boss.attackInterval = undefined;
            clearInterval(boss.spitInterval);
            boss.spitInterval = undefined;
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
                    obj.fireInterval = undefined;
                    obj.detectedEnemy = false;
                    obj.trackingEnemyObj = null;
                }
            }
        );
        gameLoop(ctx);
    }
}