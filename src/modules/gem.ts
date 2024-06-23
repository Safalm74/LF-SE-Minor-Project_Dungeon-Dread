import Point from "./points";
import gemImageSrc from "../assets/gem/gem.png"
import gemSprite from "../sprites/gemSprite";
import { hero } from "../screens/gameScreen";
import heroConstants from "../constants/heroConstants";
import stateConstants from "../constants/stateConstants";
import mainConstants from "../constants/mainConstants";
import upcounter from "../util/upcounter";

const gemImage = new Image;
gemImage.src = gemImageSrc;

gemImage.onload=upcounter;
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
            gemSprite[1][position].width*0.3,
            gemSprite[1][position].height*0.3
        );
        this.spritePostion++;
    }
    collected() {
        if (
            hero.position.y + hero.height+20 >= this.position.y &&
            hero.position.y -20 <= this.position.y + this.height &&
            hero.position.x + hero.width +20 >= this.position.x &&
            hero.position.x -20<= this.position.x + this.width
        ) {
            if(!stateConstants.ismute){
                if(mainConstants.gemSound){
                    mainConstants.gemSound.pause();
                    mainConstants.gemSound.currentTime=0;
                }
                mainConstants.gemSound.play();
            }
            hero.gemCount += this.value;
            if (hero.essenceCount<heroConstants.maxEssence){
                hero.essenceCount +=1
            }

            return false;
        }
        return true;
    }


}