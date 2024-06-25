//modules
import Point from "../modules/points";
type homeAnimationType = {
    width: number;
    height: number;
    position: Point;
}
type homeAnimationSprite = {
    1: homeAnimationType[];
}
const homeAnimationSprite: homeAnimationSprite = {
    1: [
        {
            width: 5,
            height: 5,
            position: new Point(106, 614)
        },
        {
            width: 5,
            height: 16,
            position: new Point(114, 614)
        },
        {
            width: 10,
            height: 30,
            position: new Point(122, 614)
        },
        {
            width: 5,
            height: 32,
            position: new Point(135, 614)
        },
        {
            width: 10,
            height: 30,
            position: new Point(143, 614)
        },
        {
            width: 15,
            height: 3,
            position: new Point(160, 614)
        },
        {
            width: 19,
            height: 5,
            position: new Point(183, 614)
        },
        {
            width: 21,
            height: 7,
            position: new Point(207, 614)
        },
        {
            width: 22,
            height: 9,
            position: new Point(232, 614)
        },
        {
            width: 23,
            height: 11,
            position: new Point(256, 614)
        },
        {
            width: 24,
            height: 13,
            position: new Point(281, 614)
        },
        {
            width: 24,
            height: 15,
            position: new Point(306, 614)
        },
        {
            width: 24,
            height: 16,
            position: new Point(331, 614)
        }
    ]
}
export default homeAnimationSprite;