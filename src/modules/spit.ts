import Point from "./points";
import spitImageSrc from "../assets/weapon/spit/spit.png";
import { hero } from "../screens/gameScreen";

const spitImage = new Image;
spitImage.src = spitImageSrc;


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
            this.position.x - this.radius > hero.position.x &&
            this.position.x + this.radius < hero.position.x + hero.width &&
            this.position.y - this.radius > hero.position.y &&
            this.position.y + this.radius < hero.position.y + hero.height

        ) {
            console.log('hit')
            this.isHit = true;
            hero.healthpoint -= this.damage;
        }

    }
    update(){
        this.position.x +=this.velocity.x
        this.position.y +=this.velocity.y
    }
    draw(ctx: CanvasRenderingContext2D) {
        this.update();
        // //drawing
        ctx.beginPath();
        ctx.fillStyle="green"
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

}