import gunConstants from "../constants/gunConstants";
import Point from "./points";

interface IGun {
    position: Point;
    lookingLeft: boolean; //true if gun looking left and false if looking right
    damage: number;
    width: number;
    height: number;
    spritePosition:number;
    cost:number;
}

export default class Gun implements IGun {
    position: Point;
    lookingLeft: boolean; //true if gun looking left and false if looking right
    damage: number;
    width: number;
    height: number;
    spritePosition:number=0;
    fireRate: number;
    cost: number;
    gunImage:HTMLImageElement
    constructor(
        position: Point,
        lookingLeft: boolean,
        damage: number,
        width: number,
        height: number,
        firerate:number=1,
        cost:number=500,
        gunImg:HTMLImageElement
    ) {
        this.position = position;
        this.lookingLeft = lookingLeft;
        this.damage = damage;
        this.width=width;
        this.height=height;

        this.gunImage=gunImg;
        this.fireRate=firerate;
        this.cost=cost;
    }
}
