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
        objArray: (GruntType1 | GruntType2|GruntType4)[],
        boss:Boss|null=null
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
        if (boss){

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
        //updating points
        this.startPoint = this.startPoint.add(this.velocity);
        this.endPoint = this.endPoint.add(this.velocity);
        // //drawing line as a bullet
        ctx.beginPath();
        ctx.strokeStyle = "gold";
        ctx.moveTo(this.startPoint.x, this.startPoint.y);
        ctx.lineTo(this.endPoint.x, this.endPoint.y);
        ctx.lineWidth = 3;
        ctx.stroke();
    }
}