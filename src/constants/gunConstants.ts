//import constants
import heroConstants from "./heroConstants";
//importing images src
import pistolImageSrc from "../assets/weapon/gun/pestol.svg";
import smgImageSrc from "../assets/weapon/gun/smg.png";
import vandalImageSrc from "../assets/weapon/gun/vandal.png";
import hunterImageSrc from "../assets/weapon/gun/hunter.png";
//importing sounds src
import pistolSoundSrc from "../assets/sounds/pistolSound.mp3";
import vandalSoundSrc from  "../assets/sounds/vandalSound.mp3";
import hunterSoundSrc from "../assets/sounds/hunterSound.mp3"
import smgSoundSrc from "../assets/sounds/SMGSound.mp3"
//utils
import upcounter from "../util/upcounter";
//sprite
import vandalSprite from "../sprites/vandalSprite";
import hunterSprite from "../sprites/hunterStrite";
import pestolSprite from "../sprites/pestolSprite";
import smgSprite from "../sprites/smgSprite";

//images
const smgImage = new Image;
const hunterImage=new Image;
const vandalImage=new Image;
const pistolImage = new Image;
pistolImage.src = pistolImageSrc;
smgImage.src = smgImageSrc;
vandalImage.src=vandalImageSrc
hunterImage.src=hunterImageSrc
//assetsloading
pistolImage.onload = upcounter
smgImage.onload = upcounter
vandalImage.onload=upcounter
type gunInst = {
    damage: number;
    width: number;
    height: number;
    image: HTMLImageElement;
    fireRate: number;
    cost: number;
    soundSrc:string;
}
type GunConstants = {
    pistol: gunInst;
    smg: gunInst
    vandal:gunInst;
    hunter:gunInst;
}
const gunConstants: GunConstants = {
    pistol: {
        damage: 3,
        width: pestolSprite.width *
            heroConstants.width * 0.01,
        height: pestolSprite.height *
            heroConstants.width * 0.01,
        image: pistolImage,
        fireRate: 2,
        cost: 500,
        soundSrc:pistolSoundSrc
    },
    smg: {
        damage: 0.5,
        width: smgSprite.width *
            heroConstants.width * 0.01,
        height: smgSprite.height *
            heroConstants.width * 0.01,
        image: smgImage,
        fireRate: 5,
        cost: 1500,
        soundSrc:smgSoundSrc
    },
    vandal:{
        damage: 1,
        width: vandalSprite.width *
            heroConstants.width * 0.01,
        height: vandalSprite.height *
            heroConstants.width * 0.01,
        image: vandalImage,
        fireRate: 7,
        cost: 2000,
        soundSrc:vandalSoundSrc
    },
    hunter:{
        damage: 5,
        width: hunterSprite.width *
            heroConstants.width * 0.01,
        height: hunterSprite.height *
            heroConstants.width * 0.01,
        image: hunterImage,
        fireRate: 7,
        cost: 2500,
        soundSrc:hunterSoundSrc
    }
}
export default gunConstants;