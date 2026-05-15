import Point from "../modules/points";
import stateConstants from "../constants/stateConstants";
import mainConstants from "../constants/mainConstants";
import { canvas } from "../main";

export const isTouchDevice = (): boolean =>
    'ontouchstart' in window || navigator.maxTouchPoints > 0;

const DPAD_RADIUS = 68;
const ACTION_BTN_RADIUS = 34;

// All positions are in screen space (not canvas-translated space)
function dpadCenter(): Point {
    return new Point(100, canvas.height - 100);
}
function sprintBtnPos(): Point {
    return new Point(canvas.width - 90, canvas.height - 85);
}
function abilityBtnPos(): Point {
    return new Point(canvas.width - 185, canvas.height - 85);
}
function muteBtnPos(): Point {
    return new Point(canvas.width - 38, 42);
}

// Convert screen position to canvas-translated draw position
function screenToCanvas(sx: number, sy: number): Point {
    return new Point(
        sx - mainConstants.mapPosition.x,
        sy - mainConstants.mapPosition.y
    );
}

function drawArrow(
    ctx: CanvasRenderingContext2D,
    x: number, y: number,
    dir: 'up' | 'down' | 'left' | 'right'
) {
    const s = 11;
    ctx.beginPath();
    switch (dir) {
        case 'up':    ctx.moveTo(x, y - s); ctx.lineTo(x - s, y + s * 0.55); ctx.lineTo(x + s, y + s * 0.55); break;
        case 'down':  ctx.moveTo(x, y + s); ctx.lineTo(x - s, y - s * 0.55); ctx.lineTo(x + s, y - s * 0.55); break;
        case 'left':  ctx.moveTo(x - s, y); ctx.lineTo(x + s * 0.55, y - s); ctx.lineTo(x + s * 0.55, y + s); break;
        case 'right': ctx.moveTo(x + s, y); ctx.lineTo(x - s * 0.55, y - s); ctx.lineTo(x - s * 0.55, y + s); break;
    }
    ctx.closePath();
    ctx.fill();
}

function drawCircleBtn(
    ctx: CanvasRenderingContext2D,
    cx: number, cy: number, r: number,
    fillColor: string, label: string,
    fontSize: number
) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = 'white';
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, cx, cy);
}

