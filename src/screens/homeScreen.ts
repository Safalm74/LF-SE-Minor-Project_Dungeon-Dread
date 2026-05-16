
//modules
import Point from "../modules/points";
//constants
import gruntConstants from "../constants/gruntConstants";
import mainConstants from "../constants/mainConstants";
import screenConstants from "../constants/screenConstants";
import stateConstants from "../constants/stateConstants";
//utils
import Btn from "../util/btn";
import checkCursorCollision from "../util/cursorCollision";
import loadInfoScreen from "../util/infoScreenLoader";
//sprite information
import homeAnimationSprite from "../sprites/homeAnimationSprite";
//objs
import { canvas } from "../main";
//screens
import controlScreen from "./controlScreen";
import gameMain from "./gameScreen";
//start btn
let startBtnPosition: Point;
let startbtnSize: TextMetrics;
let startbtnColor: string = "white";
//about btn
let aboutBtnPosition: Point;
let aboutBtnSize: TextMetrics;
let aboutBtnColor: string = "rgba(200,200,200,0.8)";
//controls btn
let controlBtnPosition: Point;
let controlBtnSize: TextMetrics;
let controlBtnColor: string = "rgba(200,200,200,0.8)";
//sprite position
let spritePosition = 0;
// hover glow animation tick
let glowTick = 0;
// mouse position — updated once per frame, not per-rAF via addEventListener
let mouseX = 0;
let mouseY = 0;
// mousemove listener registered once, not inside rAF
let mouseMoveListenerAdded = false;

function registerMouseListener() {
    if (mouseMoveListenerAdded) return;
    mouseMoveListenerAdded = true;
    window.addEventListener('mousemove', (e) => {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    });
}

//function to check clicked btn
function btnsclicked(
    ClickedPosition: Point,
    ctx: CanvasRenderingContext2D
) {
    ClickedPosition = new Point(
        -mainConstants.mapPosition.x + ClickedPosition.x,
        -mainConstants.mapPosition.y + ClickedPosition.y
    );
    if (
        startbtnSize &&
        checkCursorCollision(
            ClickedPosition,
            startBtnPosition,
            startbtnSize
        )) {
        stateConstants.homeScreenFlag = false;
        mainConstants.homeSound.pause();
        loadInfoScreen(
            ctx,
            "story1",
            "Continue =>",
            () => {
                loadInfoScreen(
                    ctx,
                    "aboutHero",
                    "Continue =>",
                    gameMain,
                    screenConstants.heroIntroductionSound
                )
                gameMain(ctx)
            },
            screenConstants.story1sound
        )
    }
    if (controlBtnSize &&
        checkCursorCollision(
            ClickedPosition,
            controlBtnPosition,
            controlBtnSize
        )) {
        stateConstants.homeScreenFlag = false;
        controlScreen(ctx)
    }
    if (aboutBtnSize &&
        checkCursorCollision(
            ClickedPosition,
            aboutBtnPosition,
            aboutBtnSize
        )) {
        stateConstants.homeScreenFlag = false;
        loadInfoScreen(
            ctx,
            "about",
            "<=return Home",
            homeScreen
        );
    }
}
//display monster
function displayMonster(ctx: CanvasRenderingContext2D) {
    const position = Math.floor(spritePosition / 8) %
        homeAnimationSprite[1].length;
    const mw = homeAnimationSprite[1][position].width;
    const mh = homeAnimationSprite[1][position].height;
    const scale = canvas.width * 0.001;
    const drawW = mw * scale;
    const drawH = mh * scale;
    const mx = canvas.width * 0.82 - mainConstants.mapPosition.x;
    const my = canvas.height * 0.25 - mainConstants.mapPosition.y;
    ctx.save();
    ctx.shadowColor = 'rgba(180,0,0,0.7)';
    ctx.shadowBlur = 28 + Math.sin(glowTick * 0.06) * 8;
    ctx.drawImage(
        gruntConstants.type3.image,
        homeAnimationSprite[1][position].position.x,
        homeAnimationSprite[1][position].position.y,
        mw, mh,
        mx, my,
        drawW, drawH
    );
    ctx.restore();
    spritePosition++;
}

function drawBackground(ctx: CanvasRenderingContext2D) {
    const ox = -mainConstants.mapPosition.x;
    const oy = -mainConstants.mapPosition.y;
    ctx.drawImage(screenConstants.backGroundImage, ox, oy, canvas.width, canvas.height);
    // dark atmospheric overlay
    ctx.fillStyle = "rgba(10,8,20,0.55)";
    ctx.fillRect(ox, oy, canvas.width, canvas.height);
    // left-side gradient for panel readability
    const panelGrad = ctx.createLinearGradient(ox, oy, ox + canvas.width * 0.55, oy);
    panelGrad.addColorStop(0, 'rgba(5,3,15,0.82)');
    panelGrad.addColorStop(1, 'rgba(5,3,15,0)');
    ctx.fillStyle = panelGrad;
    ctx.fillRect(ox, oy, canvas.width, canvas.height);
}

