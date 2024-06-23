import Entity from "./entity";
import spwan from "../assets/entity/enemy/spwan.png"
import spwanSprite from "../sprites/spwanSprite";
import gruntType1Sprite from "../sprites/grunt[Type1]Sptite";
import Point from "./points";
import { hero } from "../screens/gameScreen";
import mainConstants from "../constants/mainConstants";
import Tile from "./tile";
import Hero from "./hero";
import gruntType3Sprite from "../sprites/grunt[Type3]sprite";
import upcounter from "../util/upcounter";


const spwanImage = new Image;
spwanImage.src = spwan;

spwanImage.onload=upcounter;

export default class GruntType1 extends Entity {
    isSpwaned: boolean = false;
    attackInterval: any = null;
    checkCollision() {
        let collided: boolean = false;
        let collidedHero: boolean = false;
        let collidedObj: Tile | Hero  = mainConstants.collideableObjs[0];
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
            if (!this.attackInterval) {
                this.attackInterval = setInterval(
                    () => {
                        if (hero.healthpoint > 0) {

                            hero.healthpoint -= this.damage;
                        }
                    },
                    1000/this.attackRate
                );
            }
        } else {
            clearInterval(this.attackInterval)
            this.attackInterval = null;
        }
        return { collided, collidedObj, collidedHero };

    }

    update() {
        const chkcls = this.checkCollision();
        this.lookingLeft = this.position.x > hero.position.x
        const distance = Math.sqrt(
            (this.position.x - hero.position.x) ** 2 +
            (this.position.y - hero.position.y) ** 2);
        if (distance>50){
            clearInterval(this.attackInterval)
            this.attackInterval=null;
        }
        const unitVector = new Point(
            (this.position.x - hero.position.x) / distance,
            (this.position.y - hero.position.y) / distance)
        const magnitudeVelocity = Math.sqrt(
            this.velocity.x*this.velocity.x +
            this.velocity.y*this.velocity.y
        )

        const resultantVelocity = new Point(
            -unitVector.x * magnitudeVelocity,
            -unitVector.y * magnitudeVelocity
        )
        if (!chkcls.collidedHero && !chkcls.collided ) {
            this.position.x += resultantVelocity.x;
            this.position.y += resultantVelocity.y;
        }
        if(chkcls.collided){
            const positionOffsetX = chkcls.collidedObj.position.x < this.position.x ? 1 : -1
            const positionOffsety = chkcls.collidedObj.position.y < this.position.y ? 1 : -1
            this.position.x += positionOffsetX;
            this.position.y += positionOffsety;
        }


    }

    draw(ctx: CanvasRenderingContext2D) {
        let gruntSprite;
        switch (this.gruntType){
            case 1:
                gruntSprite=gruntType1Sprite;
                break;
            case 3:
                gruntSprite=gruntType3Sprite;
                break;
        }
        const lookingDirection = this.lookingLeft ? gruntSprite!.positionLeft : gruntSprite!.positionRight;
        this.update();
        const staggerFrame = 5;
        let position = Math.floor(this.spritePosition / staggerFrame) % gruntSprite!.positionLeft.length;
        ctx.drawImage(
            this.gruntImage,
            lookingDirection[position].x,
            lookingDirection[position].y,
            gruntType3Sprite.width,
            gruntType3Sprite.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height,
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
        }

    }



}
