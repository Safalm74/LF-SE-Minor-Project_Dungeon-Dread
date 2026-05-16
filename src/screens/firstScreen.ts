//constants
import mainConstants from "../constants/mainConstants";
import stateConstants from "../constants/stateConstants";
import screenConstants from "../constants/screenConstants";
//objs
import { canvas } from "../main";
//screens
import homeScreen from "./homeScreen";

let glowTick = 0;
// keypress listener registered once, not inside rAF
let listenersAdded = false;

function registerListeners(ctx: CanvasRenderingContext2D) {
    if (listenersAdded) return;
    listenersAdded = true;
    window.addEventListener('keypress', () => {
        if (stateConstants.firstPageFlag) {
            stateConstants.firstPageFlag = false;
            homeScreen(ctx);
        }
    });
    canvas.addEventListener('touchstart', () => {
        if (stateConstants.firstPageFlag) {
            stateConstants.firstPageFlag = false;
            homeScreen(ctx);
        }
    }, { passive: true });
}

function displayAll(ctx: CanvasRenderingContext2D) {
    const ox = -mainConstants.mapPosition.x;
    const oy = -mainConstants.mapPosition.y;

    ctx.clearRect(ox, oy, canvas.width, canvas.height);

    // Background
    ctx.drawImage(screenConstants.backGroundImage, ox, oy, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(5,3,18,0.68)";
    ctx.fillRect(ox, oy, canvas.width, canvas.height);

    const cx = ox + canvas.width / 2;
    const cy = oy + canvas.height / 2;

    // Title
    const titleFontSize = Math.max(28, Math.min(canvas.width * 0.05, 72));
    ctx.save();
    ctx.font = `${titleFontSize}px ShadowOfTheDeadOver`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(220,40,40,0.95)';
    ctx.shadowBlur = 30 + Math.sin(glowTick * 0.04) * 10;
    ctx.fillStyle = '#ffffff';
    ctx.fillText("DUNGEON DREAD", cx, cy - canvas.height * 0.15);
    ctx.restore();

    // Pulsing "press any button" prompt
    const pulse = 0.65 + Math.sin(glowTick * 0.08) * 0.35;
    const promptFontSize = Math.max(14, Math.min(canvas.width * 0.025, 36));
    ctx.save();
    ctx.font = `${promptFontSize}px Eater`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.globalAlpha = pulse;
    ctx.fillStyle = '#ffcc66';
    ctx.shadowColor = 'rgba(255,200,80,0.8)';
    ctx.shadowBlur = 12;
    ctx.fillText("PRESS ANY BUTTON", cx, cy + canvas.height * 0.18);
    ctx.restore();

    glowTick++;
}

function homeMainLoop(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    displayAll(ctx);
    if (stateConstants.firstPageFlag) {
        requestAnimationFrame(() => { homeMainLoop(ctx); });
    }
}

export default function firstScreen(ctx: CanvasRenderingContext2D) {
    stateConstants.firstPageFlag = true;
    glowTick = 0;
    if (mainConstants.homeSound) {
        mainConstants.homeSound.pause();
        mainConstants.homeSound.currentTime = 0;
    }
    registerListeners(ctx);
    homeMainLoop(ctx);
}
