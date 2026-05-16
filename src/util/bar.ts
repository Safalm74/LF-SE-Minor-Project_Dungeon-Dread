//modules
import Point from "../modules/points";
//progress bar function
export default function progressBar(
    ctx: CanvasRenderingContext2D,
    position: Point,
    current: number,
    total: number,
    width: number,
    height: number,
    message: string = '',
    font: string = '1rem ShadowOfTheDead',
    color: string = "#4caf50"
) {
    const ratio = Math.max(0, Math.min(1, current / total));
    const barWidth = Math.floor(ratio * width);

    // pick fill color based on ratio
    let fillColor: string;
    if (message === 'Life line') {
        if (ratio > 0.5) fillColor = 'rgba(60,210,80,0.85)';
        else if (ratio > 0.25) fillColor = 'rgba(255,185,0,0.85)';
        else fillColor = 'rgba(220,40,40,0.85)';
    } else if (message === 'Essence') {
        fillColor = 'rgba(90,140,255,0.85)';
    } else {
        fillColor = color;
    }

    ctx.save();

    // label
    ctx.font = font;
    ctx.fillStyle = 'rgba(220,220,220,0.9)';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 4;
    ctx.fillText(message, position.x, position.y - height * 0.4);

    // track background
    ctx.beginPath();
    ctx.roundRect(position.x, position.y, width, height, height / 2);
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fill();

    // fill bar
    if (barWidth > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(position.x, position.y, barWidth, height, height / 2);
        ctx.clip();
        const grad = ctx.createLinearGradient(position.x, position.y, position.x, position.y + height);
        grad.addColorStop(0, fillColor.replace('0.85', '1'));
        grad.addColorStop(1, fillColor);
        ctx.fillStyle = grad;
        ctx.fillRect(position.x, position.y, barWidth, height);
        // highlight sheen
        ctx.fillStyle = 'rgba(255,255,255,0.18)';
        ctx.fillRect(position.x, position.y, barWidth, height * 0.45);
        ctx.restore();
    }

    // border
    ctx.beginPath();
    ctx.roundRect(position.x, position.y, width, height, height / 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.restore();
}
