//modules
import Point from "../modules/points";
import hero from "../assets/entity/hero/hero.png";
//utils
import upcounter from "../util/upcounter";
//sprite information
import heroSprite from "../sprites/hero";
//sounds src
import amaterasuSoundSrc from "../assets/sounds/amaterasu.mp3"
import heavyBreatheSoundSrc from "../assets/sounds/amaterasu.mp3"
//images src
import fireImageSrc from "../assets/ability/amaterasu.png"
import sharinganImageSrc from "../assets/ability/sharingan.png"
//images
const sharinganImage = new Image;
const fireImage = new Image;
const heroImage = new Image;
fireImage.src = fireImageSrc;
sharinganImage.src = sharinganImageSrc;
heroImage.src = hero;
//sounds
const heavyBreathSound = new Audio(heavyBreatheSoundSrc)
const amaterasuSound = new Audio(amaterasuSoundSrc)
//onloads
amaterasuSound.onload = upcounter
fireImage.onload = upcounter;
heroImage.onload = upcounter;
heavyBreathSound.onload = upcounter
type HeroConstants = {
    heroTotalHealth: number;
    width: number;
    height: number;
    velocity: Point;
    abilityDamage: number;
    abilityRate: number;
    abilityDurability: number;
    maxEssence: number;
    amaterasuSound: HTMLAudioElement;
    heavyBreath: HTMLAudioElement;
    stamina: number;
    image: HTMLImageElement;
    amatherasuImage: HTMLImageElement;
    sharingan: HTMLImageElement
}
const heroConstants: HeroConstants = {
    heroTotalHealth: 200,
    width: heroSprite.positionLeft[0].width * window.innerHeight / 1400,
    height: heroSprite.positionLeft[0].height * window.innerHeight / 1400,
    velocity: new Point(5, 5),
    abilityDamage: 0.1,
    abilityRate: 10,
    abilityDurability: 10 * 1000,
    maxEssence: 50,
    amaterasuSound: amaterasuSound,
    heavyBreath: heavyBreathSound,
    stamina: 10,
    image: heroImage,
    amatherasuImage: fireImage,
    sharingan: sharinganImage
}

export default heroConstants;