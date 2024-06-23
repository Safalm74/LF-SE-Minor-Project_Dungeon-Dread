

import backGround from "../assets/home/background.webp"
import mainConstants from "../constants/mainConstants";
import { canvas } from "../main";
import Point from "../modules/points";
import Btn from "../util/btn";
import gameMain from "./gameScreen";

const backGroundImage = new Image;
backGroundImage.src = backGround;

//gameOverReturnHome btn
let gameOverReturnHomeBtnPosition: Point;
let gameOverReturnHomebtnSize: TextMetrics;

function checkCollision(
    cursorPosiiton: Point,
    BtnPosition: Point,
    size: TextMetrics) {
    const width = size.width;
    const height = size.actualBoundingBoxAscent + size.actualBoundingBoxDescent;
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

function gameOverBtnclicked(
    ClickedPosition: Point,
    ctx: CanvasRenderingContext2D
) {
    if (checkCollision(
        ClickedPosition,
        gameOverReturnHomeBtnPosition,
        gameOverReturnHomebtnSize
    )) {
        gameMain(ctx)
    }
}

//function that handles all displays
function displayAll(ctx: CanvasRenderingContext2D) {

    //fill background image
    ctx.drawImage(
        backGroundImage,
        0,
        0,
        canvas.width,
        canvas.height
    );
    ctx.fillRect(
        canvas.width * 0.1,
        canvas.height * 0.1,
        canvas.width * 0.8,
        canvas.height * 0.8
    );
    //return home
    gameOverReturnHomebtnSize = Btn(
        ctx,
        "return home",
        gameOverReturnHomeBtnPosition
    );
}
function homeMainLoop(ctx: CanvasRenderingContext2D) {
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //calling display handiling function
    displayAll(ctx);


    requestAnimationFrame(() => {
        homeMainLoop(ctx)
    });

}


export { gameOverBtnclicked }

export default function gameOver(ctx: CanvasRenderingContext2D) {
    // ctx.translate(-mainConstants.mapPosition.x,
    //     -mainConstants.mapPosition.y);
    // mainConstants.mapPosition = new Point(0, 0)

    homeMainLoop(ctx)
}  