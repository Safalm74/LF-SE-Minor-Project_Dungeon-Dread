import Entity from "./entity";
import hero from "../assets/entity/hero/hero.png";
import heroSprite from "../sprites/hero";
import mainConstants from "../constants/mainConstants";
import Tile from "./tile";
import Point from "./points";
import { canvas } from "../main";
const heroImage = new Image;
heroImage.src = hero;


export default class Hero extends Entity {
    isMoving: boolean = false;
    speedLimit: number = 3;
    weaponOffset: number = 10;
    weaponPositions: Point[] = [
        new Point(this.position.x + this.weaponOffset + this.width, this.position.y),
        new Point(this.position.x - this.weaponOffset, this.position.y),
        new Point(this.position.x + this.weaponOffset + this.width, this.position.y + this.height / 2),
        new Point(this.position.x - this.weaponOffset, this.position.y + this.height / 2),
        new Point(this.position.x + this.weaponOffset + this.width, this.position.y),
        new Point(this.position.x + this.weaponOffset + this.width, this.position.y),
    ];
    ability(){
        console.log('using ability');
    }
    reheal(){
        setInterval(()=>{
            if(this.healthpoint<50){
                this.healthpoint +=3
            }

        
        },5000)
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
        const lookingDirection = this.lookingLeft ? heroSprite.positionLeft : heroSprite.positionRight;
        if (this.isMoving) {
            const staggerFrame = 5;
            let position = Math.floor(this.spritePosition / staggerFrame) % 6;
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
            this.spritePosition++
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

    }
}