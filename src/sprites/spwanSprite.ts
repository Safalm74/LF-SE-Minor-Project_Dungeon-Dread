//modules
import Point from "../modules/points";
type SpwanSprite = {
    width: number;
    height: number;
    position: Point[]
}
const spwanSprite: SpwanSprite = {
    width: 31,
    height: 17,
    position: [
        new Point(76, 17),
        new Point(224, 17),
        new Point(410, 17),
        new Point(576, 17),
        new Point(742, 17),
        new Point(76, 118),
        new Point(224, 118),
        new Point(410, 118),
        new Point(576, 118),
        new Point(742, 118),
        new Point(48, 217)
    ]
}
export default spwanSprite;