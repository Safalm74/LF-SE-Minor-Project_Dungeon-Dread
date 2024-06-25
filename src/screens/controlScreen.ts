//modules
import Point from "../modules/points";
//constants
import mainConstants from "../constants/mainConstants";
import stateConstants from "../constants/stateConstants";
import screenConstants from "../constants/screenConstants";
//utils
import Btn from "../util/btn";
import checkCursorCollision from "../util/cursorCollision";
//sprite information
//objs
import { canvas } from "../main";
//screens
import homeScreen from "./homeScreen";
//variables
let controlBtnPosition: Point;
let controlbtnSize: TextMetrics;
function controlBtnClicked(
    ClickedPosition: Point,
    ctx: CanvasRenderingContext2D
) {
    if (checkCursorCollision(
        ClickedPosition,
        controlBtnPosition,
        controlbtnSize
    )) {
        stateConstants.aboutScreenFlag=false;
        homeScreen(ctx);
    }
}
//function that handles all displays
function displayAll(ctx: CanvasRenderingContext2D) {
    //fill background image
    ctx.drawImage(
        screenConstants.backGroundImage,
        0,
        0,
        canvas.width,
        canvas.height
    );
    ctx.fillStyle = "rgba(40,40,40,0.8)"
    //control instructions image
    ctx.drawImage(
        screenConstants.
        controlImage,
        canvas.width * 0.1,
        canvas.height * 0.2,
        canvas.width * 0.5,
        canvas.height * 0.5
    );
    ctx.fillStyle = "white";
    ctx.font = "2rem ShadowOfTheDeadOver"
    ctx.fillText(
        "Controls",
        canvas.width * 0.1,
        canvas.height * 0.1
    );
    controlBtnPosition=new Point(
        canvas.width * 0.1,
        canvas.height * 0.8)
    //tohomeBtn
    controlbtnSize=Btn(
        ctx,
        "<-- return Home",
        controlBtnPosition,
        "1rem ShadowOfTheDeadOver"
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
export { controlBtnClicked }
export default function controlScreen(ctx: CanvasRenderingContext2D) {
    stateConstants.controlScreenFlag=true;
    ctx.translate(-mainConstants.mapPosition.x, 
        -mainConstants.mapPosition.y);
    mainConstants.mapPosition=new Point(0,0)
    homeMainLoop(ctx)
}