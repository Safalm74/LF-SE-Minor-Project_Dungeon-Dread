import Point from "../modules/points";


type collectionPoint = {
    width: number;
    height: number;
    position: Point;
}

type GruntType2Sprite = {
    position: collectionPoint[];
}

const gruntType2Sprite: GruntType2Sprite = {
    position: [
        {

            width: 137,
            height: 79,
            position: new Point(12, 28)

        },
        {

            width: 144,
            height: 78,
            position: new Point(168, 28)

        },
        {

            width: 147,
            height: 77,
            position: new Point(326, 29)

        },

        {

            width: 144,
            height: 76,
            position: new Point(488, 28)

        },
        {

            width: 127,
            height: 80,
            position: new Point(659, 27)

        },
        {

            width: 111,
            height: 83,
            position: new Point(27, 168)

        },
        {

            width: 127,
            height: 80,
            position: new Point(179, 167)

        },
    ]

}

export default gruntType2Sprite;