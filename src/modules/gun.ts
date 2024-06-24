import stateConstants from "../constants/stateConstants";
import weaponRangeConstants from "../constants/weaponRangeConstants";
import { bulletArray } from "../screens/gameScreen";
import pestolSprite from "../sprites/pestolSprite";
import smgSprite from "../sprites/smgSprite";
import Boss from "./boss";
import Bullet from "./bullet";
import GruntType1and3 from "./gruntType1and3";
import GruntType2 from "./gruntType2";
import GruntType4 from "./gruntType4";
import Point from "./points";
interface IGun {
    position: Point;
    lookingLeft: boolean; //true if gun looking left and false if looking right
    damage: number;
    width: number;
    height: number;
    spritePosition: number;
    cost: number;
    guntype: "pistol"| "smg"| "sword";
}
export default class Gun implements IGun {
    position: Point;
    lookingLeft: boolean; //true if gun looking left and false if looking right
    damage: number;
    width: number;
    height: number;
    spritePosition: number = 0;
    fireRate: number;
    cost: number;
    gunImage: HTMLImageElement;
    guntype: "pistol"| "smg"| "sword";
    detectedEnemy: boolean = false;
    trackingEnemyObj: any= null;
    lookingAngle: number = 0;
    shootingPoint: Point = pestolSprite.positionRight[1];
    fireInterval: any = null;
    level:number=1;
    sound:HTMLAudioElement;
    constructor(
        position: Point,
        lookingLeft: boolean,
        damage: number,
        width: number,
        height: number,
        firerate: number = 1,
        cost: number = 500,
        gunImg: HTMLImageElement,
        guntype: "pistol"| "smg"| "sword",
        sound:HTMLAudioElement
    ) {
        this.position = position;
        this.lookingLeft = lookingLeft;
        this.damage = damage;
        this.width = width;
        this.height = height;
        this.gunImage = gunImg;
        this.fireRate = firerate;
        this.cost = cost;
        this.guntype=guntype;
        this.sound=sound;
    }playSound(){
        if(!stateConstants.ismute){
            this.sound.volume=0.2
            if(this.sound){
                this.sound.pause();
                this.sound.currentTime=0;
            }
            this.sound.play();
        }

    }
    detectEnemy(obj: GruntType1and3 | GruntType2 | GruntType4 | Boss) {
        const logicalCenter = this.position
        if (
            (logicalCenter.distanceBetween(obj.position)
                < weaponRangeConstants.pestol) && !this.detectedEnemy) {
            this.detectedEnemy = true;
            this.trackingEnemyObj = obj}
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
                            this.trackingEnemyObj.position.x +this.trackingEnemyObj.width/2,
                            this.trackingEnemyObj.position.y +this.trackingEnemyObj.height/2)
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
                            this.damage,
                            new Point(
                                -unitVector.x * weaponRangeConstants.bulletVelocity,
                                -unitVector.y * weaponRangeConstants.bulletVelocity),
                            this.position,
                        );
                        bulletArray.push(bulletObj);
                        this.playSound();
                    }

                },
                1000 / this.fireRate
            );
        }


    }

    draw(ctx: CanvasRenderingContext2D) {
        let gunSprite;
        switch(this.guntype){
            case "pistol":
                gunSprite=pestolSprite;
                break;
            case "smg":
                gunSprite=smgSprite;
                break;
        }
        ctx.translate(this.position.x, this.position.y)
        ctx.rotate(this.lookingAngle);
        let lookingDirectionPosition: Point;
        if (this.lookingLeft) {
            lookingDirectionPosition = gunSprite!.positionLeft[0];
            this.shootingPoint = new Point(0, this.height / 4);
        }
        else {
            lookingDirectionPosition = gunSprite!.positionRight[0];
            this.shootingPoint = new Point(this.width, this.height / 4);
        }


        if (this.trackingEnemyObj && this.position.x > this.trackingEnemyObj!.position.x) {
            lookingDirectionPosition = lookingDirectionPosition === pestolSprite.positionLeft[0] ?
                pestolSprite.positionRight[0] :
                pestolSprite.positionLeft[0]

            this.shootingPoint.x = 0;


        }


        ctx.fillStyle = "red";
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
