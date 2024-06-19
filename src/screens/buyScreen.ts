import mainConstants from "../constants/mainConstants";
import stateConstants from "../constants/stateConstants";
import { canvas } from "../main";
import Point from "../modules/points";
import progressBar from "../util/bar";
import gameMain, { bulletArray, gruntType1Array, hero } from "./gameScreen";

let buyStartTime:Date;
const buyTime=5*1000;

function remainingTime() {
    const remainingTimems = (new Date).getTime() - buyStartTime.getTime()
    return remainingTimems;
}
function buyPannelLoop(ctx: CanvasRenderingContext2D){
    // clearing screen 
    ctx?.clearRect(
        -mainConstants.mapPosition.x,
        -mainConstants.mapPosition.y,
        canvas.width,
        canvas.height);

    ctx.fillStyle = "rgba(10,10,40,0.5)"
    ctx.fillRect(
        canvas.width * 0.1 - mainConstants.mapPosition.x,
        canvas.height * 0.1 - mainConstants.mapPosition.y,
        canvas.width * 0.8,
        canvas.height * 0.5
    );
    for (let i = 0; i < 4; i++) {
        ctx.fillRect(
            -mainConstants.mapPosition.x + canvas.width * ((0.2 + 0.1 * i) + 0.025),
            -mainConstants.mapPosition.y + canvas.height * (0.1 + 0.03),
            canvas.width * 0.05,
            canvas.width * 0.05
        );

       progressBar(
        ctx,
        new Point( canvas.width*0.1- mainConstants.mapPosition.x,
        canvas.height*0.7-mainConstants.mapPosition.y),
        buyTime-remainingTime(),
        buyTime,
        canvas.width*0.8,
        canvas.height*0.01,
        "Buy Time:"
       );
    }
    if (remainingTime() >= buyTime) {
        mainConstants.weaponArray.forEach(
            (obj,i)=>{
                if (obj){
                    obj.position=hero.weaponPositions[i]
                }
            }
        );
        gameMain(ctx);

    }
    if (!stateConstants.ingame){
        requestAnimationFrame(
            ()=>{
                buyPannelLoop(ctx)
            }
        )

    }
    

}


export default function buyPannel(
    ctx: CanvasRenderingContext2D
) {
    stateConstants.ingame=false;
    buyStartTime=new Date;
    buyPannelLoop(ctx);
    
}