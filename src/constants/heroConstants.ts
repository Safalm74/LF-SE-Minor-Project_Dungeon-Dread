import Point from "../modules/points";
import heroSprite from "../sprites/hero";
import amaterasuSoundSrc from "../assets/sounds/amaterasu.mp3"
import upcounter from "../util/upcounter";

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
}

const heroConstants: HeroConstants = {
    heroTotalHealth:200,
    width:heroSprite.width *window.innerHeight / 600,
    height:heroSprite.height * window.innerHeight / 600,
    velocity:new Point(5,5),
    abilityDamage:0.1,
    abilityRate:10,
    abilityDurability:10*1000,
    maxEssence:50,
    amaterasuSound:amaterasuSound
}

export default heroConstants;