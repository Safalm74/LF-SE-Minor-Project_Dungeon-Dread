

import backGround from "../assets/home/background.webp"
import mainConstants from "../constants/mainConstants";
import { canvas } from "../main";
import Point from "../modules/points";
import Btn from "../util/btn";
import aboutScreen from "./aboutScreen";
import gameMain from "./gameScreen";

const backGroundImage = new Image;
backGroundImage.src = backGround;

//start btn
let startBtnPosition: Point;
let startbtnSize: TextMetrics;

//about btn
let about: Point;
let aboutBtnSize: TextMetrics;

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

function btnsclicked(
    ClickedPosition: Point,
    ctx:CanvasRenderingContext2D
) {
    if ( checkCollision(
        ClickedPosition,
        startBtnPosition,
        startbtnSize
    )){
        gameMain(ctx)
    }
    if ( checkCollision(
        ClickedPosition,
        about,
        aboutBtnSize
    )){
        aboutScreen(ctx)
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
    startBtnPosition = new Point(
        canvas.width * 0.01,
        canvas.height * 0.2)

    about = new Point(
        canvas.width * 0.01,
        canvas.height * 0.3
    )
    //start game
    startbtnSize = Btn(ctx, "Start Game", startBtnPosition);

    //about game
    aboutBtnSize = Btn(ctx, "About", about);


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


export { btnsclicked }

export default function homeScreen(ctx: CanvasRenderingContext2D) {
    ctx.translate(-mainConstants.mapPosition.x, -mainConstants.mapPosition.y);
    homeMainLoop(ctx)
}