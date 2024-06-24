//modules
import Point from "./points";
//constants
import heroConstants from "../constants/heroConstants";
import stateConstants from "../constants/stateConstants";
import mainConstants from "../constants/mainConstants";
//sprite information
import gemSprite from "../sprites/gemSprite";
//objs
import { hero } from "../screens/gameScreen";


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
        const staggerFrame = 5; //to slowdown animation
        const position = Math.floor( //sprite image position
            this.spritePostion / staggerFrame
        ) % gemSprite[1].length
        ctx.drawImage(
            mainConstants.gemImage,
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
    collected() {//checking collision
        const offset=20; //offset to collect gem without actually collising to hero
        if (
            hero.position.y + hero.height+offset >= this.position.y &&
            hero.position.y -offset <= this.position.y + this.height &&
            hero.position.x + hero.width +offset >= this.position.x &&
            hero.position.x -offset<= this.position.x + this.width
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