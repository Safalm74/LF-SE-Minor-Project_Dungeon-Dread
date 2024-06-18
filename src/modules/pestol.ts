import Gun from "./gun";
import gunSrc from "../assets/weapon/gun/pestol.svg";
import pestolSprite from "../sprites/pestolSprite";
import Point from "./points";
import GruntType1 from "./grunt[Type1]";
import weaponRangeConstants from "../constants/weaponRangeConstants";
import { hero } from "../screens/game";
const gunImage = new Image;
gunImage.src = gunSrc;

export default class Pestol extends Gun {
    detectedEnemy: boolean = false;
    trackingEnemyObj: GruntType1 | null = null;
    lookingAngle: number = 0;
    shootingPoint: Point = pestolSprite.positionRight[1];

    detectEnemy(obj: GruntType1) {
        const logicalCenter = this.position

        if ((logicalCenter.distanceBetween(obj.position) < weaponRangeConstants.pestol) && !this.detectedEnemy) {
            this.detectedEnemy = true;
            this.trackingEnemyObj = obj
        }
        if (this.detectedEnemy && this.trackingEnemyObj) {
            this.lookingAngle = logicalCenter.angle(this.trackingEnemyObj.position)
           // console.log(this.lookingAngle)

        }

    }

    draw(ctx: CanvasRenderingContext2D, angle: number) {
        let lookingDirectionPosition: Point;
        if (this.lookingLeft) {
            lookingDirectionPosition = pestolSprite.positionLeft[0];
            this.shootingPoint = new Point(pestolSprite.positionLeft[1].x+this.position.x,pestolSprite.positionLeft[1].y + this.position.y) ;
        }
        else {
            lookingDirectionPosition = pestolSprite.positionRight[0];
            this.shootingPoint = new Point(pestolSprite.positionRight[1].x+this.position.x,pestolSprite.positionRight[1].y + this.position.y) ;
        }

        ctx.translate(this.position.x, this.position.y,)
        if (this.lookingAngle<0){
            lookingDirectionPosition=lookingDirectionPosition===pestolSprite.positionLeft[0]?pestolSprite.positionRight[0]: pestolSprite.positionLeft[0]
        }
        ctx.rotate(this.lookingAngle);
        ctx.drawImage(
            gunImage,
            lookingDirectionPosition.x,
            lookingDirectionPosition.y,
            pestolSprite.width,
            pestolSprite.height,
            0,
            0,
            this.width,
            this.height
        )
        ctx.rotate(-this.lookingAngle);
        ctx.translate(-this.position.x, -this.position.y,)
    }

}