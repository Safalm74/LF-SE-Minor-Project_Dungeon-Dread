import pestolSprite from "../sprites/pestolSprite";
import heroConstants from "./heroConstants";
import smgSprite from "../sprites/smgSprite";

//importing images
import pistolImageSrc from "../assets/weapon/gun/pestol.svg";
import smgImageSrc from "../assets/weapon/gun/smg.png";
import vandalImageSrc from "../assets/weapon/gun/vandal.png";
import hunterImageSrc from "../assets/weapon/gun/hunter.png";

//importing sounds
import gunSoundSrc from "../assets/sounds/gun.mp3"
import stateConstants from "./stateConstants";
import upcounter from "../util/upcounter";
import vandalSprite from "../sprites/vandalSprite";
import hunterSprite from "../sprites/hunterStrite";

const pistolSound = new Audio(gunSoundSrc);

const pistolImage = new Image;
pistolImage.src = pistolImageSrc;

const smgImage = new Image;
smgImage.src = smgImageSrc;
const vandalImage=new Image;
vandalImage.src=vandalImageSrc
const hunterImage=new Image;
hunterImage.src=hunterImageSrc

//assetsloading
pistolSound.onload = () => {
    stateConstants.assetsLoaded++
}
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
    smg: gunInst;
    sound: HTMLAudioElement;
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
        soundSrc:gunSoundSrc
    },
    smg: {
        damage: 1,
        width: smgSprite.width *
            heroConstants.width * 0.01,
        height: smgSprite.height *
            heroConstants.width * 0.01,
        image: smgImage,
        fireRate: 4,
        cost: 1500,
        soundSrc:gunSoundSrc
    },
    vandal:{
        damage: 3,
        width: vandalSprite.width *
            heroConstants.width * 0.01,
        height: vandalSprite.height *
            heroConstants.width * 0.01,
        image: vandalImage,
        fireRate: 4,
        cost: 2500,
        soundSrc:gunSoundSrc

    },
    hunter:{
        damage: 5,
        width: hunterSprite.width *
            heroConstants.width * 0.01,
        height: hunterSprite.height *
            heroConstants.width * 0.01,
        image: hunterImage,
        fireRate: 6,
        cost: 3500,
        soundSrc:gunSoundSrc

    },
    sound: pistolSound
}

export default gunConstants;