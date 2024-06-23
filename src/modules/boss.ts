import Entity from "./entity";
import bossSprite from "../sprites/bossSprite";

import bossImageSrc from "../assets/entity/enemy/boss/boss.png"
import { hero, spitArray } from "../screens/gameScreen";
import Point from "./points";
import gruntConstants from "../constants/gruntConstants";
import weaponRangeConstants from "../constants/weaponRangeConstants";
import Spit from "./spit";
import progressBar from "../util/bar";
import upcounter from "../util/upcounter";

const bossImage = new Image;
bossImage.src = bossImageSrc;
bossImage.onload=upcounter;

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
    checkCollision() {
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
    update() {
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
    spitTohero() {
        if (!this.attackInterval) {
            this.spitInterval = setInterval(
                () => {
                    if (hero) {
                        const trackingEnemyObjPosition = new Point(
                            hero.position.x,
                            hero.position.y)
                        const vector = this.position.pointDifference(trackingEnemyObjPosition);
                        const magnitude = this.position.distanceBetween(trackingEnemyObjPosition);
                        const unitVector = new Point(
                            vector.x / magnitude, vector.y / magnitude
                        );

                        const spitObj = new Spit(
                            new Point(this.position.x + this.width / 2, this.position.y + this.width / 2),
                            this.damage,
                            new Point(
                                -unitVector.x * weaponRangeConstants.bulletVelocity * 0.3,
                                -unitVector.y * weaponRangeConstants.bulletVelocity * 0.3),
                            this.position,
                        );
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
        const lookingDirection = this.lookingLeft ?
            bossSprite.position :
            bossSprite.position;
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
            bossSprite.position[position].x,
            bossSprite.position[position].y,
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