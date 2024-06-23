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
                this.abilityTime.getTime() > 15*1000) &&
            this.essenceCount
        ) {
            this.abilityTime = new Date;
            this.abilityInUse = true;
            heroConstants.amaterasuSound.currentTime=2;
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
        
                this.essenceCount=0;
            }
    }
    reheal() {
        setInterval(() => {
            if (this.healthpoint < 50) {
                this.healthpoint += 3
            }
        }, 5000)
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
            const staggerFrame = 5;
            let position = Math.floor(this.spritePosition / staggerFrame) % lookingDirection.length;
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

        if (this.healthpoint < 0) {
            // homeScreen(ctx)
        }

        this.spritePosition++
    }

}