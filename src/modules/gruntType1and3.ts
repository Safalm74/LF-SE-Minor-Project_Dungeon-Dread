//modules
import Entity from "./entity";
import Point from "./points";
import Tile from "./tile";
import Hero from "./hero";
//constants
import mainConstants from "../constants/mainConstants";
//sprite information
import spawnSprite from "../sprites/spawnSprite";
import gruntType1Sprite from "../sprites/grunt[Type1]Sprite";
import gruntType3Sprite from "../sprites/grunt[Type3]Sprite";
//objs
import { hero } from "../screens/gameScreen";
import gruntConstants from "../constants/gruntConstants";
//zombie and blue small enemy
export default class GruntType1and3 extends Entity {
    isSpawned: boolean = false;
    attackInterval: ReturnType<typeof setInterval> | undefined = undefined;
    checkCollision() { //function to check collision
        let collided: boolean = false;//to identify collision
        let collidedHero: boolean = false;//to flag collided obj is hero
        let collidedObj: Tile | Hero = mainConstants.collideableObjs[0];//assigning obj instead of null
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
                            hero.onAttack=true;
                            hero.healthpoint -= this.damage;
                        }
                    },
                    1000 / this.attackRate
                );
            }
        } else {
            clearInterval(this.attackInterval)
            this.attackInterval = undefined;
            hero.onAttack=false;
        }
        return { collided, collidedObj, collidedHero };
    }
    update() { //function that updates position of grunt
        const chkcls = this.checkCollision();
        /**
         * calculating vector 
         * then unit vector
         * multiplying with magnitude 
         */
        this.lookingLeft = this.position.x > hero.position.x
        const distance = Math.sqrt(
            (this.position.x - hero.position.x) ** 2 +
            (this.position.y - hero.position.y) ** 2);
        if (distance > 50) { //if hero is far clearing attack interval
            clearInterval(this.attackInterval)
            this.attackInterval = undefined;
        }
        const unitVector = new Point(
            (this.position.x - hero.position.x) / distance,
            (this.position.y - hero.position.y) / distance)
        const magnitudeVelocity = Math.sqrt(
            this.velocity.x * this.velocity.x +
            this.velocity.y * this.velocity.y
        )

        const resultantVelocity = new Point(
            -unitVector.x * magnitudeVelocity,
            -unitVector.y * magnitudeVelocity
        )
        //checking collision condition before moving
        if (!chkcls.collidedHero && !chkcls.collided) {
            this.position.x += resultantVelocity.x;
            this.position.y += resultantVelocity.y;
        }
        //adjusting position to avoid boundry overlapping
        if (chkcls.collided) {
            const positionOffsetX = chkcls.collidedObj.position.x < this.position.x ? 1 : -1
            const positionOffsety = chkcls.collidedObj.position.y < this.position.y ? 1 : -1
            this.position.x += positionOffsetX;
            this.position.y += positionOffsety;
        }
    }
    //drawing grunt
    draw(ctx: CanvasRenderingContext2D) {
        if (this.isSpawned) {
            let gruntSprite;
            switch (this.gruntType) {
                case 1:
                    gruntSprite = gruntType1Sprite;
                    break;
                case 3:
                    gruntSprite = gruntType3Sprite;
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
                gruntSprite!.width,
                gruntSprite!.height,
                this.position.x,
                this.position.y,
                this.width,
                this.height,
            );
            this.spritePosition++
        }
    }
    spawn(ctx: CanvasRenderingContext2D) {
        const staggerFrame = 4;
        let position = Math.floor(this.spritePosition /
            staggerFrame) %
            spawnSprite.position.length;
        ctx.drawImage(
            gruntConstants.spawnImage,
            spawnSprite.position[position].x,
            spawnSprite.position[position].y,
            spawnSprite.width,
            spawnSprite.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        this.spritePosition++
        if (position >= 9) {
            this.isSpawned = true;
            this.spritePosition = 0;
        }

    }
}
