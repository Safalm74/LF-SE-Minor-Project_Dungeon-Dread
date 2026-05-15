//modules
import Point from "../modules/points";
type GruntType3Sprite = {
    width: number;
    height: number;
    positionRight: Point[];
    positionLeft: Point[];
}
const gruntType3Sprite: GruntType3Sprite = {
    width: 34,
    height: 30,
    positionRight: [
        new Point(84, 542),
        new Point(121, 541),
        new Point(158, 542),
        new Point(195, 541)
    ],
    positionLeft: [
        new Point(343, 541),
        new Point(308, 542),
        new Point(269, 541),
        new Point(232, 542)
    ]
}
export default gruntType3Sprite;