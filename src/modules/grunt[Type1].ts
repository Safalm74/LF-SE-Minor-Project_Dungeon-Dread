import Entity from "./entity";
import spwan from "../assets/entity/enemy/spwan.png"
import gruntType1 from "../assets/entity/enemy/grunts/type1.png"
import spwanSprite from "../sprites/spwanSprite";
import gruntType1Sprite from "../sprites/grunt[Type1]Sptite";
import Point from "./points";
import { hero } from "../screens/game";
import mainConstants from "../constants/mainConstants";
import Tile from "./tile";

const spwanImage = new Image;
const gruntType1Image = new Image;
spwanImage.src = spwan;
gruntType1Image.src = gruntType1;

export default class GruntType1 extends Entity {
    isSpwaned: boolean = false;

    checkCollision() {
        let collided: boolean = false;
        let collidedObj: Tile = mainConstants.collideableObjs[0];
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

    update() {
        const chkcls = this.checkCollision();
        this.lookingLeft = this.position.x > hero.position.x
        const distance = Math.sqrt(
            (this.position.x - hero.position.x) ** 2 +
            (this.position.y - hero.position.y) ** 2);
        const unitVector = new Point(
            (this.position.x - hero.position.x) / distance,
            (this.position.y - hero.position.y) / distance)
        const magnitudeVelocity = Math.sqrt(2)
        this.velocity = new Point(
            -unitVector.x * magnitudeVelocity,
            -unitVector.y * magnitudeVelocity
        )
        if (!chkcls.collided) {

            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }


    }

    draw(ctx: CanvasRenderingContext2D) {
        const lookingDirection = this.lookingLeft ? gruntType1Sprite.positionLeft : gruntType1Sprite.positionRight;
        this.update();
        const staggerFrame = 5;
        let position = Math.floor(this.spritePosition / staggerFrame) % 10;
        ctx.drawImage(
            gruntType1Image,
            lookingDirection[position].x,
            lookingDirection[position].y,
            gruntType1Sprite.width,
            gruntType1Sprite.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
        this.spritePosition++
    }


    spwan(ctx: CanvasRenderingContext2D) {
        const staggerFrame = 10;
        let position = Math.floor(this.spritePosition / staggerFrame) % 10;
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
            this.velocity = new Point(1, 1);
        }

    }



}