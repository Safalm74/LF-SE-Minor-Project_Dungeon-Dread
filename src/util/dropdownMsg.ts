import mainConstants from "../constants/mainConstants";
import { canvas } from "../main";

export default function dropDownMsg(
    ctx: CanvasRenderingContext2D,
    msg: string
) {
    ctx.font = '5rem ShadowOfTheDeadOver';
    ctx.fillStyle = "#4caf50"
    ctx.translate(-(ctx.measureText(msg).width / 2 + mainConstants.mapPosition.x), (canvas.height / 2 - mainConstants.mapPosition.y))
    ctx.fillText(
        msg,
        canvas.width / 2,
        0
    );

    ctx.translate((ctx.measureText(msg).width / 2 + mainConstants.mapPosition.x), -(canvas.height / 2  -mainConstants.mapPosition.y))



}