import Entity from "./entity";
import spwan from "../assets/entity/enemy/spwan.png"
import spwanSprite from "../sprites/spwanSprite";
import Point from "./points";
import { hero } from "../screens/gameScreen";
import mainConstants from "../constants/mainConstants";
import Tile from "./tile";
import Hero from "./hero";
import gruntConstants from "../constants/gruntConstants";
import gruntType4Sprite from "../sprites/grunt[Type4]Sprite";
import upcounter from "../util/upcounter";


const spwanImage = new Image;
spwanImage.src = spwan;

spwanImage.onload = upcounter;

export default class GruntType4 extends Entity {
    isSpwaned: boolean = false;
    attackInterval: any = null;
    isAttacking: boolean = false;

    checkCollision() {
        let collided: boolean = false;
        let collidedHero: boolean = false;
        let collidedObj: Tile | Hero = mainConstants.collideableObjs[0];
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
        if (

            hero.position.y + hero.height / 2 >= this.position.y &&
            hero.position.y <= this.position.y + this.height &&
            hero.position.x + hero.width >= this.position.x &&
            hero.position.x + hero.width <= this.position.x + hero.width + this.width
        ) {

            collidedHero = true;
            collidedObj = hero;
        }
        return { collided, collidedObj, collidedHero };

    }

    update() {
        const chkcls = this.checkCollision();
        this.lookingLeft = this.position.x > hero.position.x
        const distance = Math.sqrt(
            (this.position.x - hero.position.x) ** 2 +
            (this.position.y - hero.position.y) ** 2);
        if (distance > 50) {
            clearInterval(this.attackInterval)
            this.attackInterval = null;

        }
        const unitVector = new Point(
            (this.position.x - hero.position.x) / distance,
            (this.position.y - hero.position.y) / distance)
        const magnitudeVelocity = Math.sqrt(2)

        this.velocity = new Point(
            -unitVector.x * magnitudeVelocity,
            -unitVector.y * magnitudeVelocity
        )
        if (!chkcls.collidedHero) {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.isAttacking = false;
        }
        else {
            this.isAttacking = true;
        }
        if (!chkcls.collided) {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        } else {
            const positionOffsetX = chkcls.collidedObj.position.x < this.position.x ? 1 : -1
            const positionOffsety = chkcls.collidedObj.position.y < this.position.y ? 1 : -1
            this.position.x += positionOffsetX;
            this.position.y += positionOffsety;
        }


    }

    draw(ctx: CanvasRenderingContext2D) {
        this.update();
        if (this.isAttacking) {

            const lookingDirection = this.lookingLeft ?
                gruntType4Sprite.attackLeft :
                gruntType4Sprite.attackRight;
            const staggerFrame = 10;
            const position = Math.floor(this.spritePosition /
                staggerFrame) %
                gruntType4Sprite.attackLeft.length;

            this.height = lookingDirection[position].height;
            this.width = lookingDirection[position].width;



            if (position === 2 && this.spritePosition % staggerFrame === 0) {
                hero.healthpoint -= this.damage;
            }
            ctx.drawImage(
                gruntConstants.type3.image,
                lookingDirection[position].position.x,
                lookingDirection[position].position.y,
                lookingDirection[position].width,
                lookingDirection[position].height,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            );

        }
        else {

            const lookingDirection = this.lookingLeft ?
                gruntType4Sprite.positionLeft :
                gruntType4Sprite.positionRight;
            const staggerFrame = 8;
            const position = Math.floor(this.spritePosition /
                staggerFrame) %
                gruntType4Sprite.positionLeft.length;

            this.width = gruntType4Sprite.width;
            this.height = gruntType4Sprite.height;
            ctx.drawImage(
                gruntConstants.type3.image,
                lookingDirection[position].x,
                lookingDirection[position].y,
                gruntType4Sprite.width,
                gruntType4Sprite.height,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            );
        }
        this.spritePosition++
    }


    spwan(ctx: CanvasRenderingContext2D) {
        const staggerFrame = 10;
        const position = Math.floor(this.spritePosition / staggerFrame) % 10;

        ctx.drawImage(
            spwanImage,
            spwanSprite.position[position].x,
            spwanSprite.position[position].y,
            spwanSprite.width,
            spwanSprite.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        this.spritePosition++
        if (position >= 9) {
            this.isSpwaned = true;
            this.spritePosition = 0;
        }

    }



}
