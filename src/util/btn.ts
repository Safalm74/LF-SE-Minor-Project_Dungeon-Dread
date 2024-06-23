import Point from "../modules/points"

export default function Btn(
    ctx: CanvasRenderingContext2D,
    msg: string,
    position: Point,
    font:string="3rem Eater",
    color:string="white"

) {
    if(!position){
        console.log("no position")
    }
    ctx.fillStyle = color
    ctx.font = font
    ctx.fillText(
        msg,
        position.x,
        position.y
    )
    return (ctx.measureText(msg));
}