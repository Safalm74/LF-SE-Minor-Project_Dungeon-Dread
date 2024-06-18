import { canvas } from "../main";

export default function dropDownMsg(
    ctx:CanvasRenderingContext2D,
    msg:string
){

    ctx.font ='10rem GloriaHallelujah';
    ctx.fillStyle="#4caf50"
    ctx.translate(-ctx.measureText(msg).width/2,canvas.height/2)
    ctx.fillText(
        msg,
        canvas.width/2,
        0
    );
    ctx.translate(ctx.measureText(msg).width/2,-canvas.height/2)

}