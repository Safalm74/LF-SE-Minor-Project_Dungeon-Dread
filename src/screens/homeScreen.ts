
//modules
import Point from "../modules/points";
//constants
import gruntConstants from "../constants/gruntConstants";
import mainConstants from "../constants/mainConstants";
import screenConstants from "../constants/screenConstants";
import stateConstants from "../constants/stateConstants";
//utils
import Btn from "../util/btn";
import checkCursorCollision from "../util/cursorCollision";
import loadInfoScreen from "../util/infoScreenLoader";
//sprite information
import homeAnimationSprite from "../sprites/homeAnimationSprite";
//objs
import { canvas } from "../main";
//screens
import controlScreen from "./controlScreen";
import gameMain from "./gameScreen";
//start btn
let startBtnPosition: Point;
let startbtnSize: TextMetrics;
//about btn
let aboutBtnPosition: Point;
let aboutBtnSize: TextMetrics;
//about btn
let controlBtnPosition: Point;
let controlBtnSize: TextMetrics;
//let SpritePosition
let spritePosition = 0
//function to check collision position


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
        checkCursorCollision(
            ClickedPosition,
            startBtnPosition,
            startbtnSize
        )) {
        stateConstants.homeScreenFlag = false;
        mainConstants.homeSound.pause();
        //loading about screen
        loadInfoScreen(
            ctx,
            "story1",
            "Continue =>",
            () => {
                loadInfoScreen(
                    ctx,
                    "aboutHero",
                    "Continue =>",
                    gameMain,
                    screenConstants.heroIntroductionSound
                )

                gameMain(ctx)
            },
            screenConstants.story1sound
        )
    }
    if (controlBtnSize &&
        checkCursorCollision(
            ClickedPosition,
            controlBtnPosition,
            controlBtnSize
        )) {
        stateConstants.homeScreenFlag = false;
        controlScreen(ctx)
    }
    if (aboutBtnSize &&
        checkCursorCollision(
            ClickedPosition,
            aboutBtnPosition,
            aboutBtnSize
        )) {
        stateConstants.homeScreenFlag = false;
        //loading about screen
        loadInfoScreen(
            ctx,
            "about",
            "<=return Home",
            homeScreen
        );
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
        screenConstants.backGroundImage,
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

    aboutBtnPosition = new Point(
        -mainConstants.mapPosition.x +
        canvas.width * 0.01,
        -mainConstants.mapPosition.y +
        canvas.height * 0.6)
    //Game Name
    const GameName = "DUNGEON DREAD"
    ctx.font = "4rem ShadowOfTheDeadOver"
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
    startbtnSize = Btn(ctx, "PLAY",
        startBtnPosition,
        "4rem bold Eater ",
        "red");

    //about game
    aboutBtnSize = Btn(ctx, "ABOUT", aboutBtnPosition);

    //controls
    controlBtnSize = Btn(ctx, "INSTRUCTIONS", controlBtnPosition);

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