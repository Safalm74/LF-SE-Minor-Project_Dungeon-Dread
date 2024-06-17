import Entity from "./entity";
import hero from "../assets/entity/hero/hero.png";
import heroSprite from "../sprites/hero";
import mainConstants from "../constants/mainConstants";
import Tile from "./tile";
import mapConstants from "../constants/mapConstants";

const heroImage = new Image;
heroImage.src = hero;


export default class Hero extends Entity {
    isMoving: boolean = false;
    speedLimit: number = 3;

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

    moveLeft(left: boolean) {
        const velocity = left ? this.velocity.x : -1 * this.velocity.x;

        this.lookingLeft = left;
        const chkcls = this.checkCollision();
        if (!chkcls.collided) {
            mapConstants.displayPosition.x += velocity;
            mapConstants.mapTileArray.forEach(
                (objy) => {
                    objy.forEach(
                        (objx) => {
                            objx.position.x += velocity;
                        }
                    );
                }
            );

        }
        else {
            const positionOffsetY = chkcls.collidedObj.position.y < this.position.y ? 1 : -1
            const positionOffsetX = chkcls.collidedObj.position.x < this.position.x ? 1 : -1
            mapConstants.mapTileArray.forEach(
                (objy) => {
                    objy.forEach(
                        (objx) => {
                            objx.position.y -= positionOffsetY;
                            objx.position.x -= positionOffsetX
                        }
                    );
                }
            );
        }

    }
    moveUp(up: boolean) {
        const velocity = up ? this.velocity.y : -1 * this.velocity.y;
        const chkcls = this.checkCollision();
        if (!chkcls.collided) {
            mapConstants.displayPosition.y += velocity;
            mapConstants.mapTileArray.forEach(
                (objy) => {
                    objy.forEach(
                        (objx) => {
                            objx.position.y += velocity;
                        }
                    );
                }
            );

        }
        else {

            const positionOffsetY = chkcls.collidedObj.position.y < this.position.y ? 1 : -1
            const positionOffsetX = chkcls.collidedObj.position.x < this.position.x ? 1 : -1
            mapConstants.mapTileArray.forEach(
                (objy) => {
                    objy.forEach(
                        (objx) => {
                            objx.position.y -= positionOffsetY;
                            objx.position.x -= positionOffsetX
                        }
                    );
                }
            );
        }

    }
    draw(ctx: CanvasRenderingContext2D) {

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