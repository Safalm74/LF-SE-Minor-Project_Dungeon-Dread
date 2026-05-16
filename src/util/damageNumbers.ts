import Point from "../modules/points";

interface DamageNumber {
    x: number;
    y: number;
    value: number;
    life: number;
    maxLife: number;
    isHero: boolean;
    vy: number;
}

const numbers: DamageNumber[] = [];

export function spawnDamageNumber(pos: Point, value: number, isHero: boolean = false) {
    numbers.push({
        x: pos.x + (Math.random() - 0.5) * 20,
        y: pos.y,
        value: Math.round(value),
        life: 55,
        maxLife: 55,
        isHero,
        vy: -1.2 - Math.random() * 0.8,
    });
}

export function drawDamageNumbers(ctx: CanvasRenderingContext2D) {
    for (let i = numbers.length - 1; i >= 0; i--) {
        const n = numbers[i];
        n.y += n.vy;
        n.vy *= 0.97;
        n.life--;
        if (n.life <= 0) {
            numbers.splice(i, 1);
            continue;
        }
        const alpha = n.life / n.maxLife;
        const scale = n.isHero ? 1.5 : 1;
        const fontSize = Math.round((n.isHero ? 20 : 15) * scale);
        ctx.save();
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = 6;
        if (n.isHero) {
            ctx.fillStyle = '#ff3333';
            ctx.shadowColor = 'rgba(255,0,0,0.8)';
        } else {
            ctx.fillStyle = '#ffee44';
            ctx.shadowColor = 'rgba(255,220,0,0.8)';
        }
        ctx.fillText(`-${n.value}`, n.x, n.y);
        ctx.restore();
    }
}

export function clearDamageNumbers() {
    numbers.length = 0;
}
