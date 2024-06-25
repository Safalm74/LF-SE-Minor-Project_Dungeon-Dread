//modules
import Entity from "./entity";
import Point from "./points";
import Spit from "./spit";
//constants
import weaponRangeConstants from "../constants/weaponRangeConstants";
import gruntConstants from "../constants/gruntConstants";
//sprite information
import spwanSprite from "../sprites/spwanSprite";
import gruntType2Sprite from "../sprites/grunt[Type2]Sprite";
//objs
import { hero, spitArray } from "../screens/gameScreen";
//spider enemy
export default class GruntType2 extends Entity {
    isSpwaned: boolean = false;
    attackInterval: any = null;
    attackRadius: number = 400;
    spitRange: number = 200;
    update() {//movement similar to type1and3
        const distance = Math.sqrt(
            (this.position.x - hero.position.x) ** 2 +
            (this.position.y - hero.position.y) ** 2);

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
        if (distance > this.spitRange) {
            clearInterval(this.attackInterval)
            this.attackInterval = null;
            this.position.x += resultantVelocity.x;
            this.position.y += resultantVelocity.y;
        } else {
            this.spitHero();
        }
    }
    spitHero() {//spits from certain distance, spitting is similar to boss
        if (!this.attackInterval) {
            this.attackInterval = setInterval(
                () => {
                    if (hero) {

                        const trackingEnemyObjPosition = new Point(
                            hero.position.x,
                            hero.position.y)
                        const vector = this.position
                            .pointDifference(trackingEnemyObjPosition);
                        const magnitude = this.position
                            .distanceBetween(trackingEnemyObjPosition);
                        const unitVector = new Point(
                            vector.x / magnitude, vector.y / magnitude
                        );

                        const spitObj = new Spit(
                            new Point(this.position.x + this.width / 2, this.position.y + this.width / 2),
                            this.damage,
                            new Point( //spit velocity 30% of bullet velocity
                                -unitVector.x *
                                weaponRangeConstants.bulletVelocity *
                                0.3,
                                -unitVector.y *
                                weaponRangeConstants.bulletVelocity *
                                0.3),
                            this.position,
                        );

                        spitArray.push(spitObj);
                    }

                },
                1000 / this.attackRate
            );
        }
    }
    draw(ctx: CanvasRenderingContext2D) {
        const lookingDirection = gruntType2Sprite
        this.update();
        const staggerFrame = 5;
        let position = Math.floor(this.spritePosition /
            staggerFrame) %
            lookingDirection.position.length;
        this.width = lookingDirection.position[position].width;
        this.height = lookingDirection.position[position].height;
        ctx.drawImage(
            this.gruntImage,
            lookingDirection.position[position].position.x,
            lookingDirection.position[position].position.y,
            lookingDirection.position[position].width,
            lookingDirection.position[position].height,
            this.position.x,
            this.position.y,
            lookingDirection.position[position].width *
            gruntConstants.type2.width,
            lookingDirection.position[position].height *
            gruntConstants.type2.height,
        );
        this.spritePosition++
    }
    spwan(ctx: CanvasRenderingContext2D) {
        const staggerFrame = 10;
        let position = Math.floor(this.spritePosition /
            staggerFrame) % spwanSprite.position.length;
        ctx.drawImage(
            gruntConstants.spwanImage,
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
