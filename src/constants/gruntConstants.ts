//importing images
import type34ImageSrc from "../assets/entity/enemy/grunts/type[3,4].png";
import type1ImageSrc from "../assets/entity/enemy/grunts/type1.png"
import gruntType1Sprite from "../sprites/grunt[Type1]Sptite";
import gruntType3Sprite from "../sprites/grunt[Type3]sprite";
import Point from "../modules/points";
import gruntType4Sprite from "../sprites/grunt[Type4]Sprite";

const type1Image=new Image;
const type34Image=new Image;

type1Image.src=type1ImageSrc;
type34Image.src=type34ImageSrc;


type gruntInst = {
    healthPoint:number;
    width: number;
    height: number;
    image: HTMLImageElement;
    attackRate: number;
    damage:number;
    velocity:Point;
}

type GruntConstants = {
    type1:gruntInst;
    type3:gruntInst;
    type4:gruntInst;

}


const gruntConstants: GruntConstants = {

    type1 :{
        healthPoint:10,
        width: gruntType1Sprite.width * window.innerHeight / 700,
        height: gruntType1Sprite.height*window.innerHeight/700,
        image: type1Image,
        attackRate: 0.8,
        damage:2,
        velocity:new Point(1,1)
    },

    type3 :{
        healthPoint:8,
        width: gruntType3Sprite.width * window.innerHeight / 700,
        height: gruntType3Sprite.height*window.innerHeight/700,
        image: type34Image,
        attackRate: 3,
        damage:6,
        velocity:new Point(3,3)
    },

    type4 :{
        healthPoint:18,
        width:  window.innerHeight / 500,
        height:window.innerHeight/500,
        image: type34Image,
        attackRate: 1,
        damage:3,
        velocity:new Point(1,1)
    }
   
}

export default gruntConstants;