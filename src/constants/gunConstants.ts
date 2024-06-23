import pestolSprite from "../sprites/pestolSprite";
import heroConstants from "./heroConstants";
import smgSprite from "../sprites/smgSprite";

//importing images
import pistolImageSrc from "../assets/weapon/gun/pestol.svg";
import smgImageSrc from "../assets/weapon/gun/smg.svg";
import swordImageSrc from "../assets/weapon/melee/sword.png";

//importing sounds
import gunSoundSrc from "../assets/sounds/gun.mp3"
const pistolSound=new Audio(gunSoundSrc);

const pistolImage = new Image;
pistolImage.src = pistolImageSrc;

const smgImage=new Image;
smgImage.src=smgImageSrc;

const swordImage=new Image;
swordImage.src=swordImageSrc;


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
    sword:gunInst;
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
    sword:{
        damage:10,
        width:smgSprite.width * heroConstants.width * 0.01,
        height:smgSprite.height * heroConstants.width * 0.01,
        image:swordImage,
        fireRate:1,
        cost:1000
    },
    sound:pistolSound
}

export default gunConstants;