export function drawTouchControls(ctx: CanvasRenderingContext2D) {
    if (!isTouchDevice()) return;

    ctx.save();

    const dc = dpadCenter();
    const { x: dcx, y: dcy } = screenToCanvas(dc.x, dc.y);

    // D-pad outer ring
    ctx.globalAlpha = 0.45;
    ctx.beginPath();
    ctx.arc(dcx, dcy, DPAD_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Directional arrows
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    const off = DPAD_RADIUS * 0.56;
    drawArrow(ctx, dcx, dcy - off, 'up');
    drawArrow(ctx, dcx, dcy + off, 'down');
    drawArrow(ctx, dcx - off, dcy, 'left');
    drawArrow(ctx, dcx + off, dcy, 'right');

    // Sprint button
    const sp = sprintBtnPos();
    const { x: spx, y: spy } = screenToCanvas(sp.x, sp.y);
    const sprintActive = !!stateConstants.btnPressed['c'];
    drawCircleBtn(
        ctx, spx, spy, ACTION_BTN_RADIUS,
        sprintActive ? 'rgba(80,180,255,0.6)' : 'rgba(80,180,255,0.22)',
        'RUN', 11
    );

    // Ability button
    const ab = abilityBtnPos();
    const { x: abx, y: aby } = screenToCanvas(ab.x, ab.y);
    const abilityActive = !!stateConstants.btnPressed[' '];
    drawCircleBtn(
        ctx, abx, aby, ACTION_BTN_RADIUS,
        abilityActive ? 'rgba(255,190,40,0.65)' : 'rgba(255,190,40,0.22)',
        'PWR', 11
    );

    // Mute toggle button (top-right, always visible during game)
    const mb = muteBtnPos();
    const { x: mbx, y: mby } = screenToCanvas(mb.x, mb.y);
    ctx.globalAlpha = 0.55;
    drawCircleBtn(
        ctx, mbx, mby, 24,
        stateConstants.ismute ? 'rgba(200,60,60,0.55)' : 'rgba(60,200,100,0.35)',
        stateConstants.ismute ? '🔇' : '🔊', 14
    );

    ctx.restore();
}

// --- Touch detection (all in screen/client coordinates) ---

function touchScreenPos(touch: Touch): Point {
    const rect = canvas.getBoundingClientRect();
    return new Point(touch.clientX - rect.left, touch.clientY - rect.top);
}

function distanceSq(ax: number, ay: number, bx: number, by: number): number {
    return (ax - bx) ** 2 + (ay - by) ** 2;
}

function applyDpadTouch(pos: Point, active: boolean): boolean {
    const dc = dpadCenter();
    const dsq = distanceSq(pos.x, pos.y, dc.x, dc.y);
    if (dsq > (DPAD_RADIUS * 1.35) ** 2) return false;

    if (!active || dsq < 15 ** 2) {
        stateConstants.btnPressed['w'] = false;
        stateConstants.btnPressed['s'] = false;
        stateConstants.btnPressed['a'] = false;
        stateConstants.btnPressed['d'] = false;
        return true;
    }
    const angle = Math.atan2(pos.y - dc.y, pos.x - dc.x);
    const p4 = Math.PI / 4;
    stateConstants.btnPressed['d'] = Math.abs(angle) < p4;
    stateConstants.btnPressed['a'] = Math.abs(angle) > 3 * p4;
    stateConstants.btnPressed['s'] = angle > p4 && angle < 3 * p4;
    stateConstants.btnPressed['w'] = angle < -p4 && angle > -3 * p4;
    return true;
}

function applyActionTouch(pos: Point, active: boolean): boolean {
    const sp = sprintBtnPos();
    const ab = abilityBtnPos();
    let hit = false;
    if (distanceSq(pos.x, pos.y, sp.x, sp.y) < (ACTION_BTN_RADIUS * 1.35) ** 2) {
        stateConstants.btnPressed['c'] = active;
        hit = true;
    }
    if (distanceSq(pos.x, pos.y, ab.x, ab.y) < (ACTION_BTN_RADIUS * 1.35) ** 2) {
        stateConstants.btnPressed[' '] = active;
        hit = true;
    }
    return hit;
}

function handleMuteTouch(pos: Point): boolean {
    const mb = muteBtnPos();
    if (distanceSq(pos.x, pos.y, mb.x, mb.y) < 30 ** 2) {
        stateConstants.ismute = !stateConstants.ismute;
        if (stateConstants.ismute) {
            mainConstants.windSound.pause();
            mainConstants.homeSound.pause();
        } else if (stateConstants.ingame) {
            mainConstants.windSound.play();
        }
        return true;
    }
    return false;
}

function clearDpadKeys() {
    stateConstants.btnPressed['w'] = false;
    stateConstants.btnPressed['s'] = false;
    stateConstants.btnPressed['a'] = false;
    stateConstants.btnPressed['d'] = false;
}

export function initTouchControls() {
    if (!isTouchDevice()) return;

    canvas.addEventListener('touchstart', (e) => {
        if (!stateConstants.ingame) return;
        e.preventDefault();
        for (const touch of Array.from(e.changedTouches)) {
            const pos = touchScreenPos(touch);
            handleMuteTouch(pos);
            applyDpadTouch(pos, true);
            applyActionTouch(pos, true);
        }
    }, { passive: false });

    canvas.addEventListener('touchmove', (e) => {
        if (!stateConstants.ingame) return;
        e.preventDefault();
        for (const touch of Array.from(e.changedTouches)) {
            const pos = touchScreenPos(touch);
            applyDpadTouch(pos, true);
        }
    }, { passive: false });

    canvas.addEventListener('touchend', (e) => {
        if (!stateConstants.ingame) return;
        e.preventDefault();
        const active = Array.from(e.touches).map(t => touchScreenPos(t));
        const dc = dpadCenter();
        const hasDpad = active.some(p =>
            distanceSq(p.x, p.y, dc.x, dc.y) < (DPAD_RADIUS * 1.35) ** 2
        );
        if (!hasDpad) clearDpadKeys();

        const sp = sprintBtnPos();
        const ab = abilityBtnPos();
        if (!active.some(p => distanceSq(p.x, p.y, sp.x, sp.y) < (ACTION_BTN_RADIUS * 1.35) ** 2))
            stateConstants.btnPressed['c'] = false;
        if (!active.some(p => distanceSq(p.x, p.y, ab.x, ab.y) < (ACTION_BTN_RADIUS * 1.35) ** 2))
            stateConstants.btnPressed[' '] = false;
    }, { passive: false });
}