function drawTitle(ctx: CanvasRenderingContext2D) {
    const ox = -mainConstants.mapPosition.x;
    const oy = -mainConstants.mapPosition.y;
    const titleY = oy + canvas.height * 0.18;
    const titleX = ox + canvas.width * 0.06;
    ctx.save();
    ctx.font = `${Math.max(32, canvas.width * 0.048)}px ShadowOfTheDeadOver`;
    ctx.shadowColor = 'rgba(200,30,30,0.9)';
    ctx.shadowBlur = 22 + Math.sin(glowTick * 0.04) * 6;
    ctx.fillStyle = '#ffffff';
    ctx.fillText("DUNGEON", titleX, titleY);
    ctx.shadowColor = 'rgba(255,80,0,0.8)';
    ctx.shadowBlur = 18;
    ctx.fillStyle = '#ff4444';
    ctx.fillText("DREAD", titleX, titleY + canvas.height * 0.1);
    ctx.restore();
    // decorative line under title
    const lineY = titleY + canvas.height * 0.115;
    ctx.save();
    const lineGrad = ctx.createLinearGradient(titleX, lineY, titleX + canvas.width * 0.3, lineY);
    lineGrad.addColorStop(0, 'rgba(255,80,0,0.8)');
    lineGrad.addColorStop(1, 'rgba(255,80,0,0)');
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(titleX, lineY);
    ctx.lineTo(titleX + canvas.width * 0.32, lineY);
    ctx.stroke();
    ctx.restore();
}

function updateButtonColors() {
    const mouse = new Point(mouseX, mouseY);
    if (startbtnSize) {
        startbtnColor = checkCursorCollision(mouse, startBtnPosition, startbtnSize)
            ? '#ff6b35' : '#ffffff';
    }
    if (controlBtnSize) {
        controlBtnColor = checkCursorCollision(mouse, controlBtnPosition, controlBtnSize)
            ? '#ff6b35' : 'rgba(200,200,200,0.75)';
    }
    if (aboutBtnSize) {
        aboutBtnColor = checkCursorCollision(mouse, aboutBtnPosition, aboutBtnSize)
            ? '#ff6b35' : 'rgba(200,200,200,0.75)';
    }
}

function drawMenuButtons(ctx: CanvasRenderingContext2D) {
    const ox = -mainConstants.mapPosition.x;
    const oy = -mainConstants.mapPosition.y;
    const btnX = ox + canvas.width * 0.06;
    const btnFontSize = Math.max(22, Math.min(canvas.width * 0.038, 52));
    const btnFont = `${btnFontSize}px Eater`;
    const rowGap = canvas.height * 0.12;
    const startY = oy + canvas.height * 0.44;

    startBtnPosition = new Point(btnX, startY);
    controlBtnPosition = new Point(btnX, startY + rowGap);
    aboutBtnPosition = new Point(btnX, startY + rowGap * 2);

    updateButtonColors();

    ctx.save();
    if (startbtnColor === '#ff6b35') {
        ctx.shadowColor = 'rgba(255,107,53,0.9)';
        ctx.shadowBlur = 14;
    }
    startbtnSize = Btn(ctx, "PLAY", startBtnPosition, btnFont, startbtnColor);
    ctx.restore();

    ctx.save();
    if (controlBtnColor === '#ff6b35') {
        ctx.shadowColor = 'rgba(255,107,53,0.7)';
        ctx.shadowBlur = 10;
    }
    controlBtnSize = Btn(ctx, "INSTRUCTIONS", controlBtnPosition, btnFont, controlBtnColor);
    ctx.restore();

    ctx.save();
    if (aboutBtnColor === '#ff6b35') {
        ctx.shadowColor = 'rgba(255,107,53,0.7)';
        ctx.shadowBlur = 10;
    }
    aboutBtnSize = Btn(ctx, "ABOUT", aboutBtnPosition, btnFont, aboutBtnColor);
    ctx.restore();
}

function displayAll(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(
        -mainConstants.mapPosition.x,
        -mainConstants.mapPosition.y,
        canvas.width,
        canvas.height
    );
    drawBackground(ctx);
    drawTitle(ctx);
    drawMenuButtons(ctx);
    displayMonster(ctx);
    glowTick++;
}

function homeMainLoop(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    displayAll(ctx);
    if (stateConstants.homeScreenFlag) {
        requestAnimationFrame(() => { homeMainLoop(ctx); });
    }
}
export { btnsclicked }
export default function homeScreen(ctx: CanvasRenderingContext2D) {
    stateConstants.homeScreenFlag = true;
    stateConstants.controlScreenFlag = false;
    registerMouseListener();
    if (!stateConstants.ismute) {
        if (mainConstants.homeSound) {
            mainConstants.homeSound.pause();
            mainConstants.homeSound.currentTime = 0;
        }
        mainConstants.homeSound.play()
    }
    homeMainLoop(ctx)
}
