import Point from "./points";
import GruntType1and3 from "./gruntType1and3";

// Procedurally-drawn mechanical bot enemy — no sprite sheet needed.
// Inherits all movement, collision, and attack logic from GruntType1and3.
export default class Bot extends GruntType1and3 {
    private pulsePhase: number;

    constructor(
        position: Point,
        team: "red" | "blue",
        lookingLeft: boolean,
        healthpoint: number,
        width: number,
        height: number,
        damage: number,
        attackRate: number,
        _image: HTMLImageElement,
        gruntType: number,
        velocity: Point
    ) {
        super(position, team, lookingLeft, healthpoint, width, height, damage, attackRate, _image, gruntType, velocity);
        this.pulsePhase = Math.random() * Math.PI * 2;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (!this.isSpawned) return;
        this.update();

        const x = this.position.x;
        const y = this.position.y;
        const w = this.width;
        const h = this.height;
        const t = this.spritePosition;
        const pulse = Math.sin(t * 0.09 + this.pulsePhase);
        const legSwing = Math.sin(t * 0.18) * h * 0.07;

        ctx.save();

        // Drop shadow beneath bot
        ctx.fillStyle = 'rgba(0,0,0,0.35)';
        ctx.beginPath();
        ctx.ellipse(x + w / 2, y + h * 0.98, w * 0.33, h * 0.06, 0, 0, Math.PI * 2);
        ctx.fill();

        // Legs
        ctx.fillStyle = '#0d0d1a';
        ctx.strokeStyle = '#3355cc';
        ctx.lineWidth = 1.2;
        // left leg
        ctx.fillRect(x + w * 0.20, y + h * 0.72 - legSwing * 0.5, w * 0.20, h * 0.28 + legSwing * 0.5);
        ctx.strokeRect(x + w * 0.20, y + h * 0.72 - legSwing * 0.5, w * 0.20, h * 0.28 + legSwing * 0.5);
        // right leg
        ctx.fillRect(x + w * 0.60, y + h * 0.72 + legSwing * 0.5, w * 0.20, h * 0.28 - legSwing * 0.5);
        ctx.strokeRect(x + w * 0.60, y + h * 0.72 + legSwing * 0.5, w * 0.20, h * 0.28 - legSwing * 0.5);

        // Arms
        ctx.fillStyle = '#111122';
        ctx.strokeStyle = '#2244bb';
        const armSwing = Math.sin(t * 0.18 + Math.PI) * h * 0.04;
        ctx.fillRect(x - w * 0.02, y + h * 0.36 + armSwing, w * 0.14, h * 0.30);
        ctx.strokeRect(x - w * 0.02, y + h * 0.36 + armSwing, w * 0.14, h * 0.30);
        ctx.fillRect(x + w * 0.88, y + h * 0.36 - armSwing, w * 0.14, h * 0.30);
        ctx.strokeRect(x + w * 0.88, y + h * 0.36 - armSwing, w * 0.14, h * 0.30);

        // Main torso
        ctx.fillStyle = '#111827';
        ctx.strokeStyle = '#1a3aff';
        ctx.lineWidth = 1.8;
        ctx.fillRect(x + w * 0.13, y + h * 0.34, w * 0.74, h * 0.40);
        ctx.strokeRect(x + w * 0.13, y + h * 0.34, w * 0.74, h * 0.40);

        // Chest energy core (pulsing cyan)
        const coreAlpha = 0.6 + pulse * 0.4;
        const coreBlue = Math.round(180 + pulse * 60);
        ctx.shadowColor = `rgba(0,200,255,${coreAlpha})`;
        ctx.shadowBlur = 12 + pulse * 4;
        ctx.fillStyle = `rgba(0,${coreBlue},255,0.92)`;
        ctx.beginPath();
        ctx.arc(x + w / 2, y + h * 0.57, w * 0.10, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Circuit lines on torso
        ctx.strokeStyle = `rgba(0,180,255,${0.25 + pulse * 0.15})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(x + w * 0.24, y + h * 0.45);
        ctx.lineTo(x + w * 0.42, y + h * 0.45);
        ctx.moveTo(x + w * 0.58, y + h * 0.45);
        ctx.lineTo(x + w * 0.76, y + h * 0.45);
        ctx.moveTo(x + w * 0.38, y + h * 0.40);
        ctx.lineTo(x + w * 0.38, y + h * 0.52);
        ctx.moveTo(x + w * 0.62, y + h * 0.40);
        ctx.lineTo(x + w * 0.62, y + h * 0.52);
        ctx.stroke();

        // Neck connector
        ctx.fillStyle = '#0a0a14';
        ctx.strokeStyle = '#1a3aff';
        ctx.lineWidth = 1;
        ctx.fillRect(x + w * 0.38, y + h * 0.26, w * 0.24, h * 0.10);
        ctx.strokeRect(x + w * 0.38, y + h * 0.26, w * 0.24, h * 0.10);

        // Head
        ctx.fillStyle = '#111827';
        ctx.strokeStyle = '#1a3aff';
        ctx.lineWidth = 1.8;
        ctx.fillRect(x + w * 0.17, y + h * 0.05, w * 0.66, h * 0.23);
        ctx.strokeRect(x + w * 0.17, y + h * 0.05, w * 0.66, h * 0.23);

        // Visor / eye bar (glowing red when looking left = toward hero)
        const eyeGlow = 0.75 + pulse * 0.25;
        ctx.shadowColor = `rgba(255,30,30,${eyeGlow})`;
        ctx.shadowBlur = 10 + pulse * 5;
        ctx.fillStyle = `rgba(255,${Math.round(20 + pulse * 15)},20,0.95)`;
        ctx.fillRect(x + w * 0.24, y + h * 0.11, w * 0.52, h * 0.11);
        ctx.shadowBlur = 0;

        // Antenna
        ctx.strokeStyle = `rgba(0,200,255,${0.6 + pulse * 0.3})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x + w * 0.50, y + h * 0.05);
        ctx.lineTo(x + w * 0.50, y - h * 0.06);
        ctx.stroke();
        ctx.shadowColor = `rgba(0,200,255,${0.8 + pulse * 0.2})`;
        ctx.shadowBlur = 6;
        ctx.fillStyle = `rgba(0,220,255,0.9)`;
        ctx.beginPath();
        ctx.arc(x + w * 0.50, y - h * 0.06, w * 0.04, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.restore();
        this.spritePosition++;
    }

    spawn(ctx: CanvasRenderingContext2D) {
        const x = this.position.x;
        const y = this.position.y;
        const w = this.width;
        const h = this.height;
        const progress = Math.min(1, this.spritePosition / 38);

        ctx.save();
        ctx.globalAlpha = progress;

        // Digital materialization: particles converging into bot shape
        ctx.fillStyle = '#00ccff';
        ctx.shadowColor = '#00ccff';
        ctx.shadowBlur = 16;
        const numPts = 10;
        for (let i = 0; i < numPts; i++) {
            const angle = (i / numPts) * Math.PI * 2;
            const r = (1 - progress) * w * 0.9;
            const px = x + w / 2 + Math.cos(angle) * r;
            const py = y + h / 2 + Math.sin(angle) * r * 0.65;
            const ps = w * 0.10 * progress;
            ctx.fillRect(px - ps / 2, py - ps / 2, ps, ps);
        }

        ctx.restore();
        this.spritePosition++;
        if (this.spritePosition >= 38) {
            this.isSpawned = true;
            this.spritePosition = 0;
        }
    }
}
