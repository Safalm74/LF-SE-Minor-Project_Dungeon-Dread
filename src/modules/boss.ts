//modules
import Entity from "./entity";
import Point from "./points";
import Spit from "./spit";
//constants
import gruntConstants from "../constants/gruntConstants";
import weaponRangeConstants from "../constants/weaponRangeConstants";
//utils
import progressBar from "../util/bar";
//sprite information
import bossSprite from "../sprites/bossSprite";
//objs and array
import { hero, spitArray } from "../screens/gameScreen";
//angler monster
export default class Boss extends Entity {
    speedToggle: boolean = false;
    attackInterval: any = null;
    spitInterval: any = null;

    changeSpeed() {
        this.spitTohero();
        this.spitInterval = setInterval(
            () => {
                this.velocity = this.speedToggle ?
                    gruntConstants.boss.velocity :
                    gruntConstants.boss.velocityFast;
                this.speedToggle = this.speedToggle ?
                    false :
                    true;
            }, 5000
        );
    }
    checkCollision() {//checking rectangular collision
        if (

            hero.position.y + hero.height / 2 >= this.position.y &&
            hero.position.y <= this.position.y + this.height &&
            hero.position.x + hero.width >= this.position.x &&
            hero.position.x + hero.width <= this.position.x + hero.width + this.width
        ) {
            return true
        }
        return false;
    }
    update() {//function that moves, attacks
        if (!this.checkCollision()) {
            this.moveTowardsHero();
            clearInterval(this.attackInterval)
            this.attackInterval = null;
        }
        else {

            if (!this.attackInterval) {
                this.attackInterval = setInterval(
                    () => {
                        if (hero.healthpoint > 0) {

                            hero.healthpoint -= this.damage;
                        }
                    },
                    1000 / this.attackRate
                );
            }
        }
    }
    spitTohero() { //spit,another ability of boss
        if (!this.spitInterval) {
            this.spitInterval = setInterval(
                () => {
                    /*calculating 
                    1. vector from boss to hero
                    2. calculating unit vector
                    3. multiplying with magnitude of velocity
                    unit vector */
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
                        //creating spit object
                        const spitObj = new Spit(
                            new Point(this.position.x + this.width / 2, //this.width / 2=> to move towards center of boss
                                this.position.y + this.width / 2),
                            this.damage,
                            new Point(
                                -unitVector.x * weaponRangeConstants.bulletVelocity * 0.3, //30% of bullet velocity
                                -unitVector.y * weaponRangeConstants.bulletVelocity * 0.3),
                            this.position,
                        );
                        //pushing to spit obj
                        spitArray.push(spitObj);
                    }
                },
                1000 / this.attackRate
            );
        }
    }
    moveTowardsHero() {
        const vector = this.position.pointDifference(hero.position);
        const magnitude = this.position.distanceBetween(hero.position);
        const resultantVelocity = new Point(
            -(vector.x / magnitude) *
            this.velocity.x,
            -(vector.y / magnitude) *
            this.velocity.y
        );
        this.position.x += resultantVelocity.x;
        this.position.y += resultantVelocity.y;
    }
    draw(ctx: CanvasRenderingContext2D) {
        this.update();
        this.lookingLeft = hero.position.x < //checking looking direction from center of boss
            this.position.x +
            this.width / 2;
        const lookingDirection = this.lookingLeft ?
            bossSprite.positionLeft :
            bossSprite.positionRight;
        const bossImage = this.lookingLeft ?
            gruntConstants.boss.imageLeft :
            gruntConstants.boss.imageRight;
        const staggerFrame = 5;
        let position = Math.floor(this.spritePosition /
            staggerFrame) %
            lookingDirection.length;
        this.width = bossSprite.width *
            gruntConstants.boss.width;
        this.height = bossSprite.height *
            gruntConstants.boss.height;
        ctx.drawImage(
            bossImage,
            lookingDirection[position].x,
            lookingDirection[position].y,
            bossSprite.width,
            bossSprite.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
        progressBar(
            ctx,
            this.position,
            this.healthpoint,
            gruntConstants.boss.healthPoint,
            200,
            5
        );
        this.spritePosition++
    }
}