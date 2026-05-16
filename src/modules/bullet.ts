//modules
import Point from "./points";
import GruntType1 from "./gruntType1and3";
import GruntType4 from "./gruntType4";
import GruntType2 from "./gruntType2";
import Boss from "./boss";
interface IBullet {
    startPoint: Point;
    endPoint: Point;
    damage: number;
    isHit: boolean;
    velocity: Point;
    gunPosition: Point;
}
//draws bullet
export default class Bullet implements IBullet {
    startPoint: Point;
    endPoint: Point;
    damage: number;
    isHit: boolean = false;
    velocity: Point;
    gunPosition: Point;
    // trail history for glow effect
    private trail: Point[] = [];
    constructor(
        startPoint: Point,
        endPoint: Point,
        damage: number,
        velocity: Point,
        gunPosition: Point,
    ) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.damage = damage;
        this.velocity = velocity;
        this.gunPosition = gunPosition;
    }
    checkOnhit(
        objArray: (GruntType1 | GruntType2 | GruntType4)[],
        boss: Boss | null = null
    ) {
        objArray.forEach(
            (obj) => {
                if (
                    this.endPoint.x > obj.position.x &&
                    this.endPoint.x < obj.position.x + obj.width &&
                    this.endPoint.y > obj.position.y &&
                    this.endPoint.y < obj.position.y + obj.height
                ) {
                    this.isHit = true;
                    obj.healthpoint -= this.damage;
                }
            }
        );
        if (boss) {
            if (
                this.endPoint.x > boss.position.x &&
                this.endPoint.x < boss.position.x + boss.width &&
                this.endPoint.y > boss.position.y &&
                this.endPoint.y < boss.position.y + boss.height
            ) {
                this.isHit = true;
                boss.healthpoint -= this.damage;
            }
        }
    }
    draw(ctx: CanvasRenderingContext2D) {
        this.startPoint = this.startPoint.add(this.velocity);
        this.endPoint = this.endPoint.add(this.velocity);

        this.trail.push(new Point(this.startPoint.x, this.startPoint.y));
        if (this.trail.length > 6) this.trail.shift();

        ctx.save();
        // outer glow
        ctx.shadowColor = 'rgba(255,220,60,0.9)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255,230,80,0.3)';
        ctx.lineWidth = 7;
        ctx.moveTo(this.startPoint.x, this.startPoint.y);
        ctx.lineTo(this.endPoint.x, this.endPoint.y);
        ctx.stroke();
        // core bright line
        ctx.beginPath();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.moveTo(this.startPoint.x, this.startPoint.y);
        ctx.lineTo(this.endPoint.x, this.endPoint.y);
        ctx.stroke();
        // trail fade
        if (this.trail.length > 1) {
            for (let i = 1; i < this.trail.length; i++) {
                const alpha = i / this.trail.length * 0.4;
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255,200,50,${alpha})`;
                ctx.lineWidth = 1.5;
                ctx.moveTo(this.trail[i - 1].x, this.trail[i - 1].y);
                ctx.lineTo(this.trail[i].x, this.trail[i].y);
                ctx.stroke();
            }
        }
        ctx.restore();
    }
}
