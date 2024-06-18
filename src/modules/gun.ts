import Point from "./points";

interface IGun {
    position: Point;
    lookingLeft: boolean; //true if gun looking left and false if looking right
    damage: number;
    width: number;
    height: number;
    spritePosition:number;
}

export default class Gun implements IGun {
    position: Point;
    lookingLeft: boolean; //true if gun looking left and false if looking right
    damage: number;
    width: number;
    height: number;
    spritePosition:number=0;
    constructor(
        position: Point,
        lookingLeft: boolean,
        damage: number,
        width: number,
        height: number
    ) {
        this.position = position;
        this.lookingLeft = lookingLeft;
        this.damage = damage;
        this.width=width;
        this.height=height;
    }
}
