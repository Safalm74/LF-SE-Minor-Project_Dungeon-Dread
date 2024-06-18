import Point from "./points";

interface IBullet {
    startPoint: Point;
    endPoint: Point;
    damage: number;
    isHit: boolean;
    velocity: Point;
    gunPosition: Point;

}

export default class Bullet implements IBullet {
    startPoint: Point;
    endPoint: Point;
    damage: number;
    isHit: boolean = false;
    velocity: Point;
    gunPosition: Point;

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

    draw(ctx: CanvasRenderingContext2D) {
        //updating points
        this.startPoint = this.startPoint.add(this.velocity);
        this.endPoint = this.endPoint.add(this.velocity);
        // //drawing
        ctx.translate(this.gunPosition.x, this.gunPosition.y)
        ctx.beginPath();
        ctx.fillStyle = "white";
        // ctx.fillRect(this.endPoint.x, this.endPoint.y,100,100)
        ctx.moveTo(this.startPoint.x, this.startPoint.y);
        ctx.lineTo(this.endPoint.x, this.endPoint.y);
        ctx.stroke();

        ctx.translate(-this.gunPosition.x, -this.gunPosition.y)
    }

}