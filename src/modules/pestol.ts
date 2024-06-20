import Gun from "./gun";
import gunSrc from "../assets/weapon/gun/pestol.svg";
import pestolSprite from "../sprites/pestolSprite";
import Point from "./points";
import GruntType1 from "./gruntType1";
import weaponRangeConstants from "../constants/weaponRangeConstants";
import { bulletArray } from "../screens/gameScreen";
import Bullet from "./bullet";
const gunImage = new Image;
gunImage.src = gunSrc;

export {gunImage};
export default class Pestol extends Gun {
    detectedEnemy: boolean = false;
    trackingEnemyObj: any= null;
    lookingAngle: number = 0;
    shootingPoint: Point = pestolSprite.positionRight[1];
    fireInterval: any = null;

    detectEnemy(obj: GruntType1) {
        const logicalCenter = this.position

        if (
            (logicalCenter.distanceBetween(obj.position)
                < weaponRangeConstants.pestol) && !this.detectedEnemy) {
            this.detectedEnemy = true;
            this.trackingEnemyObj = obj
            //trackingEnemyObjPosition.x=trackingEnemyObjPosition.x+this.trackingEnemyObj.width/2;
           // trackingEnemyObjPosition.y=trackingEnemyObjPosition.y+this.trackingEnemyObj.height/2;
        }
        
        
        if (this.detectedEnemy && this.trackingEnemyObj) {
            this.lookingAngle = logicalCenter.angle(
                new Point(
                    this.trackingEnemyObj.position.x,
                    this.trackingEnemyObj.position.y
                )
            )
            this.shoot();

            if (
                this.position.distanceBetween(this.trackingEnemyObj.position)
                > weaponRangeConstants.pestol) {
                this.detectedEnemy = false;
                clearInterval(this.fireInterval);
                this.fireInterval = null;
            }

        }
        if (this.trackingEnemyObj &&this.trackingEnemyObj.healthpoint<0){
            this.detectedEnemy = false;
            clearInterval(this.fireInterval);
            this.fireInterval = null;
        }
        

    }

    shoot() {
        if (this.lookingLeft) {
            this.shootingPoint = new Point(this.position.x, this.position.y + this.height / 4);
        }
        else {
            this.shootingPoint = new Point(this.position.x + this.width, this.position.y + this.height / 4);
        }


        if (this.trackingEnemyObj && this.position.x > this.trackingEnemyObj!.position.x) {
            this.shootingPoint.x = this.position.x;
        }

        this.shootingPoint.x = this.position.x +
            (this.shootingPoint.x - this.position.x) *
            Math.cos(this.lookingAngle) -
            (this.shootingPoint.y - this.position.y) *
            Math.sin(this.lookingAngle)
        this.shootingPoint.y = this.position.y +
            (this.shootingPoint.x - this.position.x) *
            Math.sin(this.lookingAngle) +
            (this.shootingPoint.y - this.position.y) *
            Math.cos(this.lookingAngle)

        if (!this.fireInterval) {

            this.fireInterval = setInterval(
                () => {
                    if (this.trackingEnemyObj) {
                        const trackingEnemyObjPosition=new Point( // to aim at center of body of zombie
                            this.trackingEnemyObj.position.x +this.width/2,
                            this.trackingEnemyObj.position.y +this.height/2)
                        const vector = this.shootingPoint.pointDifference(trackingEnemyObjPosition);
                        const magnitude = this.shootingPoint.distanceBetween(trackingEnemyObjPosition);
                        const unitVector = new Point(
                            vector.x / magnitude, vector.y / magnitude
                        );

                        const endPoint = new Point(
                            this.shootingPoint.x + unitVector.x * 10,
                            this.shootingPoint.y + unitVector.y * 10);
                        const bulletObj = new Bullet(
                            this.shootingPoint,
                            endPoint,
                            weaponRangeConstants.pestolDamage,
                            new Point(
                                -unitVector.x * weaponRangeConstants.bulletVelocity,
                                -unitVector.y * weaponRangeConstants.bulletVelocity),
                            this.position,
                        );
                        bulletArray.push(bulletObj);
                    }

                },
                1000 / this.fireRate
            );
        }


    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.translate(this.position.x, this.position.y)
        ctx.rotate(this.lookingAngle);
        let lookingDirectionPosition: Point;
        if (this.lookingLeft) {
            lookingDirectionPosition = pestolSprite.positionLeft[0];
            this.shootingPoint = new Point(0, this.height / 4);
        }
        else {
            lookingDirectionPosition = pestolSprite.positionRight[0];
            this.shootingPoint = new Point(this.width, this.height / 4);
        }


        if (this.trackingEnemyObj && this.position.x > this.trackingEnemyObj!.position.x) {
            lookingDirectionPosition = lookingDirectionPosition === pestolSprite.positionLeft[0] ?
                pestolSprite.positionRight[0] :
                pestolSprite.positionLeft[0]

            this.shootingPoint.x = 0;


        }
        // ctx.fillRect(
        //     this.shootingPoint.x,
        //     this.shootingPoint.y,
        //     100,100
        // )



        ctx.fillStyle = "red";
        //ctx.fillRect(0, 0, 1000, 5)
        ctx.drawImage(
            this.gunImage,
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
