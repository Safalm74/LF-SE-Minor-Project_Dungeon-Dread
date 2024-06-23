import backGround from "../assets/home/background.webp"
import mainConstants from "../constants/mainConstants";
import stateConstants from "../constants/stateConstants";
import { canvas } from "../main";
import Point from "../modules/points";
import Btn from "../util/btn";
import homeScreen from "./homeScreen";
import controlImageSrc from "../assets/controls/Controls.png";

const controlImage=new Image;
controlImage.src=controlImageSrc;

const backGroundImage = new Image;
backGroundImage.src = backGround;



//aboutToHome btn
let aboutToHomeBtnPosition: Point;
let aboutToHomebtnSize: TextMetrics;

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

function controlBtnClicked(
    ClickedPosition: Point,
    ctx: CanvasRenderingContext2D
) {
    if (checkCollision(
        ClickedPosition,
        aboutToHomeBtnPosition,
        aboutToHomebtnSize
    )) {
        stateConstants.aboutScreenFlag=false;
        homeScreen(ctx);
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
    ctx.fillStyle = "rgba(40,40,40,0.8)"
    //about text wrapping div
    ctx.drawImage(
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
 
    aboutToHomeBtnPosition=new Point(
        canvas.width * 0.1,
        canvas.height * 0.8)
    //tohomeBtn
    aboutToHomebtnSize=Btn(
        ctx,
        "<-- return Home",
        aboutToHomeBtnPosition,
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
    console.log("in control");
    ctx.translate(-mainConstants.mapPosition.x, 
        -mainConstants.mapPosition.y);
    mainConstants.mapPosition=new Point(0,0)
    homeMainLoop(ctx)
}