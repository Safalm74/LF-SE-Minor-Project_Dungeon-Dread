import Entity from "./entity";
import hero from "../assets/entity/hero/hero.png";
import heroSprite from "../sprites/hero";
import Point from "./points";

const heroImage= new Image;
heroImage.src=hero;
export default class Hero extends Entity{
    isMoving:boolean=false;
    constructor(
        position: Point,
        team: "red" | "blue",
        lookingLeft: boolean,
        healthpoint: number,
        width: number,
        height: number
    ){
        super(
            position,
            team,
            lookingLeft,
            healthpoint,
            width,
            height
        );
    }
    draw(ctx:CanvasRenderingContext2D){
        const lookingDirection = this.lookingLeft?heroSprite.positionLeft:heroSprite.positionRight;
        if (this.isMoving){
            const staggerFrame=5;
            let position=Math.floor(this.spritePosition/staggerFrame)%4;
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
        else{
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