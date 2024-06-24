import Entity from "./entity";
import hero from "../assets/entity/hero/hero.png";
import heroSprite from "../sprites/hero";
import mainConstants from "../constants/mainConstants";
import Tile from "./tile";
import Point from "./points";
import { canvas } from "../main";
import { boss, gruntType1Array } from "../screens/gameScreen";
import GruntType1 from "./gruntType1";
import GruntType2 from "./gruntType2";
import GruntType4 from "./gruntType4";
import heroConstants from "../constants/heroConstants";
import fireImageSrc from "../assets/ability/amaterasu.png"
import amaterasuSprite from "../sprites/amaterasuSprite";
import Boss from "./boss";

const fireImage = new Image;
fireImage.src = fireImageSrc;
const heroImage = new Image;
heroImage.src = hero;

export default class Hero extends Entity {
    isMoving: boolean = false;
    speedLimit: number = 3;
    weaponOffset: number = 10;
    abilityInterval: any = null;
    abilityDamage: number = heroConstants.abilityDamage;
    abilityDurability: number = heroConstants.abilityDurability;
    abilityRate: number = heroConstants.abilityRate;
    abilityInUse: boolean = false;
    inRangeEnemies: (GruntType1 | GruntType2 | GruntType4 | Boss)[] = [];
    abilityTime: Date = new Date;
    stamina: number = heroConstants.stamina
    staminaInterval: any;
    healthInterval: any;
    staminaUse:boolean=false;

    gemCount: number = 0;
    essenceCount: number = 0;
    weaponPositions: Point[] = [
        new Point(this.position.x + this.weaponOffset + this.width, this.position.y),
        new Point(this.position.x - this.weaponOffset, this.position.y),
        new Point(this.position.x + this.weaponOffset + this.width, this.position.y + this.height / 2),
        new Point(this.position.x - this.weaponOffset, this.position.y + this.height / 2),
        new Point(this.position.x + this.weaponOffset + this.width, this.position.y),
        new Point(this.position.x + this.weaponOffset + this.width, this.position.y),
    ];
    ability() {
        if (!this.abilityInUse && //checking i f hero is already using ability
            ((new Date).getTime() - //checking time to use ability
                this.abilityTime.getTime() > 15 * 1000) &&
            this.essenceCount
        ) {
            this.abilityInUse = true;
            heroConstants.amaterasuSound.currentTime = 2;
            heroConstants.amaterasuSound.play();
            this.inRangeEnemies = gruntType1Array.filter(
                (obj) => {
                    if (
                        obj.position.x > -mainConstants.mapPosition.x &&
                        obj.position.x < -mainConstants.mapPosition.x + canvas.width &&
                        obj.position.y > -mainConstants.mapPosition.y &&
                        obj.position.y < -mainConstants.mapPosition.y + canvas.height

                    ) {
                        return true;

                    }
                }

            );
            if (boss) {
                this.inRangeEnemies.push(boss)
            }

            setTimeout(
                () => {
                    this.inRangeEnemies = [];
                    this.abilityInUse = false;
                },
                this.abilityDurability * (this.essenceCount / heroConstants.maxEssence));
            this.abilityTime = new Date;
            this.essenceCount = 0;
        }
    }
    reheal() {
        this.healthInterval = setInterval(() => {
            if (this.healthpoint < 50) {
                if (!heroConstants.heavyBreath.played) {
                    heroConstants.heavyBreath.play();
                }
                this.healthpoint += 3;
            }

        }, 5000)
        this.staminaInterval = setInterval(
            () => {
                if (this.stamina < heroConstants.stamina) {
                    this.stamina += 1;
                }
                this.staminaUse=false;
            }, 2000

        );
    }
    run() {
        this.staminaUse=true;
        if (this.stamina > 0) {
            this.velocity = new Point(7, 7);
            this.stamina -= 0.1;
        }
    }

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

