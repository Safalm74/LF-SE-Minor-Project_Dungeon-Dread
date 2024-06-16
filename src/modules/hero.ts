import Entity from "./entity";
import hero from "../assets/entity/hero/hero.png";
import heroSprite from "../sprites/hero";
import Point from "./points";
import mainConstants from "../constants/mainConstants";
import Tile from "./tile";

const heroImage = new Image;
heroImage.src = hero;


export default class Hero extends Entity {
    isMoving: boolean = false;
    acceleration: Point = new Point(1, 1);
    speedLimit: number = 5;


    checkCollision() {
        let collided: boolean = false;
        let collidedObj: Tile =mainConstants.collideableObjs[0];
        mainConstants.collideableObjs.forEach(
            (obj) => {
                if (
                    obj.position.y + obj.tileSize >= this.position.y &&
                    obj.position.y <= this.position.y + this.height &&
                    obj.position.x + obj.tileSize >= this.position.x &&
                    obj.position.x + obj.tileSize <= this.position.x + obj.tileSize + this.width
                ) {
                    collided = true;
                    collidedObj = obj
                }
            }

        );
        return { collided, collidedObj };

    }

    moveLeft(
        left: boolean
    ) {
        const acc = left ? -1 * this.acceleration.x : this.acceleration.x;
        if (Math.abs(this.velocity.x) < this.speedLimit) {
            this.velocity.x += acc;
        }
        this.lookingLeft = left

    }
    moveUp(up: boolean) {
        const acc = up ? -1 * this.acceleration.y : this.acceleration.y;
        if (Math.abs(this.velocity.y) < this.speedLimit) {
            this.velocity.y += acc;
        }

    }
    draw(ctx: CanvasRenderingContext2D) {
        const chkcls = this.checkCollision();
        if (!chkcls.collided) {
            if (
                Math.abs(this.velocity.x) > 1 ||
                Math.abs(this.velocity.y) > 2
            ) {
                this.position.x += this.velocity.x;
                this.position.y += this.velocity.y;
                this.isMoving = true;
            }
        }
        else {

            const positionOffsetX = chkcls.collidedObj.position.x < this.position.x ? 1 : -1
            const positionOffsety = chkcls.collidedObj.position.y < this.position.y ? 1 : -1
            this.position.x += positionOffsetX;
            this.position.y += positionOffsety;
        }

        const lookingDirection = this.lookingLeft ? heroSprite.positionLeft : heroSprite.positionRight;
        if (this.isMoving) {
            const staggerFrame = 5;
            let position = Math.floor(this.spritePosition / staggerFrame) % 4;
            ctx.drawImage(
                heroImage,
                lookingDirection[position].x,
                lookingDirection[position].y,
                heroSprite.width,
                heroSprite.height,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            );
            this.spritePosition++
        }
        else {
            ctx.drawImage(
                heroImage,
                lookingDirection[0].x,
                lookingDirection[0].y,
                heroSprite.width,
                heroSprite.height,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            );
        }

    }
}