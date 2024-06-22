import pestolSprite from "../sprites/pestolSprite";
import heroConstants from "./heroConstants";
import smgSprite from "../sprites/smgSprite";

//importing images
import pistolImageSrc from "../assets/weapon/gun/pestol.svg";
import smgImageSrc from "../assets/weapon/gun/smg.svg";
import swordImageSrc from "../assets/weapon/melee/sword.png";

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

}

const gunConstants: GunConstants = {
    pistol: {
        damage: 8,
        width: pestolSprite.width * heroConstants.width * 0.01,
        height: pestolSprite.height * heroConstants.width * 0.01,
        image: pistolImage,
        fireRate: 2,
        cost: 500
    },
    smg: {
        damage: 5.005,
        width: smgSprite.width * heroConstants.width * 0.01,
        height: smgSprite.height * heroConstants.width * 0.01,
        image: smgImage,
        fireRate: 4,
        cost: 5000
    },
    sword:{
        damage:10,
        width:smgSprite.width * heroConstants.width * 0.01,
        height:smgSprite.height * heroConstants.width * 0.01,
        image:swordImage,
        fireRate:1,
        cost:500
    }
}

export default gunConstants;