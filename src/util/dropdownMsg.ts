import mainConstants from "../constants/mainConstants";
import { canvas } from "../main";
import Point from "../modules/points";

export default function dropDownMsg(
    ctx: CanvasRenderingContext2D,
    msg: string,
    position: Point =
        new Point(
            -(ctx.measureText(msg).width / 2 +
                mainConstants.mapPosition.x),
            (canvas.height / 2 -
                mainConstants.mapPosition.y)
        ),
    font: string = '5rem ShadowOfTheDeadOver',
    color:string="#4caf50"

) {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.translate(position.x, position.y);
    ctx.fillText(
        msg,
        canvas.width / 2,
        0
    );
    ctx.translate(-position.x, -position.y)
}