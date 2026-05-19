//modules
import Point from "./points";
//objs
import { hero } from "../screens/gameScreen";

interface ISpit {
    position: Point;
    damage: number;
    isHit: boolean;
    velocity: Point;
    gunPosition: Point;
    radius: number
}
export default class Spit implements ISpit {
    position: Point;
    damage: number;
    isHit: boolean = false;
    velocity: Point;
    gunPosition: Point;
    radius: number = window.innerWidth / 100;
    private age: number = 0;

    constructor(
        position: Point,
        damage: number,
        velocity: Point,
        gunPosition: Point,
    ) {
        this.position = position;
        this.damage = damage;
        this.velocity = velocity;
        this.gunPosition = gunPosition;
    }
    checkOnhit() {
        if (
            this.position.x + this.radius > hero.position.x &&
            this.position.x - this.radius < hero.position.x + hero.width &&
            this.position.y + this.radius > hero.position.y &&
            this.position.y - this.radius < hero.position.y + hero.height
        ) {
            this.isHit = true;
            hero.healthpoint -= this.damage;
        }
    }
    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.age++;
    }
    draw(ctx: CanvasRenderingContext2D) {
        this.update();
        const wobble = Math.sin(this.age * 0.3) * 0.15;
        ctx.save();
        // outer toxic glow
        ctx.shadowColor = 'rgba(80,255,50,0.8)';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(50,200,20,0.3)';
        ctx.arc(this.position.x, this.position.y, this.radius * 1.6 + wobble * this.radius, 0, Math.PI * 2);
        ctx.fill();
        // core droplet
        ctx.beginPath();
        const grad = ctx.createRadialGradient(
            this.position.x - this.radius * 0.25,
            this.position.y - this.radius * 0.25,
            this.radius * 0.1,
            this.position.x,
            this.position.y,
            this.radius
        );
        grad.addColorStop(0, '#aaffaa');
        grad.addColorStop(0.5, '#22cc22');
        grad.addColorStop(1, '#005500');
        ctx.fillStyle = grad;
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}
