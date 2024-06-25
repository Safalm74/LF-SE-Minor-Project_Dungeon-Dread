import Point from "../modules/points";

type VandalSprite = {
    width: number;
    height: number;
    positionRight: Point[];
    positionLeft: Point[];
}

const vandalSprite: VandalSprite = {
    width: 123,
    height: 57,
    positionRight:[new Point(0, 0)],
    positionLeft:[new Point(125, 0)],



}

export default vandalSprite;