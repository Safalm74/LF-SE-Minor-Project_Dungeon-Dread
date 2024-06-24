import Point from "./points";
interface IEntity {
    position: Point;
    team: 'red' | 'blue'; //red means enemy team, blue means hero team
    lookingLeft: boolean; //true if player looking left and false if looking right
    healthpoint: number;
    width: number;
    height: number;
    spritePosition: number;
    velocity: Point;
    damage: number;
    attackRate: number;
    gruntImage: HTMLImageElement;
    gruntType:number;
}
export default class Entity implements IEntity {
    position: Point;
    team: "red" | "blue";
    lookingLeft: boolean;
    healthpoint: number;
    width: number;
    height: number;
    spritePosition: number = 0;
    velocity: Point;
    damage: number;
    attackRate: number;
    gruntImage: HTMLImageElement;
    gruntType:number;
    constructor(
        position: Point,
        team: "red" | "blue",
        lookingLeft: boolean,
        healthpoint: number,
        width: number,
        height: number,
        damage: number = 0,
        attackrate: number = 0,
        gruntImage: HTMLImageElement = new Image,
        gruntType:number=0,
        velocity:Point = new Point(5, 5)
    ) {
        this.position = position;
        this.team = team;
        this.lookingLeft = lookingLeft;
        this.healthpoint = healthpoint;
        this.width = width;
        this.height = height;
        this.damage = damage;
        this.attackRate = attackrate;
        this.gruntImage=gruntImage;
        this.gruntType=gruntType;
        this.velocity=velocity
    }
}
