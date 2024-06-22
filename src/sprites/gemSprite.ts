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
            width: 80,
            height: 80,
            position: new Point(91, 7)
        }, {
            width: 80,
            height: 80,
            position: new Point(91, 7)
        }, {
            width: 80,
            height: 80,
            position: new Point(91, 7)
        }, {
            width: 80,
            height: 80,
            position: new Point(91, 7)
        }, {
            width: 80,
            height: 80,
            position: new Point(91, 7)
        }
    ]


}

export default gemSprite;