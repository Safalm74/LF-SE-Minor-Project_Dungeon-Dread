import pestolSprite from "../sprites/pestolSprite";
import heroConstants from "./heroConstants";
import smgSprite from "../sprites/smgSprite";

//importing images
import pistolImageSrc from "../assets/weapon/gun/pestol.svg";
import smgImageSrc from "../assets/weapon/gun/smg.svg";

//importing sounds
import gunSoundSrc from "../assets/sounds/gun.mp3"
import stateConstants from "./stateConstants";
import upcounter from "../util/upcounter";
const pistolSound=new Audio(gunSoundSrc);

const pistolImage = new Image;
pistolImage.src = pistolImageSrc;

const smgImage=new Image;
smgImage.src=smgImageSrc;

//assetsloading
pistolSound.onload=()=>{
    stateConstants.assetsLoaded++
}
pistolImage.onload=upcounter
smgImage.onload=upcounter
pistolSound.onload=upcounter
type gunInst = {
    damage: number;
    width: number;
    height: number;
    image: HTMLImageElement;
    fireRate: number;
    cost: number;
}

type GunConstants = {
    pistol: gunInst;
    smg: gunInst;
    sound:HTMLAudioElement;

}

const gunConstants: GunConstants = {
    pistol: {
        damage: 3,
        width: pestolSprite.width * heroConstants.width * 0.01,
        height: pestolSprite.height * heroConstants.width * 0.01,
        image: pistolImage,
        fireRate: 2,
        cost: 500
    },
    smg: {
        damage: 1,
        width: smgSprite.width * heroConstants.width * 0.01,
        height: smgSprite.height * heroConstants.width * 0.01,
        image: smgImage,
        fireRate: 4,
        cost: 1500
    },
    sound:pistolSound
}

export default gunConstants;