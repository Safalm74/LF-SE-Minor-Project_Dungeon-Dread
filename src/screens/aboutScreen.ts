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

const aboutMsg = `
    The world in Dungeon Dread has multiple dungeons 
    where zombies/monsters exist. The dungeon boss controls them. 
    Our main character is a zombie/monster hunter. 
    Initially, our character is equipped with 
    a weaker weapon. As he kills zombies and collects 
    rewards, the character can buy weapons at the end 
    of the wave. The boss appears at the final wave. 
    The game's objective is to survive each wave and defeat 
    the boss. Boss is much stronger than a regular monster/zombie. Stronger in the sense 
    of higher damage and higher health. After defeating the boss, 
    the dungeon's remaining monsters/zombies disappear and the dungeon 
    is free of monsters/zombies.`

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

function aboutbtnsclicked(
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
    ctx.fillRect(
        canvas.width * 0.1,
        canvas.height * 0.1,
        canvas.width * 0.8,
        canvas.height * 0.8
    );
    ctx.fillStyle = "white";
    ctx.font = "2rem ShadowOfTheDeadOver"
    ctx.fillText(
        "About",
        canvas.width * 0.1,
        canvas.height * 0.1
    );
    //about msg rendering
    textWrapper(
        ctx,
        aboutMsg,
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


export { aboutbtnsclicked }

export default function aboutScreen(ctx: CanvasRenderingContext2D) {
    stateConstants.aboutScreenFlag=true;
    ctx.translate(-mainConstants.mapPosition.x, 
        -mainConstants.mapPosition.y);
    mainConstants.mapPosition=new Point(0,0)
    homeMainLoop(ctx)
}