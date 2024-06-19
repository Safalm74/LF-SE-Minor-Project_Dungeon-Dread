import Point from "../modules/points";

type obstacle = {
    width: number;
    height: number;
    position: Point
}

type SADSprite = {
    stone: obstacle;
    drum: obstacle;
}

const stoneAndDrumSprite: SADSprite = {
    drum: {
        width: 738,
        height: 226,
        position: new Point(
            590,
            2280
        )
    },
    stone: {
        width: 1663,
        height: 1487,
        position: new Point(
            577,
            773
        )
    }


}

export default stoneAndDrumSprite;