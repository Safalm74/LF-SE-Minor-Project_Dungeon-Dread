//modules
import Point from "../modules/points";
//constants
import mainConstants from "../constants/mainConstants";
import stateConstants from "../constants/stateConstants";
import screenConstants from "../constants/screenConstants";
//utils
import Btn from "../util/btn";
import checkCursorCollision from "../util/cursorCollision";
//objs
import { canvas } from "../main";
//screens
import homeScreen from "./homeScreen";
//start btn
let startBtnPosition: Point;
let startbtnSize: TextMetrics;
function firstScreenbtnsclicked(
    ClickedPosition: Point,
    ctx: CanvasRenderingContext2D
) {
    ClickedPosition = new Point(
        -mainConstants.mapPosition.x +
        ClickedPosition.x,
        -mainConstants.mapPosition.y +
        ClickedPosition.y
    );
    if (
        startbtnSize &&
        checkCursorCollision(
            ClickedPosition,
            startBtnPosition,
            startbtnSize
        )) {
        stateConstants.firstPageFlag = false;
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
        screenConstants.backGroundImage,
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
        canvas.width * 0.5 - gameNameSize.width / 2,
        canvas.height * 0.3 +
        gameNameSize.actualBoundingBoxAscent +
        gameNameSize.actualBoundingBoxDescent
    );
    //start game
    let startbtnColor: string = "red";
    window.addEventListener(
        'mousemove',
        (e) => {
            startbtnColor = checkCursorCollision(
                new Point(
                    e.offsetX,
                    e.offsetY
                ),
                startBtnPosition,
                startbtnSize
            ) ? "blue" : "red"
        }
    )
    window.addEventListener(
        "keypress"
        ,
        () => {
            stateConstants.firstPageFlag = false;
            homeScreen(ctx)
        }
    )
    ctx.font = "3rem Eater"
    startBtnPosition = new Point(
        canvas.width * 0.5 - ctx.measureText("Press any button").width / 2,
        -mainConstants.mapPosition.y +
        canvas.height * 0.8)
    startbtnSize = Btn(ctx,
        "Press any button",
        startBtnPosition,
        "4rem bold Eater",
        startbtnColor
    );
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