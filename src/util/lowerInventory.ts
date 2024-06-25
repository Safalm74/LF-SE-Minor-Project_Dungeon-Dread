//constants
import mainConstants from "../constants/mainConstants";
//objs
import { canvas } from "../main";
//function to displaylowerInventory
export default function lowerInventory(ctx: CanvasRenderingContext2D) {
    const weponsNumber = 6;
    ctx.strokeStyle = "white"
    ctx.fillStyle = "rgba(40,200,40,0.1)"
    ctx.fillRect(
        -mainConstants.mapPosition.x + canvas.width * 0.2,
        -mainConstants.mapPosition.y + canvas.height * 0.8,
        canvas.width * 0.6,
        canvas.width * 0.08
    )
    ctx.strokeRect(
        -mainConstants.mapPosition.x + canvas.width * 0.2,
        -mainConstants.mapPosition.y + canvas.height * 0.8,
        canvas.width * 0.6,
        canvas.width * 0.08

    )
    ctx.font = "1rem Arial"
    const lineHeight = 10;
    for (let i = 0; i < weponsNumber; i++) {
        if (mainConstants.weaponArray[i]) {
            switch (mainConstants.weaponArray[i]?.level) {
                case 1:
                    ctx.fillStyle = "rgba(200,200,200,0.8)";
                    break;
                case 2:
                    ctx.fillStyle = "rgba(15,10,222,0.8)";
                    break;
                case 3:
                    ctx.fillStyle = "rgba(255,215,0,0.8)";
                    break;
            }
        }
        else {
            ctx.fillStyle = "rgba(200,200,200,1)"
        }
        ctx.fillRect(
            -mainConstants.mapPosition.x + canvas.width * ((0.2 + 0.1 * i) + 0.025),
            -mainConstants.mapPosition.y + canvas.height * (0.8 + 0.03),
            canvas.width * 0.05,
            canvas.width * 0.05
        )
        if (mainConstants.weaponArray[i]) {
            ctx.drawImage(
                mainConstants.weaponArray[i]!.gunImage,
                -mainConstants.mapPosition.x + canvas.width * ((0.2 + 0.1 * i) + 0.025),
                -mainConstants.mapPosition.y + canvas.height * (0.8 + 0.03),
                canvas.width * 0.05,
                canvas.width * 0.05
            )
            ctx.fillStyle = "green"
            ctx.fillRect(
                -mainConstants.mapPosition.x +
                canvas.width * ((0.2 + 0.1 * i) +
                    0.025),
                -mainConstants.mapPosition.y +
                canvas.height * (0.8 + 0.03),
                canvas.width * 0.01,
                canvas.width * 0.01
            )
            ctx.fillStyle = "white"
            ctx.fillText(
                `${mainConstants.weaponArray[i]!.level}`,
                -mainConstants.mapPosition.x +
                canvas.width * ((0.2 + 0.1 * i) + 0.025
                ),
                -mainConstants.mapPosition.y +
                canvas.height * (0.8 + 0.03) + lineHeight
            )
        }
    }
}