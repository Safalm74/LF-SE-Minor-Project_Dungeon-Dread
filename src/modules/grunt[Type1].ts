import Entity from "./entity";
import spwan from "../assets/entity/enemy/spwan.png"
import gruntType1 from "../assets/entity/enemy/grunts/type1.png"
import spwanSprite from "../sprites/spwanSprite";
import gruntType1Sprite from "../sprites/grunt[Type1]Sptite";
import Point from "./points";
import { hero } from "../screens/game";

const spwanImage = new Image;
const gruntType1Image = new Image;
spwanImage.src = spwan;
gruntType1Image.src = gruntType1;

export default class GruntType1 extends Entity {
    isSpwaned: boolean = false;

   

    update() {
        
        this.position.x +=this.velocity.x;
        this.position.y +=this.velocity.y;

    }

    draw(ctx: CanvasRenderingContext2D) {
        const lookingDirection = this.lookingLeft ? gruntType1Sprite.positionLeft : gruntType1Sprite.positionRight;

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