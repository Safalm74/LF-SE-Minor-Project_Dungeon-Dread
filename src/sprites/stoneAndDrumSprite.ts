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
        width: 112,
        height: 161,
        position: new Point(
            14,
            49
        )
    },
    stone: {
        width: 136,
        height: 164,
        position: new Point(
            36,
            552
        )
    }


}

export default stoneAndDrumSprite;