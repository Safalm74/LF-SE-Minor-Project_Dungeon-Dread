//modules
import Point from "../modules/points";
//constants
import mainConstants from "../constants/mainConstants";
//cursor collision checking function
export default function checkCursorCollision(
    cursorPosiiton: Point,
    BtnPosition: Point,
    size: TextMetrics) {
    cursorPosiiton = new Point(
        cursorPosiiton.x + mainConstants.mapPosition.x,
        cursorPosiiton.y + mainConstants.mapPosition.y
    );
    const width = size.width;
    const height = size.actualBoundingBoxAscent +
        size.actualBoundingBoxDescent;
    if (
        cursorPosiiton.x > BtnPosition.x &&
        cursorPosiiton.x < BtnPosition.x + width &&
        cursorPosiiton.y > BtnPosition.y - height &&
        cursorPosiiton.y < BtnPosition.y
    ) {
        return true
    }
    else {
        return false
    }
}