import Point from "../modules/points"

export default function Btn(
    ctx: CanvasRenderingContext2D,
    msg: string,
    position: Point

) {
    ctx.fillStyle = "white"
    ctx.font = "3rem Eater"
    ctx.fillText(
        msg,
        position.x,
        position.y
    )
    return (ctx.measureText(msg));
}