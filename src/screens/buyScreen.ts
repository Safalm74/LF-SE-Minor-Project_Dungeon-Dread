//modules
import Point from "../modules/points";
import Gun from "../modules/gun";
//constants
import gunConstants from "../constants/gunConstants";
import mainConstants from "../constants/mainConstants";
import stateConstants from "../constants/stateConstants";
//utils
import lowerInventory from "../util/lowerInventory";
import progressBar from "../util/bar";
//sprite information
import pistolSprite from "../sprites/pistolSprite";
import smgSprite from "../sprites/smgSprite";
import vandalSprite from "../sprites/vandalSprite";
import hunterSprite from "../sprites/hunterSprite";
//objs
import { canvas } from "../main";
//screens
import gameMain, { hero } from "./gameScreen";

//variables
let buyStartTime: Date;
let selectedPosition: number = 0;
// close button hit rect — updated each frame
let closeBtnRect = { x: 0, y: 0, w: 0, h: 0 };
// mouse pos for hover (single listener added once)
let mouseX = 0;
let mouseY = 0;
let buyMouseListenerAdded = false;
let hoveredCard = -1;

function addBuyMouseListener() {
    if (buyMouseListenerAdded) return;
    buyMouseListenerAdded = true;
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
}

function remainingTime() {
    return (new Date).getTime() - buyStartTime.getTime();
}

function checkCollision(
    cursorPosition: Point,
    BtnPosition: Point,
    size: Point
) {
    const cx = cursorPosition.x - mainConstants.mapPosition.x;
    const cy = cursorPosition.y - mainConstants.mapPosition.y;
    return (
        cx > BtnPosition.x &&
        cx < BtnPosition.x + size.x &&
        cy > BtnPosition.y &&
        cy < BtnPosition.y + size.y
    );
}

function closeBuyScreen(ctx: CanvasRenderingContext2D) {
    mainConstants.weaponArray.forEach((obj, i) => {
        if (obj) obj.position = hero.weaponPositions[i];
    });
    stateConstants.buyScreenFlag = false;
    gameMain(ctx);
}

let buyBtnsclicked = (ClickedPosition: Point) => {
    // Close / skip button
    const cx = ClickedPosition.x - mainConstants.mapPosition.x;
    const cy = ClickedPosition.y - mainConstants.mapPosition.y;
    if (
        cx > closeBtnRect.x && cx < closeBtnRect.x + closeBtnRect.w &&
        cy > closeBtnRect.y && cy < closeBtnRect.y + closeBtnRect.h
    ) {
        // will be handled in loop via flag — set a global flag
        stateConstants.buyScreenFlag = false;
        return;
    }

    // Inventory slot selection
    for (let i = 0; i < 6; i++) {
        const hit = checkCollision(
            ClickedPosition,
            new Point(
                -mainConstants.mapPosition.x + canvas.width * ((0.2 + 0.1 * i) + 0.025),
                -mainConstants.mapPosition.y + canvas.height * (0.8 + 0.03)
            ),
            new Point(canvas.width * 0.05, canvas.width * 0.05)
        );
        if (hit) { selectedPosition = i; break; }
    }

    // Weapon card purchase
    const panelX = canvas.width * 0.08 - mainConstants.mapPosition.x;
    const panelY = canvas.height * 0.12 - mainConstants.mapPosition.y;
    const panelW = canvas.width * 0.84;
    const panelH = canvas.height * 0.58;
    const cardW = panelW / 4;

    for (let i = 0; i < 4; i++) {
        const hit = checkCollision(
            ClickedPosition,
            new Point(panelX + cardW * i, panelY),
            new Point(cardW, panelH)
        );
        if (!hit) continue;

        const guns = [gunConstants.pistol, gunConstants.smg, gunConstants.vandal, gunConstants.hunter];
    const names: ('pistol' | 'smg' | 'vandal' | 'hunter')[] = ['pistol', 'smg', 'vandal', 'hunter'];
        const g = guns[i];
        if (hero.gemCount >= g.cost) {
            mainConstants.weaponArray[selectedPosition] = new Gun(
                hero.weaponPositions[selectedPosition],
                false,
                g.damage,
                g.width,
                g.height,
                g.fireRate,
                g.cost,
                g.image,
                names[i],
                new Audio(g.soundSrc)
            );
            hero.gemCount -= g.cost;
        } else {
            if (mainConstants.denySound) {
                mainConstants.denySound.pause();
                mainConstants.denySound.currentTime = 0;
            }
            mainConstants.denySound.play();
        }
        // advance to next empty slot
        for (let j = 0; j < mainConstants.weaponArray.length; j++) {
            selectedPosition = j;
            if (!mainConstants.weaponArray[j]) break;
        }
        break;
    }
};

