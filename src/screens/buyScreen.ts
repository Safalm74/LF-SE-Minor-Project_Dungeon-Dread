import mainConstants from "../constants/mainConstants";
import stateConstants from "../constants/stateConstants";
import { canvas } from "../main";
import Pestol from "../modules/pestol";
import Point from "../modules/points";
import progressBar from "../util/bar";
import lowerInventory from "../util/lowerInventory";
import gameMain, { hero } from "./gameScreen";
import gunConstants from "../constants/gunConstants";

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
    cursorPosiiton = new Point(
        cursorPosiiton.x - mainConstants.mapPosition.x,
        cursorPosiiton.y - mainConstants.mapPosition.y
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
    ClickedPosition: Point
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
                        gunConstants.pistol.damage,
                        gunConstants.pistol.width,
                        gunConstants.pistol.height,
                        gunConstants.pistol.fireRate,
                        gunConstants.pistol.cost,
                        gunConstants.pistol.image,
                        "pistol"
                    );
                    break;
                case 1:
                    mainConstants.weaponArray[selectedPosition] = new Pestol(
                        hero.weaponPositions[selectedPosition],
                        false,
                        gunConstants.smg.damage,
                        gunConstants.smg.width,
                        gunConstants.smg.height,
                        gunConstants.smg.fireRate,
                        gunConstants.smg.cost,
                        gunConstants.smg.image,
                        "smg"
                    );
                    break;
                case 2:
                    mainConstants.weaponArray[selectedPosition] = new Pestol(
                        hero.weaponPositions[selectedPosition],
                        false,
                        gunConstants.sword.damage,
                        gunConstants.sword.width,
                        gunConstants.sword.height,
                        gunConstants.sword.fireRate,
                        gunConstants.sword.cost,
                        gunConstants.sword.image,
                        "sword"
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
        gunConstants.pistol.image,
        -mainConstants.mapPosition.x + canvas.width * ((0.2) + 0.025),
        -mainConstants.mapPosition.y + canvas.height * (0.1 + 0.03),
        canvas.width * 0.05,
        canvas.width * 0.05
    );
    //buy box for smg
    ctx.drawImage(
        gunConstants.smg.image,
        -mainConstants.mapPosition.x + canvas.width * ((0.3) + 0.025),
        -mainConstants.mapPosition.y + canvas.height * (0.1 + 0.03),
        canvas.width * 0.05,
        canvas.width * 0.05
    );
    //buy box for smg
    ctx.drawImage(
        gunConstants.sword.image,
        -mainConstants.mapPosition.x + canvas.width * ((0.4) + 0.025),
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
    ctx.strokeStyle = "gold";

    ctx.strokeRect(
        -mainConstants.mapPosition.x + canvas.width * ((0.2 + 0.1 * selectedPosition) + 0.025),
        -mainConstants.mapPosition.y + canvas.height * (0.8 + 0.03),
        canvas.width * 0.05,
        canvas.width * 0.05
    )
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