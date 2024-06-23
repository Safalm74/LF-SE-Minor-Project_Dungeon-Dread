

import backGround from "../assets/home/background.webp"
import mainConstants from "../constants/mainConstants";
import stateConstants from "../constants/stateConstants";
import { canvas } from "../main";
import Point from "../modules/points";
import Btn from "../util/btn";
import homeScreen from "./homeScreen";

const backGroundImage = new Image;
backGroundImage.src = backGround;

//start btn
let startBtnPosition: Point;
let startbtnSize: TextMetrics;

function checkCollision(
    cursorPosiiton: Point,
    BtnPosition: Point,
    size: TextMetrics) {
    cursorPosiiton = new Point(
        cursorPosiiton.x + mainConstants.mapPosition.x,
        cursorPosiiton.y + mainConstants.mapPosition.y
    );
    const width = size.width;
    const height = size.actualBoundingBoxAscent +
        size.actualBoundingBoxDescent;
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

function firstScreenbtnsclicked(
    ClickedPosition: Point,
    ctx: CanvasRenderingContext2D
) {
    ClickedPosition = new Point(
        -mainConstants.mapPosition.x + ClickedPosition.x,
        -mainConstants.mapPosition.y + ClickedPosition.y
    );
    if (
        startbtnSize &&
        checkCollision(
            ClickedPosition,
            startBtnPosition,
            startbtnSize
        )) {
        stateConstants.firstPageFlag = false;
        mainConstants.homeSound.play()
        homeScreen(ctx)
    }

}


//function that handles all displays
function displayAll(ctx: CanvasRenderingContext2D) {

    // clearing screen 
    ctx.clearRect(
        -mainConstants.mapPosition.x,
        -mainConstants.mapPosition.y,
        canvas.width,
        canvas.height);

    //fill background image
    ctx.drawImage(
        backGroundImage,
        -mainConstants.mapPosition.x,
        -mainConstants.mapPosition.y,
        canvas.width,
        canvas.height
    );


    //Game Name
    const GameName = "DUNGEON DREAD"
    ctx.font = "3rem ShadowOfTheDeadOver"
    ctx.fillStyle = "white"
    const gameNameSize = ctx.measureText(GameName)
    ctx.fillText(
        GameName,
        canvas.width * 0.5-gameNameSize.width/2,
        canvas.height * 0.3+
        gameNameSize.actualBoundingBoxAscent +
        gameNameSize.actualBoundingBoxDescent
    );
    //start game
    ctx.font = "3rem Eater"
    
    startBtnPosition = new Point(
        canvas.width * 0.5-ctx.measureText("ENTER").width/2,
        -mainConstants.mapPosition.y +
        canvas.height * 0.8)
    startbtnSize = Btn(ctx, "ENTER", startBtnPosition);


}
function homeMainLoop(ctx: CanvasRenderingContext2D) {
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //calling display handiling function
    displayAll(ctx);

    if (stateConstants.homeScreenFlag) {
        requestAnimationFrame(() => {
            homeMainLoop(ctx)
        });
    }
}


export { firstScreenbtnsclicked }

export default function firstScreen(ctx: CanvasRenderingContext2D) {
    stateConstants.firstPageFlag = true;
    if (mainConstants.homeSound) {
        mainConstants.homeSound.pause();
        mainConstants.homeSound.currentTime = 0;
    }
    homeMainLoop(ctx)
}