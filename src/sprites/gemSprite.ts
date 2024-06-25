//modules
import Point from "../modules/points";
type GemType = {
    width: number;
    height: number;
    position: Point;
}
type GemSprite = {
    1: GemType[];
}
const gemSprite: GemSprite = {
    1: [
        {
            width: 80,
            height: 80,
            position: new Point(91, 7)
        },
        {
            width: 77,
            height: 80,
            position: new Point(172, 7)
        }, {
            width: 57,
            height: 80,
            position: new Point(262, 7)
        }, {
            width: 40,
            height: 80,
            position: new Point(351, 7)
        }, {
            width: 57,
            height: 80,
            position: new Point(422, 7)
        }, {
            width: 77,
            height: 80,
            position: new Point(492, 7)
        }
    ]
}
export default gemSprite;