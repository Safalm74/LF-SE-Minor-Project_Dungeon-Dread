//importing images
import type34ImageSrc from "../assets/entity/enemy/grunts/type[3,4].png";
import type1ImageSrc from "../assets/entity/enemy/grunts/type1.png"
import type2ImageSrc from "../assets/entity/enemy/grunts/type2.png"
import bossImageLeftSrc from "../assets/entity/enemy/boss/bossLeft.png"
import bossImageRightSrc from "../assets/entity/enemy/boss/bossRight.png"
import spwan from "../assets/entity/enemy/spwan.png"
//sprites
import gruntType1Sprite from "../sprites/grunt[Type1]Sptite";
import gruntType3Sprite from "../sprites/grunt[Type3]sprite";
import Point from "../modules/points";
//utils
import upcounter from "../util/upcounter";
//images
const spwanImage = new Image;
const type1Image=new Image;
const type34Image=new Image;
const type2Image=new Image;
const bossImageRight = new Image;
const bossImageLeft = new Image;
spwanImage.src = spwan;
type1Image.src=type1ImageSrc;
type34Image.src=type34ImageSrc;
type2Image.src=type2ImageSrc;
bossImageLeft.src = bossImageLeftSrc;
bossImageRight.src = bossImageRightSrc;
//onloads
type1Image.onload=upcounter;
type34Image.onload=upcounter;
type2Image.onload=upcounter;
bossImageLeft.onload = upcounter;
spwanImage.onload = upcounter;
bossImageRight.onload = upcounter;
type gruntInst = {
    healthPoint:number;
    width: number;
    height: number;
    image: HTMLImageElement;
    attackRate: number;
    damage:number;
    velocity:Point;
}
type boss={
    healthPoint:number;
    width: number;
    height: number;
    image: HTMLImageElement;
    attackRate: number;
    damage:number;
    velocity:Point;
    velocityFast:Point;
    imageLeft:HTMLImageElement;
    imageRight:HTMLImageElement;
}
type GruntConstants = {
    type1:gruntInst;
    type2:gruntInst;
    type3:gruntInst;
    type4:gruntInst;
    boss:boss;
    spwanImage:HTMLImageElement;

}
const gruntConstants: GruntConstants = {

    type1 :{
        healthPoint:10,
        width: gruntType1Sprite.width * window.innerHeight / 700,
        height: gruntType1Sprite.height*window.innerHeight/700,
        image: type1Image,
        attackRate: 2,
        damage:2,
        velocity:new Point(1,1)
    },
    type2 :{
        healthPoint:20,
        width:  window.innerHeight /1500,
        height: window.innerHeight/1500,
        image: type2Image,
        attackRate: 2,
        damage:2,
        velocity:new Point(1,1)
    },
    type3 :{
        healthPoint:15,
        width: gruntType3Sprite.width * window.innerHeight / 700,
        height: gruntType3Sprite.height*window.innerHeight/700,
        image: type34Image,
        attackRate: 3,
        damage:6,
        velocity:new Point(3,3)
    },
    type4 :{
        healthPoint:28,
        width:  window.innerHeight / 500,
        height:window.innerHeight/500,
        image: type34Image,
        attackRate: 1,
        damage:3,
        velocity:new Point(1,1)
    },
    boss :{
        healthPoint:800,
        width:  window.innerHeight / 500,
        height:window.innerHeight/500,
        image: type34Image,
        attackRate: 1,
        damage:30,
        velocity:new Point(1,1),
        velocityFast:new Point(4,4),
        imageLeft:bossImageLeft,
        imageRight:bossImageRight
    },
    spwanImage:spwanImage
}
export default gruntConstants;