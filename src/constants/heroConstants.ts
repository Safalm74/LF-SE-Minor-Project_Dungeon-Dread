import Point from "../modules/points";
import heroSprite from "../sprites/hero";
import amaterasuSoundSrc from "../assets/sounds/amaterasu.mp3"
import heavyBreatheSoundSrc from "../assets/sounds/amaterasu.mp3"
import upcounter from "../util/upcounter";

const heavyBreathSound=new Audio(heavyBreatheSoundSrc)
heavyBreathSound.onload=upcounter

const amaterasuSound=new Audio(amaterasuSoundSrc)
amaterasuSound.onload=upcounter

type HeroConstants = {
    heroTotalHealth: number;
    width:number;
    height:number;
    velocity:Point;
    abilityDamage:number;
    abilityRate:number;
    abilityDurability:number;
    maxEssence:number;
    amaterasuSound:HTMLAudioElement;
    heavyBreath:HTMLAudioElement;
    stamina:number;
}

const heroConstants: HeroConstants = {
    heroTotalHealth:200,
    width:heroSprite.positionLeft[0].width *window.innerHeight / 1200,
    height:heroSprite.positionLeft[0].height * window.innerHeight / 1200,
    velocity:new Point(5,5),
    abilityDamage:0.1,
    abilityRate:10,
    abilityDurability:10*1000,
    maxEssence:50,
    amaterasuSound:amaterasuSound,
    heavyBreath:heavyBreathSound,
    stamina:10
}

export default heroConstants;