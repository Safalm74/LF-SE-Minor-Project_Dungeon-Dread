import Point from "../modules/points";

type SmgSprite = {
    width: number;
    height: number;
    positionRight: Point[];
    positionLeft: Point[];
}

const smgSprite: SmgSprite = {
    width: 101,
    height: 54,
    positionRight: [new Point(0, 0)],
    positionLeft: [new Point(101, 54)]
}

export default smgSprite;