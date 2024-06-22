import Point from "./points";
import gemImageSrc from "../assets/gem/gem.png"
import gemSprite from "../sprites/gemSprite";
import { hero } from "../screens/gameScreen";

const gemImage = new Image;
gemImage.src = gemImageSrc;
interface IGem {
    position: Point;
    value: number;
    spritePostion: number;
    width: number;
    height: number;

}

export default class Gem implements IGem {
    position: Point;
    value: number;
    spritePostion: number = 0;
    width: number;
    height: number;

    constructor(
        position: Point,
        value: number,
        width: number,
        height: number

    ) {
        this.position = position;
        this.value = value;
        this.width = width;
        this.height = height;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const staggerFrame = 5;
        const position = Math.floor(
            this.spritePostion / staggerFrame
        ) % gemSprite[1].length
        ctx.drawImage(
            gemImage,
            gemSprite[1][position].position.x,
            gemSprite[1][position].position.y,
            gemSprite[1][position].width,
            gemSprite[1][position].height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }
    collected() {
        if (
            hero.position.y + hero.height >= this.position.y &&
            hero.position.y <= this.position.y + this.height &&
            hero.position.x + hero.width >= this.position.x &&
            hero.position.x <= this.position.x + this.width
        ) {
            hero.gemCount += this.value;

            return false;
        }
        return true;
    }


}