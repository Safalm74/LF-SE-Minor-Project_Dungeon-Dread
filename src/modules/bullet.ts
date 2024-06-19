import Point from "./points";
import GruntType1 from "./grunt[Type1]";

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

    checkOnhit(
        objArray: GruntType1[]
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
    }

    draw(ctx: CanvasRenderingContext2D) {
        //updating points
        this.startPoint = this.startPoint.add(this.velocity);
        this.endPoint = this.endPoint.add(this.velocity);
        // //drawing
        ctx.beginPath();
        ctx.strokeStyle = "gold";
        ctx.moveTo(this.startPoint.x, this.startPoint.y);
        ctx.lineTo(this.endPoint.x, this.endPoint.y);
        ctx.lineWidth = 2;
        ctx.stroke();

    }

}