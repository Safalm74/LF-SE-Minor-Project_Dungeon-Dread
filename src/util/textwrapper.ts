import Point from "../modules/points";

export default function textWrapper(
    ctx: CanvasRenderingContext2D,
    msg: string,
    wrapperWidth: number,
    position: Point,
    font: string = "1rem Arial",
    color: string = "white"

) {
    ctx.font = font;
    ctx.fillStyle = color;
    const sampleMeasure = ctx.measureText('sample')
    const lineHeight = sampleMeasure.actualBoundingBoxAscent +
        sampleMeasure.actualBoundingBoxDescent;
    const msgList = msg.split(' ').filter(
        (word) => {
            return !(
                word === "\n" ||
                word === "\t" ||
                word === ' ')
        }
    );;
    let line: string = "";
    let shiftedY: number = position.y + lineHeight;
    const shiftedX: number = position.x + lineHeight

    for (let i = 0; i < msgList.length; i++) {
        const tempLine = line + msgList[i] + " ";
        const tempLineWidth = ctx.measureText(tempLine).width;
        if (tempLineWidth <= wrapperWidth) {
            line = tempLine;
        }
        else {
            ctx.fillText(
                line,
                shiftedX,
                shiftedY
            )
            shiftedY += lineHeight
            line = ""
        }
    }
    ctx.fillText(line, shiftedX, shiftedY)
}