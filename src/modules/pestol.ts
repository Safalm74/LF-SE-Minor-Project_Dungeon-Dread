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

        if (
            (logicalCenter.distanceBetween(obj.position)
                < weaponRangeConstants.pestol) && !this.detectedEnemy) {
            console.log("zombie detected")
            this.detectedEnemy = true;
            this.trackingEnemyObj = obj
        }
        if (this.detectedEnemy && this.trackingEnemyObj) {
            this.lookingAngle = logicalCenter.angle(
                new Point(
                    this.trackingEnemyObj.position.x,
                    this.trackingEnemyObj.position.y
                )
            )
            if (this.position.distanceBetween(this.trackingEnemyObj.position)
                > weaponRangeConstants.pestol) {
                this.detectedEnemy = false;
            }

        }

    }

    draw(ctx: CanvasRenderingContext2D) {

        ctx.translate(this.position.x, this.position.y)
        ctx.rotate(this.lookingAngle);
        let lookingDirectionPosition: Point;
        if (this.lookingLeft) {
            lookingDirectionPosition = pestolSprite.positionLeft[0];
            this.shootingPoint = new Point(0,
                this.height / 4);
        }
        else {
            lookingDirectionPosition = pestolSprite.positionRight[0];
            this.shootingPoint = new Point(this.width,
                this.height / 4);
        }


        if (this.trackingEnemyObj && this.position.x > this.trackingEnemyObj!.position.x) {
            lookingDirectionPosition = lookingDirectionPosition === pestolSprite.positionLeft[0] ?
                pestolSprite.positionRight[0] :
                pestolSprite.positionLeft[0]

            this.shootingPoint.x =0; 


        }

        ctx.fillRect(this.shootingPoint.x, this.shootingPoint.y, 100, 100)
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, 1000, 5)
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