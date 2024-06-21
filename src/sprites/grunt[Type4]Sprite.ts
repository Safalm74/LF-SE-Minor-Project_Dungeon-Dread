import Point from "../modules/points";

type attack = {
    width: number;
    height: number;
    position: Point;
}

type GruntType4Sprite = {
    width: number;
    height: number;
    positionRight: Point[];
    positionLeft: Point[];
    attackRight: attack[];
    attackLeft: attack[];
}

const gruntType4Sprite: GruntType4Sprite = {
    width: 45,
    height: 55,
    positionRight: [
        new Point(93, 226),
        new Point(142, 230),
        new Point(189, 235),
        new Point(229, 231)
    ],
    positionLeft: [
        new Point(278, 235),
        new Point(326, 231),
        new Point(372, 225),
        new Point(414, 230)
    ],
    attackLeft: [
        {
            width: 34,
            height: 58,
            position:new Point(173, 283)
        },
        {
            width: 64,
            height: 41,
            position:new Point(208, 300)
        },
        {
            width: 53,
            height: 42,
            position:new Point(273, 305)
        }
    ], attackRight: [
        {
            width: 33,
            height: 58,
            position:new Point(20, 283)
        },
        {
            width: 64,
            height: 41,
            position:new Point(54, 300)
        },
        {
            width: 53,
            height: 41,
            position:new Point(119, 306)
        }
    ]
}
export default gruntType4Sprite;