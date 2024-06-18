import Point from "../modules/points";

type PestolSprite={
    width:number;
    height:number;
    positionRight:Point[];
    positionLeft:Point[];
}

const pestolSprite:PestolSprite={
    width:66,
    height:38,
    positionRight: [
        new Point(5,31),
        new Point(67,40)
    ],
    positionLeft: [
        new Point(90,31),
        new Point(94,40)
    ]
    
}

export default pestolSprite;