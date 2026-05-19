import { WaveTheme } from "../constants/waveConstants";
import mainConstants from "../constants/mainConstants";
import { canvas } from "../main";

// ── Ambient Particles ─────────────────────────────────────────────────────────
interface Particle {
    x: number; y: number;
    vx: number; vy: number;
    alpha: number; size: number;
    life: number; maxLife: number;
}

const particles: Particle[] = [];
const MAX_PARTICLES = 40;
let currentParticleColor = "rgba(80,180,60,";

export function initParticles(theme: WaveTheme) {
    particles.length = 0;
    currentParticleColor = theme.particleColor;
}

function spawnParticle() {
    if (particles.length >= MAX_PARTICLES) return;
    const life = 140 + Math.random() * 120;
    particles.push({
        x: -mainConstants.mapPosition.x + Math.random() * canvas.width,
        y: -mainConstants.mapPosition.y + Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.15 - Math.random() * 0.25,
        alpha: 0,
        size: 1.5 + Math.random() * 2.5,
        life,
        maxLife: life,
    });
}

export function drawParticles(ctx: CanvasRenderingContext2D) {
    if (Math.random() < 0.35) spawnParticle();
    ctx.save();
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        // fade in / fade out
        const t = p.life / p.maxLife;
        p.alpha = t < 0.15 ? t / 0.15 : t > 0.85 ? (1 - t) / 0.15 : 1;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${currentParticleColor}${(p.alpha * 0.55).toFixed(2)})`;
        ctx.fill();
    }
    ctx.restore();
}

// ── Wave Intro Overlay ────────────────────────────────────────────────────────
const INTRO_FRAMES = 220; // ~3.6s at 60fps
let introTimer = 0;
let introTheme: WaveTheme | null = null;
let introGlowTick = 0;

export function triggerWaveIntro(theme: WaveTheme) {
    introTheme = theme;
    introTimer = INTRO_FRAMES;
    introGlowTick = 0;
}

export function isIntroActive() {
    return introTimer > 0;
}

export function drawWaveIntro(ctx: CanvasRenderingContext2D) {
    if (introTimer <= 0 || !introTheme) return;

    const t = introTimer / INTRO_FRAMES;
    // alpha: fade in first 15%, hold, fade out last 20%
    const alpha = t > 0.85
        ? ((1 - t) / 0.15)
        : t < 0.2
            ? (t / 0.2)
            : 1;

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = alpha;

    // dark overlay
    ctx.fillStyle = "rgba(5,2,12,0.82)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // decorative top / bottom bars
    const barH = canvas.height * 0.06;
    ctx.fillStyle = "rgba(0,0,0,0.9)";
    ctx.fillRect(0, 0, canvas.width, barH);
    ctx.fillRect(0, canvas.height - barH, canvas.width, barH);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    introGlowTick++;

    // wave name
    const nameFontSize = Math.max(28, Math.min(canvas.width * 0.06, 72));
    ctx.font = `${nameFontSize}px ShadowOfTheDeadOver`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowBlur = 24 + Math.sin(introGlowTick * 0.08) * 8;
    ctx.shadowColor = `rgba(${introTheme.vignetteColor},0.9)`;
    ctx.fillStyle = "#ffffff";
    ctx.fillText(introTheme.name, cx, cy - canvas.height * 0.12);

    // subtitle
    const subFontSize = Math.max(12, Math.min(canvas.width * 0.022, 28));
    ctx.font = `${subFontSize}px Eater`;
    ctx.shadowBlur = 8;
    ctx.fillStyle = `rgba(${introTheme.vignetteColor},1)`;
    ctx.fillText(introTheme.subtitle, cx, cy - canvas.height * 0.05);

    // horizontal rule
    const lineW = Math.min(canvas.width * 0.4, 400);
    ctx.save();
    const grad = ctx.createLinearGradient(cx - lineW / 2, 0, cx + lineW / 2, 0);
    grad.addColorStop(0, "rgba(255,255,255,0)");
    grad.addColorStop(0.5, `rgba(${introTheme.vignetteColor},0.8)`);
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - lineW / 2, cy);
    ctx.lineTo(cx + lineW / 2, cy);
    ctx.stroke();
    ctx.restore();

    // lore text (first line only, two-line summary)
    const loreLines = introTheme.lore.split("\n\n").filter(Boolean);
    const loreFontSize = Math.max(11, Math.min(canvas.width * 0.018, 20));
    ctx.font = `${loreFontSize}px Arial`;
    ctx.fillStyle = "rgba(200,200,200,0.88)";
    ctx.shadowBlur = 0;
    // render only the first paragraph in intro
    const firstParagraph = loreLines[0] ?? "";
    const words = firstParagraph.split(" ");
    const maxLineW = canvas.width * 0.55;
    let line = "";
    let lineY = cy + canvas.height * 0.07;
    const lineH = loreFontSize * 1.6;
    for (const word of words) {
        const test = line ? `${line} ${word}` : word;
        if (ctx.measureText(test).width > maxLineW && line) {
            ctx.fillText(line, cx, lineY);
            line = word;
            lineY += lineH;
        } else {
            line = test;
        }
    }
    if (line) ctx.fillText(line, cx, lineY);

    ctx.restore();
    introTimer--;
}