function upgradeWeapon() {
    const w = mainConstants.weaponArray[selectedPosition];
    if (w && w.level < 3 && hero.gemCount >= w.cost * 1.1) {
        w.damage += w.damage * 0.1;
        w.fireRate += w.fireRate * 0.1;
        w.level++;
        hero.gemCount -= w.cost * 0.1;
    } else {
        if (mainConstants.denySound) {
            mainConstants.denySound.pause();
            mainConstants.denySound.currentTime = 0;
        }
        mainConstants.denySound.play();
    }
}

const WEAPONS = [
    {
        key: 'pistol' as const,
        sprite: () => pistolSprite.positionRight[0],
        spriteW: pistolSprite.width,
        spriteH: pistolSprite.height,
        label: 'Pistol',
        desc: 'Reliable sidearm',
    },
    {
        key: 'smg' as const,
        sprite: () => smgSprite.positionRight[0],
        spriteW: smgSprite.width,
        spriteH: smgSprite.height,
        label: 'SMG',
        desc: 'High fire rate',
    },
    {
        key: 'vandal' as const,
        sprite: () => vandalSprite.positionRight[0],
        spriteW: vandalSprite.width,
        spriteH: vandalSprite.height,
        label: 'Vandal',
        desc: 'Burst rifle',
    },
    {
        key: 'hunter' as const,
        sprite: () => hunterSprite.positionRight[0],
        spriteH: hunterSprite.height,
        spriteW: hunterSprite.width,
        label: 'Hunter',
        desc: 'Sniper power',
    },
];

function drawWeaponCard(
    ctx: CanvasRenderingContext2D,
    index: number,
    x: number, y: number,
    w: number, h: number,
    hovered: boolean
) {
    const wep = WEAPONS[index];
    const gc = gunConstants[wep.key];
    const canAfford = hero.gemCount >= gc.cost;

    ctx.save();

    // card background
    const bgAlpha = hovered ? 0.28 : 0.18;
    ctx.fillStyle = canAfford
        ? `rgba(30,40,60,${bgAlpha})`
        : `rgba(60,20,20,${bgAlpha})`;
    ctx.beginPath();
    ctx.roundRect(x + 4, y + 4, w - 8, h - 8, 10);
    ctx.fill();

    // card border
    ctx.beginPath();
    ctx.roundRect(x + 4, y + 4, w - 8, h - 8, 10);
    ctx.strokeStyle = hovered
        ? 'rgba(255,200,60,0.8)'
        : canAfford
            ? 'rgba(100,180,255,0.35)'
            : 'rgba(200,60,60,0.35)';
    ctx.lineWidth = hovered ? 2 : 1;
    ctx.stroke();

    // weapon image
    const imgSize = Math.min(w * 0.45, h * 0.28);
    const imgX = x + w / 2 - imgSize / 2;
    const imgY = y + h * 0.08;
    ctx.drawImage(
        gc.image,
        wep.sprite().x, wep.sprite().y,
        wep.spriteW, wep.spriteH,
        imgX, imgY, imgSize, imgSize
    );

    // name
    const nameFontSize = Math.max(11, Math.min(w * 0.12, 22));
    ctx.font = `bold ${nameFontSize}px Eater`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = canAfford ? '#ffffff' : '#cc6666';
    ctx.shadowColor = 'rgba(0,0,0,0.9)';
    ctx.shadowBlur = 4;
    ctx.fillText(wep.label, x + w / 2, imgY + imgSize + h * 0.04);

    // desc
    const descFontSize = Math.max(8, Math.min(w * 0.075, 13));
    ctx.font = `${descFontSize}px Arial`;
    ctx.fillStyle = 'rgba(180,180,180,0.85)';
    ctx.fillText(wep.desc, x + w / 2, imgY + imgSize + h * 0.04 + nameFontSize + 4);

    // stats
    const statFontSize = Math.max(9, Math.min(w * 0.08, 14));
    ctx.font = `${statFontSize}px Arial`;
    ctx.fillStyle = 'rgba(200,220,255,0.9)';
    const statsY = imgY + imgSize + h * 0.22;
    const lineH = statFontSize * 1.5;
    ctx.fillText(`DMG  ${gc.damage}`, x + w / 2, statsY);
    ctx.fillText(`ROF  ${gc.fireRate}/s`, x + w / 2, statsY + lineH);

    // cost badge
    const badgeY = y + h - h * 0.18;
    const badgeFontSize = Math.max(10, Math.min(w * 0.1, 18));
    ctx.font = `bold ${badgeFontSize}px Eater`;
    ctx.fillStyle = canAfford ? '#ffd700' : '#ff6666';
    ctx.shadowColor = canAfford ? 'rgba(255,200,0,0.7)' : 'rgba(255,0,0,0.5)';
    ctx.shadowBlur = 6;
    ctx.fillText(`💎 ${gc.cost}`, x + w / 2, badgeY);

    // unaffordable dim overlay
    if (!canAfford) {
        ctx.beginPath();
        ctx.roundRect(x + 4, y + 4, w - 8, h - 8, 10);
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fill();
    }

    ctx.restore();
}

