import backGround from "../assets/home/background.webp"
import mainConstants from "../constants/mainConstants";
import stateConstants from "../constants/stateConstants";
import { canvas } from "../main";
import Point from "../modules/points";
import progressBar from "../util/bar";
import upcounter from "../util/upcounter";
import firstScreen from "./firstScreen";

const backGroundImage = new Image;
backGroundImage.src = backGround;
backGroundImage.onload=upcounter;


//function that handles all displays
function displayAll(ctx: CanvasRenderingContext2D) {
    // clearing screen 
    ctx.clearRect(
        -mainConstants.mapPosition.x,
        -mainConstants.mapPosition.y,
        canvas.width,
        canvas.height);

    //fill background image
    ctx.fillStyle="rgba(40,40,240,1)";
    ctx.fillRect(
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
    progressBar(
        ctx,
        new Point(
            canvas.width*0.3,
            canvas.height*0.5
        ),
        stateConstants.assetsLoaded,
        18,
        canvas.width*0.4,
        10,
        `Loading... `
    );
    if(stateConstants.assetsLoaded>=19){
        stateConstants.loadingScreen=false;
        firstScreen(ctx)
    }

}
function homeMainLoop(ctx: CanvasRenderingContext2D) {
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //calling display handiling function
    displayAll(ctx);

    if (stateConstants.loadingScreen) {
        requestAnimationFrame(() => {
            homeMainLoop(ctx)
        });
    }
}


export default function loadingScreen(ctx: CanvasRenderingContext2D) {
    stateConstants.loadingScreen = true;
    if (!stateConstants.ismute) {
        if (mainConstants.homeSound) {
            mainConstants.homeSound.pause();
            mainConstants.homeSound.currentTime = 0;
        }
        mainConstants.homeSound.play()

    }

    homeMainLoop(ctx)
}