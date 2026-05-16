//modules
import Point from "../modules/points";
//constants
import mainConstants from "../constants/mainConstants";
import screenConstants from "../constants/screenConstants";
import stateConstants from "../constants/stateConstants";
//utils
import Btn from "../util/btn";
import checkCursorCollision from "../util/cursorCollision";
//objs
import { canvas } from "../main";

let BtnFunction: (ctx: CanvasRenderingContext2D) => void;
let aboutToHomeBtnPosition: Point;
let aboutToHomebtnSize: TextMetrics;

// typewriter state
let fullText = "";
let displayedChars = 0;
let typewriterTick = 0;
const TICK_INTERVAL = 2;
let glowTick = 0;
let headingText = "";
let btnLabel = "";
function infoScreenBtn(
    ClickedPosition: Point,
    ctx: CanvasRenderingContext2D
) {
    if (displayedChars < fullText.length) {
        displayedChars = fullText.length;
        return;
    }
    if (!aboutToHomebtnSize) return;
    if (checkCursorCollision(ClickedPosition, aboutToHomeBtnPosition, aboutToHomebtnSize)) {
        stateConstants.infoScreenFlag = false;
        if (screenConstants.prevSoundHolder) {
            screenConstants.prevSoundHolder.pause();
            screenConstants.prevSoundHolder.currentTime = 0;
        }
        BtnFunction(ctx);
    }
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxW: number): string[] {
    const words = text.split(" ");
    const lines: string[] = [];
    let line = "";
    for (const word of words) {
        const test = line ? `${line} ${word}` : word;
        if (ctx.measureText(test).width > maxW && line) {
            lines.push(line); line = word;
        } else { line = test; }
    }
    if (line) lines.push(line);
    return lines;
}

function displayAll(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(screenConstants.backGroundImage, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(5,3,15,0.78)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const panelX = canvas.width * 0.08;
    const panelY = canvas.height * 0.08;
    const panelW = canvas.width * 0.84;
    const panelH = canvas.height * 0.84;

    // panel background
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(panelX, panelY, panelW, panelH, 12);
    ctx.fillStyle = "rgba(8,6,22,0.88)";
    ctx.fill();
    ctx.strokeStyle = "rgba(120,80,200,0.4)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    // heading
    const headFontSize = Math.max(20, Math.min(canvas.width * 0.042, 56));
    ctx.save();
    ctx.font = `${headFontSize}px ShadowOfTheDeadOver`;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.shadowColor = "rgba(180,80,255,0.9)";
    ctx.shadowBlur = 18 + Math.sin(glowTick * 0.05) * 6;
    ctx.fillStyle = "#ffffff";
    ctx.fillText(headingText, panelX + 28, panelY + 28);
    ctx.restore();

    // divider line
    const lineY = panelY + headFontSize + 44;
    ctx.save();
    const lineGrad = ctx.createLinearGradient(panelX + 24, 0, panelX + panelW * 0.7, 0);
    lineGrad.addColorStop(0, "rgba(160,80,255,0.7)");
    lineGrad.addColorStop(1, "rgba(160,80,255,0)");
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(panelX + 24, lineY);
    ctx.lineTo(panelX + panelW - 24, lineY);
    ctx.stroke();
    ctx.restore();

    // body text with typewriter
    const textFontSize = Math.max(13, Math.min(canvas.width * 0.02, 22));
    ctx.save();
    ctx.font = `${textFontSize}px Arial`;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = "rgba(210,210,230,0.92)";

    const visible = fullText.slice(0, displayedChars);
    const paras = visible.split("\n\n");
    const maxW = panelW - 60;
    let drawY = lineY + 24;
    const lineH = textFontSize * 1.7;

    for (const para of paras) {
        const wrapped = wrapText(ctx, para.trim(), maxW);
        for (const line of wrapped) {
            if (drawY + lineH > panelY + panelH - 80) break;
            ctx.fillText(line, panelX + 28, drawY);
            drawY += lineH;
        }
        drawY += lineH * 0.45;
    }

    // blinking cursor
    if (displayedChars < fullText.length && Math.floor(glowTick / 14) % 2 === 0) {
        ctx.fillStyle = "rgba(200,150,255,0.9)";
        ctx.fillRect(panelX + 28, drawY - lineH - 2, 2, textFontSize);
    }
    ctx.restore();

    // skip hint
    if (displayedChars < fullText.length) {
        ctx.save();
        ctx.font = `${Math.max(10, textFontSize * 0.75)}px Arial`;
        ctx.fillStyle = `rgba(160,160,180,${0.45 + Math.sin(glowTick * 0.07) * 0.25})`;
        ctx.textAlign = "center";
        ctx.fillText("Tap / click to skip", canvas.width / 2, panelY + panelH - 40);
        ctx.restore();
    }

    // continue button
    if (displayedChars >= fullText.length) {
        const btnFontSize = Math.max(13, Math.min(canvas.width * 0.022, 28));
        aboutToHomeBtnPosition = new Point(panelX + 28, panelY + panelH - 58);
        ctx.save();
        ctx.shadowColor = "rgba(180,80,255,0.7)";
        ctx.shadowBlur = 10 + Math.sin(glowTick * 0.07) * 4;
        aboutToHomebtnSize = Btn(ctx, btnLabel, aboutToHomeBtnPosition, `${btnFontSize}px ShadowOfTheDeadOver`, "#ffffff");
        ctx.restore();
    }

    // advance typewriter
    if (displayedChars < fullText.length) {
        typewriterTick++;
        if (typewriterTick >= TICK_INTERVAL) {
            typewriterTick = 0;
            displayedChars++;
        }
    }
    glowTick++;
}

function infoLoop(ctx: CanvasRenderingContext2D) {
    displayAll(ctx);
    if (stateConstants.infoScreenFlag) {
        requestAnimationFrame(() => infoLoop(ctx));
    }
}

export { infoScreenBtn }
export default function infoScreen(
    ctx: CanvasRenderingContext2D,
    heading: string,
    msg: string,
    btnName: string,
    BtnPassedFunction: (ctx: CanvasRenderingContext2D) => void
) {
    BtnFunction = BtnPassedFunction;
    stateConstants.infoScreenFlag = true;
    headingText = heading;
    fullText = msg.replace(/^\n+/, "").trimEnd();
    btnLabel = btnName;
    displayedChars = 0;
    typewriterTick = 0;
    glowTick = 0;
    ctx.translate(-mainConstants.mapPosition.x, -mainConstants.mapPosition.y);
    mainConstants.mapPosition = new Point(0, 0);
    infoLoop(ctx);
}
