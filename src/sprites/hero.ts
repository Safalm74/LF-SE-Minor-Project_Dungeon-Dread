import Point from "../modules/points";

type positionInstant={
    width:number;
    height:number;
    position:Point;
}

type HeroSprite={
    positionRight:positionInstant[];
    positionLeft:positionInstant[];
}

const heroSprite:HeroSprite={
    positionRight: [
        {
            width:55,
            height:96,
            position:new Point(5,0)
        },
        {
            width:86,
            height:88,
            position:new Point(4,122),
        },
        {
            width:85,
            height:88,
            position:new Point(104,123),
        },
        {
            width:84,
            height:90,
            position:new Point(201,121),
        },
        {
            width:85,
            height:89,
            position:new Point(302,122),
        },
        {
            width:84,
            height:88,
            position:new Point(400,123),
        },
        {
            width:84,
            height:90,
            position:new Point(500,121),
        },
    ],
    positionLeft: [
        {
            width:55,
            height:96,
            position:new Point(533,219)
        },
        {
            width:86,
            height:88,
            position:new Point(503,341),
        },
        {
            width:85,
            height:88,
            position:new Point(404,342),
        },
        {
            width:84,
            height:90,
            position:new Point(308,340),
        },
        {
            width:85,
            height:89,
            position:new Point(206,341),
        },
        {
            width:84,
            height:88,
            position:new Point(109,342),
        },
        {
            width:84,
            height:90,
            position:new Point(9,340),
        },
    ]
}

export default heroSprite