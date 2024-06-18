import Gun from "./gun";
import gunSrc from "../assets/weapon/gun/pestol.svg";
import pestolSprite from "../sprites/pestolSprite";
import Point from "./points";
import GruntType1 from "./grunt[Type1]";
import weaponRangeConstants from "../constants/weaponRangeConstants";
const gunImage = new Image;
gunImage.src = gunSrc;

export default class Pestol extends Gun {
    detectedEnemy:boolean=false;
    trackingEnemyObj:GruntType1 | null = null ;
    lookingAngle:number=0;
    shootingPoint:Point= pestolSprite.positionRight[1];

    detectEnemy(obj:GruntType1){
        const logicalCenter=this.shootingPoint
        if ((logicalCenter.distanceBetween(obj.position)<weaponRangeConstants.pestol) && !this.detectedEnemy){
            this.detectedEnemy=true;
            this.trackingEnemyObj=obj
        }
        if (this.detectedEnemy && this.trackingEnemyObj){
            this.lookingAngle=-1*logicalCenter.angle(this.trackingEnemyObj.position)
            
        }
        
    }

    draw(ctx: CanvasRenderingContext2D, angle: number) {
        const lookingDirectionPosition = this.lookingLeft ? pestolSprite.positionLeft[0] : pestolSprite.positionRight[0];
        this.shootingPoint= this.lookingLeft ? pestolSprite.positionLeft[1] : pestolSprite.positionRight[1];

        ctx.translate(this.position.x,this.position.y,)
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
        ctx.translate(-this.position.x,-this.position.y,)
    }

}