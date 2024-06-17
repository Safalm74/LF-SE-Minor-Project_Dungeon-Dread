import Point from "./points";

interface IEntity {
    position: Point;
    team: 'red' | 'blue'; //red means enemy team, blue means hero team
    lookingLeft: boolean; //true if player looking left and false if looking right
    healthpoint: number;
    width: number;
    height: number;
    spritePosition:number;
    velocity:Point;
}

export default class Entity implements IEntity {
    position: Point;
    team: "red" | "blue";
    lookingLeft: boolean;
    healthpoint: number;
    width: number;
    height: number;
    spritePosition: number=0;
    velocity: Point=new Point(5,5);;
    constructor(
        position: Point,
        team: "red" | "blue",
        lookingLeft: boolean,
        healthpoint: number,
        width: number,
        height: number
    ) {
        this.position = position;
        this.team = team;
        this.lookingLeft = lookingLeft;
        this.healthpoint = healthpoint;
        this.width=width;
        this.height=height;
    }
}
