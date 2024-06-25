import Point from "../modules/points";

type HunterSprite = {
    width: number;
    height: number;
    positionRight: Point[];
    positionLeft: Point[];
}

const hunterSprite: HunterSprite = {
    width: 127,
    height: 56,
    positionRight:[new Point(0, 0)],
    positionLeft:[new Point(149, 0)],



}

export default hunterSprite;