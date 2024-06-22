import Point from "../modules/points";
import heroSprite from "../sprites/hero";

type HeroConstants = {
    heroTotalHealth: number;
    width:number;
    height:number;
    velocity:Point;
    abilityDamage:number;
    abilityRate:number;
    abilityDurability:number;
}

const heroConstants: HeroConstants = {
    heroTotalHealth:120,
    width:heroSprite.width *window.innerHeight / 600,
    height:heroSprite.height * window.innerHeight / 600,
    velocity:new Point(5,5),
    abilityDamage:0.5,
    abilityRate:10,
    abilityDurability:10*1000,
}

export default heroConstants;