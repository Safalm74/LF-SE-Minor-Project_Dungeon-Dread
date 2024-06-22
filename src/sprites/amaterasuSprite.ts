import Point from "../modules/points";

type AmaterasuSprite={
    width:number;
    height:number;
    position:Point[];
}

const amaterasuSprite:AmaterasuSprite={
    width:339,
    height:404,
    position: [
        new Point(6,13),
        new Point(345,13),
        new Point(684,13),
        new Point(1024,13),
        new Point(1365,13),
        new Point(1706,13),
        new Point(2047,13),
        new Point(2388,13)

    ]
    
}

export default amaterasuSprite;