function drawCloseButton(ctx: CanvasRenderingContext2D, panelRight: number, panelTop: number) {
    const btnW = Math.max(90, canvas.width * 0.08);
    const btnH = Math.max(32, canvas.height * 0.042);
    const btnX = panelRight - btnW - 8;
    const btnY = panelTop - btnH - 6;

    // check hover
    const mx = mouseX - mainConstants.mapPosition.x;
    const my = mouseY - mainConstants.mapPosition.y;
    const hovered = mx > btnX && mx < btnX + btnW && my > btnY && my < btnY + btnH;

    // store hit rect for click detection
    closeBtnRect = { x: btnX, y: btnY, w: btnW, h: btnH };

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(btnX, btnY, btnW, btnH, btnH / 2);
    ctx.fillStyle = hovered ? 'rgba(220,50,50,0.85)' : 'rgba(160,30,30,0.65)';
    ctx.fill();
    ctx.strokeStyle = hovered ? 'rgba(255,120,120,0.9)' : 'rgba(200,80,80,0.5)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.font = `bold ${Math.max(10, btnH * 0.38)}px Eater`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 4;
    ctx.fillText('✕  SKIP', btnX + btnW / 2, btnY + btnH / 2);
    ctx.restore();

    return hovered;
}

function buyPannelLoop(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(
        -mainConstants.mapPosition.x,
        -mainConstants.mapPosition.y,
        canvas.width,
        canvas.height
    );

    // ESC key = skip
    if (stateConstants.btnPressed['escape']) {
        closeBuyScreen(ctx);
        return;
    }

    // full-screen dark overlay
    ctx.save();
    ctx.fillStyle = 'rgba(5,3,18,0.88)';
    ctx.fillRect(-mainConstants.mapPosition.x, -mainConstants.mapPosition.y, canvas.width, canvas.height);
    ctx.restore();

    const panelX = canvas.width * 0.08 - mainConstants.mapPosition.x;
    const panelY = canvas.height * 0.12 - mainConstants.mapPosition.y;
    const panelW = canvas.width * 0.84;
    const panelH = canvas.height * 0.58;

    // panel background
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(panelX, panelY, panelW, panelH, 14);
    ctx.fillStyle = 'rgba(10,12,28,0.82)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(80,120,200,0.35)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    // title
    const titleFontSize = Math.max(18, Math.min(canvas.width * 0.032, 48));
    ctx.save();
    ctx.font = `${titleFontSize}px ShadowOfTheDeadOver`;
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline = 'bottom';
    ctx.shadowColor = 'rgba(100,160,255,0.8)';
    ctx.shadowBlur = 12;
    ctx.fillText('ARMORY', panelX + 12, panelY - 8);
    ctx.restore();

    // gem count (top right of panel)
    const gemFontSize = Math.max(12, Math.min(canvas.width * 0.022, 26));
    ctx.save();
    ctx.font = `bold ${gemFontSize}px Eater`;
    ctx.fillStyle = '#ffd700';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.shadowColor = 'rgba(255,200,0,0.7)';
    ctx.shadowBlur = 8;
    ctx.fillText(`💎  ${hero.gemCount}`, panelX + panelW - 8, panelY - 8);
    ctx.restore();

    // close/skip button
    drawCloseButton(ctx, panelX + panelW, panelY);

    // hover detection for cards (screen-space mouse converted to canvas coords)
    const cardW = panelW / 4;
    hoveredCard = -1;
    const mx = mouseX - mainConstants.mapPosition.x;
    const my = mouseY - mainConstants.mapPosition.y;
    for (let i = 0; i < 4; i++) {
        if (
            mx > panelX + cardW * i && mx < panelX + cardW * (i + 1) &&
            my > panelY && my < panelY + panelH
        ) {
            hoveredCard = i;
            break;
        }
    }

    // draw weapon cards
    for (let i = 0; i < 4; i++) {
        drawWeaponCard(
            ctx, i,
            panelX + cardW * i, panelY,
            cardW, panelH,
            hoveredCard === i
        );
    }

    // wave label
    const waveFontSize = Math.max(10, Math.min(canvas.width * 0.016, 20));
    ctx.save();
    ctx.font = `${waveFontSize}px Eater`;
    ctx.fillStyle = 'rgba(200,200,200,0.7)';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(`Next: Wave ${stateConstants.wave}`, panelX + 4, panelY + panelH + 8);
    ctx.restore();

    // upgrade hint
    ctx.save();
    ctx.font = `${waveFontSize}px Eater`;
    ctx.fillStyle = 'rgba(180,220,255,0.7)';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillText('Press  U  to upgrade selected weapon', panelX + panelW - 4, panelY + panelH + 8);
    ctx.restore();

    // buy time progress bar
    const timeLeft = Math.max(0, mainConstants.buyTime - remainingTime());
    progressBar(
        ctx,
        new Point(panelX, canvas.height * 0.76 - mainConstants.mapPosition.y),
        timeLeft,
        mainConstants.buyTime,
        panelW,
        canvas.height * 0.018,
        'Time remaining'
    );

    // lower inventory
    lowerInventory(ctx);

    // selected slot highlight
    ctx.save();
    ctx.strokeStyle = 'rgba(255,215,0,0.9)';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = 'rgba(255,200,0,0.7)';
    ctx.shadowBlur = 8;
    ctx.strokeRect(
        -mainConstants.mapPosition.x + canvas.width * ((0.2 + 0.1 * selectedPosition) + 0.025),
        -mainConstants.mapPosition.y + canvas.height * (0.8 + 0.03),
        canvas.width * 0.05,
        canvas.width * 0.05
    );
    ctx.restore();

    // time-up or skip → go to game
    if (remainingTime() >= mainConstants.buyTime || !stateConstants.buyScreenFlag) {
        closeBuyScreen(ctx);
        return;
    }

    if (!stateConstants.ingame) {
        requestAnimationFrame(() => { buyPannelLoop(ctx); });
    }
}

export { buyBtnsclicked, upgradeWeapon }
export default function buyPannel(ctx: CanvasRenderingContext2D) {
    ctx.translate(-mainConstants.mapPosition.x, -mainConstants.mapPosition.y);
    mainConstants.mapPosition = new Point(0, 0);
    stateConstants.ingame = false;
    stateConstants.buyScreenFlag = true;
    buyStartTime = new Date;
    selectedPosition = 0;
    for (let i = 0; i < mainConstants.weaponArray.length; i++) {
        selectedPosition = i;
        if (!mainConstants.weaponArray[i]) break;
    }
    addBuyMouseListener();
    buyPannelLoop(ctx);
}
