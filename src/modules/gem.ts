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
const MAGNET_RADIUS = 120;
const MAGNET_SPEED = 4;

//gem image
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
        this.position = new Point(position.x, position.y);
        this.value = value;
        this.width = width;
        this.height = height;
    }
    draw(ctx: CanvasRenderingContext2D) {
        // magnet: pull gem toward hero when close
        const dx = hero.position.x - this.position.x;
        const dy = hero.position.y - this.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAGNET_RADIUS && dist > 1) {
            this.position.x += (dx / dist) * MAGNET_SPEED;
            this.position.y += (dy / dist) * MAGNET_SPEED;
        }

        const staggerFrame = 5;
        const position = Math.floor(this.spritePostion / staggerFrame) % gemSprite[1].length;
        // glow when in magnet range
        if (dist < MAGNET_RADIUS) {
            ctx.save();
            ctx.shadowColor = 'rgba(120,255,180,0.9)';
            ctx.shadowBlur = 12 + Math.sin(this.spritePostion * 0.3) * 4;
        }
        ctx.drawImage(
            mainConstants.gemImage,
            gemSprite[1][position].position.x,
            gemSprite[1][position].position.y,
            gemSprite[1][position].width,
            gemSprite[1][position].height,
            this.position.x,
            this.position.y,
            gemSprite[1][position].width * 0.3,
            gemSprite[1][position].height * 0.3
        );
        if (dist < MAGNET_RADIUS) ctx.restore();
        this.spritePostion++;
    }
    collected() {
        const offset = 20;
        if (
            hero.position.y + hero.height + offset >= this.position.y &&
            hero.position.y - offset <= this.position.y + this.height &&
            hero.position.x + hero.width + offset >= this.position.x &&
            hero.position.x - offset <= this.position.x + this.width
        ) {
            if (!stateConstants.ismute) {
                if (mainConstants.gemSound) {
                    mainConstants.gemSound.pause();
                    mainConstants.gemSound.currentTime = 0;
                }
                mainConstants.gemSound.play();
            }
            hero.gemCount += this.value;
            if (hero.essenceCount < heroConstants.maxEssence) {
                hero.essenceCount += 1;
            }
            return false;
        }
        return true;
    }
}
