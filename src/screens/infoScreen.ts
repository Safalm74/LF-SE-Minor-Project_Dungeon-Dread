import backGround from "../assets/home/background.webp"
import mainConstants from "../constants/mainConstants";
import stateConstants from "../constants/stateConstants";
import { canvas } from "../main";
import Point from "../modules/points";
import Btn from "../util/btn";
import textWrapper from "../util/textwrapper";
import upcounter from "../util/upcounter";
import homeScreen from "./homeScreen";

const backGroundImage = new Image;
backGroundImage.src = backGround;

backGroundImage.onload=upcounter;

let BtnFunction:(ctx:CanvasRenderingContext2D)=>void;
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

function infoScreenBtn(
    ClickedPosition: Point,
    ctx: CanvasRenderingContext2D
) {
    if (checkCollision(
        ClickedPosition,
        aboutToHomeBtnPosition,
        aboutToHomebtnSize
    )) {
        stateConstants.infoScreenFlag=false;
        BtnFunction(ctx);
    }
}

//function that handles all displays
function displayAll(ctx: CanvasRenderingContext2D,
    heading:string,
    msg:string,
    btnName:string
) {

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
    ctx.fillRect(
        canvas.width * 0.1,
        canvas.height * 0.1,
        canvas.width * 0.8,
        canvas.height * 0.8
    );

    ctx.fillStyle = "white";
    ctx.font = "2rem ShadowOfTheDeadOver"
    ctx.fillText(
        heading,
        canvas.width * 0.1,
        canvas.height * 0.1
    );
    //about msg rendering
    textWrapper(
        ctx,
        msg,
        canvas.width * 0.8,
        new Point(
            canvas.width * 0.1,
            canvas.height * 0.3),
        "1rem GloriaHallelujah"
    );
    aboutToHomeBtnPosition=new Point(
        canvas.width * 0.1,
        canvas.height * 0.8)
    //tohomeBtn
    aboutToHomebtnSize=Btn(
        ctx,
        btnName,
        aboutToHomeBtnPosition,
        "1rem ShadowOfTheDeadOver"
    );
}
function homeMainLoop(ctx: CanvasRenderingContext2D,
    heading:string,
    msg:string,
    btnName:string
) {
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //calling display handiling function
    displayAll(ctx,
        heading,
        msg,
        btnName
    );
    requestAnimationFrame(() => {
        homeMainLoop(ctx,
            heading,
            msg,
            btnName
        )
    });
}


export { infoScreenBtn }

export default function infoScreen(ctx: CanvasRenderingContext2D,
    heading:string,
    msg:string,
    btnName:string,
    BtnPassedFunction:(ctx:CanvasRenderingContext2D)=>void


) {
    BtnFunction=BtnPassedFunction
    stateConstants.infoScreenFlag=true;
    ctx.translate(-mainConstants.mapPosition.x, 
        -mainConstants.mapPosition.y);
    mainConstants.mapPosition=new Point(0,0)
    homeMainLoop(ctx,
        heading,
        msg,
        btnName
    )
}