    updateWeaponPosition() {
        this.weaponPositions = [
            new Point(this.position.x + this.weaponOffset + this.width, this.position.y),
            new Point(this.position.x - this.weaponOffset, this.position.y),
            new Point(this.position.x + this.weaponOffset + this.width, this.position.y + this.height / 2),
            new Point(this.position.x - this.weaponOffset, this.position.y + this.height / 2),
            new Point(this.position.x + this.weaponOffset + this.width, this.position.y + this.height),
            new Point(this.position.x - this.weaponOffset, this.position.y + this.height),
        ];
    }
    moveLeft(left: boolean, ctx: CanvasRenderingContext2D) {
        const velocity = left ? this.velocity.x : -1 * this.velocity.x;
        this.lookingLeft = left;
        const chkcls = this.checkCollision();
        if (!chkcls.collided) {
            mainConstants.mapPosition.x += velocity;
            ctx.translate(velocity, 0);
        }
        else {
            const positionOffsetY = chkcls.collidedObj.position.y < this.position.y ? -1 : 1
            const positionOffsetX = chkcls.collidedObj.position.x < this.position.x ? -1 : 1
            mainConstants.mapPosition.x += positionOffsetX;
            mainConstants.mapPosition.y += positionOffsetY;
            ctx.translate(positionOffsetX, positionOffsetY);
        }
        this.updateWeaponPosition();
    }
    moveUp(up: boolean, ctx: CanvasRenderingContext2D) {
        const velocity = up ? this.velocity.y : -1 * this.velocity.y;
        const chkcls = this.checkCollision();
        if (!chkcls.collided) {
            mainConstants.mapPosition.y += velocity;
            ctx.translate(0, velocity);
        }
        else {
            const positionOffsetY = chkcls.collidedObj.position.y < this.position.y ? -1 : 1
            const positionOffsetX = chkcls.collidedObj.position.x < this.position.x ? -1 : 1
            mainConstants.mapPosition.x += positionOffsetX;
            mainConstants.mapPosition.y += positionOffsetY;
            ctx.translate(positionOffsetX, positionOffsetY);
        }

        this.updateWeaponPosition();

    }
    draw(ctx: CanvasRenderingContext2D) {
        this.position.x = canvas.width / 2 - mainConstants.mapPosition.x;
        this.position.y = canvas.height / 2 - mainConstants.mapPosition.y;
        this.inRangeEnemies.forEach(
            (obj) => {
                let position = Math.floor(this.spritePosition / 5) % amaterasuSprite.position.length;

                ctx.drawImage(
                    fireImage,
                    amaterasuSprite.position[position].x,
                    amaterasuSprite.position[position].y,
                    amaterasuSprite.width,
                    amaterasuSprite.height,
                    obj.position.x,
                    obj.position.y,
                    obj.width,
                    obj.height,
                );

                obj.healthpoint -= this.abilityDamage;
            }
        );

        const lookingDirection = this.lookingLeft ? heroSprite.positionLeft : heroSprite.positionRight;
        if (this.isMoving) {
            const staggerFrame = (20/this.velocity.x) * 0.9;
            let position = (Math.floor(this.spritePosition / staggerFrame) % (lookingDirection.length - 1)) + 1;

            this.width = heroSprite.positionLeft[position].width * window.innerHeight / 1200;
            this.height = heroSprite.positionLeft[position].height * window.innerHeight / 1200;
            ctx.drawImage(
                heroImage,
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
            this.width = heroSprite.positionLeft[0].width * window.innerHeight / 1200;
            this.height = heroSprite.positionLeft[0].height * window.innerHeight / 1200;
            ctx.drawImage(
                heroImage,
                lookingDirection[0].position.x,
                lookingDirection[0].position.y,
                lookingDirection[0].width,
                lookingDirection[0].height,
                this.position.x,
                this.position.y,
                this.width,
                this.height
            );
        }
        this.spritePosition++
    }

}