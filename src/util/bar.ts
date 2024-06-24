import Point from "../modules/points";
export default function progressBar(
    ctx:CanvasRenderingContext2D,
    position:Point,
    current:number,
    total:number,
    width:number,
    height:number,
    message: string='',
    font:string='2rem ShadowOfTheDead',
    color:string="#4caf50"
){
    //writing Message:
    ctx.font =font;
    ctx.fillStyle=color;
    ctx.fillText(
        message,
        position.x,
        position.y-height/5
    );
    //calculation progress bar width
    const barWidth=Math.floor((current/total)*width);
    //outline
    ctx.strokeStyle="black"
    ctx.strokeRect(position.x,position.y,width,height)
    //background empty bar
    ctx.fillStyle="rgba(200,200,200,0.5)";
    ctx.fillRect(
        position.x,
        position.y,
        width,
        height
    );
    //progress bar
    ctx.fillStyle="rgba(76, 175, 80,0.5)";
    ctx.fillRect(
        position.x,
        position.y,
        barWidth,
        height
    );
}