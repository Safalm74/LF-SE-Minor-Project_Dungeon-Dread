import mainConstants from "../constants/mainConstants";
import stateConstants from "../constants/stateConstants";
import { canvas } from "../main";
import Pestol, { gunImage } from "../modules/pestol";
import Point from "../modules/points";
import progressBar from "../util/bar";
import lowerInventory from "../util/lowerInventory";
import gameMain, { hero } from "./gameScreen";
import pestolSprite from "../sprites/pestolSprite";

let buyStartTime: Date;
const buyTime = 5 * 1000;

let selectedPosition: number = 0;


function remainingTime() {
    const remainingTimems = (new Date).getTime() - buyStartTime.getTime()
    return remainingTimems;
}

function checkCollision(
    cursorPosiiton: Point,
    BtnPosition: Point,
    size: Point) {
    const width = size.x;
    const height = size.y;
    cursorPosiiton=new Point(
        cursorPosiiton.x-mainConstants.mapPosition.x,
        cursorPosiiton.y-mainConstants.mapPosition.y
    )
    if (
        cursorPosiiton.x > BtnPosition.x &&
        cursorPosiiton.x < BtnPosition.x + width &&
        cursorPosiiton.y > BtnPosition.y &&
        cursorPosiiton.y < BtnPosition.y + height
    ) {
        return true
    }
    else {
        return false
    }
}


let buyBtnsclicked = (
    ClickedPosition: Point,
    ctx: CanvasRenderingContext2D
) => {

    for (let i = 0; i < 6; i++) {
        const inventorPositionFlag = (checkCollision(
            ClickedPosition,
            new Point(
                -mainConstants.mapPosition.x + canvas.width * ((0.2 + 0.1 * i) + 0.025),
                -mainConstants.mapPosition.y + canvas.height * (0.8 + 0.03)
            ),
            new Point(
                canvas.width * 0.05,
                canvas.width * 0.05
            )

        ));
        if (inventorPositionFlag) {
            selectedPosition = i
            break;
        }

    }
    for (let i = 0; i < 3; i++) {
        const inventorPositionFlag = checkCollision(
            ClickedPosition,
            new Point(
                -mainConstants.mapPosition.x + canvas.width * ((0.2 + 0.1 * i) + 0.025),
                -mainConstants.mapPosition.y + canvas.height * (0.1 + 0.03)),
            new Point(canvas.width * 0.05,
                canvas.width * 0.05)
        );
        if (inventorPositionFlag) {
            switch (i) {
                case 0:
                    mainConstants.weaponArray[selectedPosition] = new Pestol(
                        hero.weaponPositions[selectedPosition],
                        false,
                        10,
                        pestolSprite.width * hero.width * 0.01,
                        pestolSprite.height * hero.width * 0.01
                    );
                    break;
            }
            break;
        }
    }



}
function buyPannelLoop(ctx: CanvasRenderingContext2D) {
    // clearing screen 
    ctx?.clearRect(
        -mainConstants.mapPosition.x,
        -mainConstants.mapPosition.y,
        canvas.width,
        canvas.height);

    ctx.fillStyle = "rgba(10,10,40,0.5)"
    //buy box Wrapper
    ctx.fillRect(
        canvas.width * 0.1 - mainConstants.mapPosition.x,
        canvas.height * 0.1 - mainConstants.mapPosition.y,
        canvas.width * 0.8,
        canvas.height * 0.5
    );
    //buy box title
    ctx.font = '3rem ShadowOfTheDeadOver';
    ctx.fillStyle = "#4caf50"
    ctx.fillText(
        "Buy Menu: ",
        canvas.width * 0.1 - mainConstants.mapPosition.x,
        canvas.height * 0.1 - mainConstants.mapPosition.y,
    );
    ctx.fillStyle = "rgba(200,200,200,0.8)"
    //innerbox for buy
    for (let i = 0; i < 3; i++) {
        ctx.fillRect(
            -mainConstants.mapPosition.x + canvas.width * ((0.2 + 0.1 * i) + 0.025),
            -mainConstants.mapPosition.y + canvas.height * (0.1 + 0.03),
            canvas.width * 0.05,
            canvas.width * 0.05
        );
    }
    //buy box for pestol
    ctx.drawImage(
        gunImage,
        -mainConstants.mapPosition.x + canvas.width * ((0.2) + 0.025),
        -mainConstants.mapPosition.y + canvas.height * (0.1 + 0.03),
        canvas.width * 0.05,
        canvas.width * 0.05
    );

    progressBar(
        ctx,
        new Point(canvas.width * 0.1 - mainConstants.mapPosition.x,
            canvas.height * 0.7 - mainConstants.mapPosition.y),
        remainingTime(),
        buyTime,
        canvas.width * 0.8,
        canvas.height * 0.01,
        "Buy Time:"
    );

    lowerInventory(ctx);
    if (remainingTime() >= buyTime) {
        mainConstants.weaponArray.forEach(
            (obj, i) => {
                if (obj) {
                    obj.position = hero.weaponPositions[i]
                }
            }
        );
        stateConstants.buyScreenFlag = false;
        gameMain(ctx);

    }
    if (!stateConstants.ingame) {
        requestAnimationFrame(
            () => {
                buyPannelLoop(ctx)
            }
        )

    }


}

export { buyBtnsclicked }

export default function buyPannel(
    ctx: CanvasRenderingContext2D
) {
    stateConstants.ingame = false;
    stateConstants.buyScreenFlag = true;
    buyStartTime = new Date;
    selectedPosition = 0;

    buyPannelLoop(ctx);

}