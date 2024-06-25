//modules
import Point from "../modules/points";
type GruntType1Sprite = {
    width: number;
    height: number;
    positionRight: Point[];
    positionLeft: Point[];
}
const gruntType1Sprite: GruntType1Sprite = {
    width: 24,
    height: 34,
    positionLeft: [
        new Point(10, 3),
        new Point(118, 3),
        new Point(226, 3),
        new Point(335, 3),
        new Point(443, 3),
        new Point(6, 114),
        new Point(443, 3),
        new Point(335, 3),
        new Point(226, 3),
        new Point(118, 3)
    ],
    positionRight: [
        new Point(479, 2),
        new Point(587, 2),
        new Point(696, 3),
        new Point(804, 5),
        new Point(914, 5),
        new Point(482, 112),
        new Point(914, 5),
        new Point(804, 5),
        new Point(696, 3),
        new Point(587, 2),
    ]
}
export default gruntType1Sprite;