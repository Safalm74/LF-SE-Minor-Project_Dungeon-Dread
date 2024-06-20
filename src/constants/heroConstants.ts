import heroSprite from "../sprites/hero";

type HeroConstants = {
    heroTotalHealth: number;
    width:number;
    height:number
}

const heroConstants: HeroConstants = {
    heroTotalHealth:120,
    width:heroSprite.width *window.innerHeight / 600,
    height:heroSprite.height * window.innerHeight / 600
}

export default heroConstants;