import pestolSprite from "../sprites/pestolSprite";
import heroConstants from "./heroConstants";
import smgSprite from "../sprites/smgSprite";


import pistolImageSrc from "../assets/weapon/gun/pestol.svg";
import smgImageSrc from "../assets/weapon/gun/smg.svg";


const pistolImage = new Image;
pistolImage.src = pistolImageSrc;

const smgImage=new Image;
smgImage.src=smgImageSrc;

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

}

const gunConstants: GunConstants = {
    pistol: {
        damage: 5,
        width: pestolSprite.width * heroConstants.width * 0.01,
        height: pestolSprite.height * heroConstants.width * 0.01,
        image: pistolImage,
        fireRate: 1,
        cost: 500
    },
    smg: {
        damage: 2,
        width: smgSprite.width * heroConstants.width * 0.01,
        height: smgSprite.height * heroConstants.width * 0.01,
        image: smgImage,
        fireRate: 10,
        cost: 5000
    },
}

export default gunConstants;