import Point from "../modules/points";

type HeroSprite={
    width:number;
    height:number;
    positionRight:Point[];
    positionLeft:Point[];
}

const heroSprite:HeroSprite={
    width:35,
    height:44,
    positionRight: [
        new Point(6,6),
        new Point(6,71),
        new Point(6,124),
        new Point(6,172),
        new Point(6,124),
        new Point(6,71)
    ],
    positionLeft: [
        new Point(64,6),
        new Point(67,71),
        new Point(64,124),
        new Point(67,172),
        new Point(64,124),
        new Point(67,71)
    ]
    
}

export default heroSprite;