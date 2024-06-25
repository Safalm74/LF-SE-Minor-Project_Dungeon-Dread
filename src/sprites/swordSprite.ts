// modules 
import Point from "../modules/points";
type SwordSprite = {
    width: number;
    height: number;
    positionRight: Point[];
    positionLeft: Point[];
}
const swordSprite: SwordSprite = {
    width: 113,
    height: 46,
    positionLeft: [
        new Point(24, 14),
    ],
    positionRight: [
        new Point(160, 14),
    ]
}
export default swordSprite;