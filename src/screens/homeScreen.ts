import backGround from "../assets/home/background.webp"
import gruntConstants from "../constants/gruntConstants";
import mainConstants from "../constants/mainConstants";
import stateConstants from "../constants/stateConstants";
import { canvas } from "../main";
import Point from "../modules/points";
import homeAnimationSprite from "../sprites/homeAnimationSprite";
import Btn from "../util/btn";
import upcounter from "../util/upcounter";
import aboutScreen from "./aboutScreen";
import controlScreen from "./controlScreen";
import gameMain from "./gameScreen";

const backGroundImage = new Image;
backGroundImage.src = backGround;
backGroundImage.onload=upcounter;

//start btn
let startBtnPosition: Point;
let startbtnSize: TextMetrics;

//about btn
let about: Point;
let aboutBtnSize: TextMetrics;

//about btn
let controlBtnPosition: Point;
let controlBtnSize: TextMetrics;

//let SpritePosition
let spritePosition = 0

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

function btnsclicked(
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
        stateConstants.homeScreenFlag = false;
        mainConstants.homeSound.pause();
        gameMain(ctx)
    }
    if (controlBtnSize &&
        checkCollision(
            ClickedPosition,
            controlBtnPosition,
            controlBtnSize
        )) {
        stateConstants.homeScreenFlag = false;
        controlScreen(ctx)
    }
    if (aboutBtnSize &&
        checkCollision(
            ClickedPosition,
            about,
            aboutBtnSize
        )) {
        stateConstants.homeScreenFlag = false;
        aboutScreen(ctx)
    }

}

//display monster
function displayMonster(ctx: CanvasRenderingContext2D) {
    const position = Math.floor(spritePosition / 8) %
        homeAnimationSprite[1].length
    ctx.drawImage(
        gruntConstants.type3.image,
        homeAnimationSprite[1][position].position.x,
        homeAnimationSprite[1][position].position.y,
        homeAnimationSprite[1][position].width,
        homeAnimationSprite[1][position].height,
        canvas.width * 0.9 - 24,//max width of sprite instance
        mainConstants.mapPosition.y,
        homeAnimationSprite[1][position].width * canvas.width * 0.001,
        homeAnimationSprite[1][position].height * canvas.width * 0.001,
    );
    spritePosition++

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
    //
    ctx.fillStyle = "rgba(40,40,40,0.1)"
    ctx.fillRect(
        -mainConstants.mapPosition.x,
        -mainConstants.mapPosition.y,
        canvas.width,
        canvas.height

    );

    startBtnPosition = new Point(
        -mainConstants.mapPosition.x +
        canvas.width * 0.01,
        -mainConstants.mapPosition.y +
        canvas.height * 0.4)

    controlBtnPosition = new Point(
        -mainConstants.mapPosition.x +
        canvas.width * 0.01,
        -mainConstants.mapPosition.y +
        canvas.height * 0.5)

    about = new Point(
        -mainConstants.mapPosition.x +
        canvas.width * 0.01,
        -mainConstants.mapPosition.y +
        canvas.height * 0.6)
    //Game Name
    const GameName = "DUNGEON DREAD"
    ctx.font = "3rem ShadowOfTheDeadOver"
    ctx.fillStyle = "white"
    const gameNameSize = ctx.measureText(GameName)
    ctx.fillText(
        GameName,
        -mainConstants.mapPosition.x +
        canvas.width * 0.01,
        -mainConstants.mapPosition.y +
        canvas.height * 0.01 +
        gameNameSize.actualBoundingBoxAscent +
        gameNameSize.actualBoundingBoxDescent
    );
    //start game
    startbtnSize = Btn(ctx, "PLAY", startBtnPosition);

    //about game
    aboutBtnSize = Btn(ctx, "ABOUT", about);

    //controls
    controlBtnSize = Btn(ctx, "CONTROLS", controlBtnPosition);

    //displaymonster
    displayMonster(ctx);


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


export { btnsclicked }

export default function homeScreen(ctx: CanvasRenderingContext2D) {
    stateConstants.homeScreenFlag = true;
    if (!stateConstants.ismute) {
        if (mainConstants.homeSound) {
            mainConstants.homeSound.pause();
            mainConstants.homeSound.currentTime = 0;
        }
        mainConstants.homeSound.play()

    }

    homeMainLoop(ctx)
}