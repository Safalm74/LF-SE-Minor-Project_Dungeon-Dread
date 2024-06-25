//modules
import Point from "../modules/points";
import Gun from "../modules/gun";
//constants
import gunConstants from "../constants/gunConstants";
import mainConstants from "../constants/mainConstants";
import stateConstants from "../constants/stateConstants";
//utils
import lowerInventory from "../util/lowerInventory";
import progressBar from "../util/bar";
//sprite information
import pestolSprite from "../sprites/pestolSprite";
import smgSprite from "../sprites/smgSprite";
import vandalSprite from "../sprites/vandalSprite";
import hunterSprite from "../sprites/hunterStrite";
//objs
import { canvas } from "../main";
//screens
import gameMain, { hero } from "./gameScreen";

//variables
let buyStartTime: Date; //to hold time
let selectedPosition: number = 0;//to track selected position to buy

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
                -mainConstants.mapPosition.x +
                canvas.width * ((0.2 + 0.1 * i) + 0.025),
                -mainConstants.mapPosition.y +
                canvas.height * (0.8 + 0.03)
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
    const boxWrapperWidth = canvas.width *
        0.8 -
        mainConstants.mapPosition.x;
    const boxWrapperHeight = canvas.height *
        0.5 -
        mainConstants.mapPosition.y;

    const boxWrapperPosition = new Point(
        canvas.width * 0.1 - mainConstants.mapPosition.x,
        canvas.height * 0.1 - mainConstants.mapPosition.y
    )
    for (let i = 0; i < 4; i++) {
        const inventorPositionFlag = checkCollision(
            ClickedPosition,
            new Point(boxWrapperPosition.x + boxWrapperWidth * i / 4,
                boxWrapperPosition.y),
            new Point(boxWrapperWidth / 4,
                boxWrapperHeight)
        );
        if (inventorPositionFlag) {
            switch (i) {
                case 0:
                    if (hero.gemCount >= gunConstants.pistol.cost) {
                        mainConstants.weaponArray[selectedPosition] = new Gun(
                            hero.weaponPositions[selectedPosition],
                            false,
                            gunConstants.pistol.damage,
                            gunConstants.pistol.width,
                            gunConstants.pistol.height,
                            gunConstants.pistol.fireRate,
                            gunConstants.pistol.cost,
                            gunConstants.pistol.image,
                            "pistol",
                            new Audio(gunConstants.pistol.soundSrc)
                        );
                        hero.gemCount -= gunConstants.pistol.cost;
                    }
                    break;
                case 1:
                    if (hero.gemCount >= gunConstants.smg.cost) {
                        mainConstants.weaponArray[selectedPosition] = new Gun(
                            hero.weaponPositions[selectedPosition],
                            false,
                            gunConstants.smg.damage,
                            gunConstants.smg.width,
                            gunConstants.smg.height,
                            gunConstants.smg.fireRate,
                            gunConstants.smg.cost,
                            gunConstants.smg.image,
                            "smg",
                            new Audio(gunConstants.smg.soundSrc)
                        );
                        hero.gemCount -= gunConstants.smg.cost;
                    }
                    break;
                case 2:
                    if (hero.gemCount >= gunConstants.vandal.cost) {
                        mainConstants.weaponArray[selectedPosition] = new Gun(
                            hero.weaponPositions[selectedPosition],
                            false,
                            gunConstants.vandal.damage,
                            gunConstants.vandal.width,
                            gunConstants.vandal.height,
                            gunConstants.vandal.fireRate,
                            gunConstants.vandal.cost,
                            gunConstants.vandal.image,
                            "vandal",
                            new Audio(gunConstants.vandal.soundSrc)
                        );
                        hero.gemCount -= gunConstants.vandal.cost;
                    }
                    break;
                case 3:
                    if (hero.gemCount >= gunConstants.hunter.cost) {
                        mainConstants.weaponArray[selectedPosition] = new Gun(
                            hero.weaponPositions[selectedPosition],
                            false,
                            gunConstants.hunter.damage,
                            gunConstants.hunter.width,
                            gunConstants.hunter.height,
                            gunConstants.hunter.fireRate,
                            gunConstants.hunter.cost,
                            gunConstants.hunter.image,
                            "hunter",
                            new Audio(gunConstants.hunter.soundSrc)
                        );
                        hero.gemCount -= gunConstants.hunter.cost;
                    }
                    break;
            }
            for (let i = 0; i < mainConstants.weaponArray.length; i++) {
                selectedPosition = i;
                if (!mainConstants.weaponArray[i]) {
                    break;
                }
            }
            break;
        }
    }
}
function upgradeWeapon() {
    if (
        mainConstants.weaponArray[selectedPosition] &&
        mainConstants.weaponArray[selectedPosition]!.level < 3 &&
        hero.gemCount >= mainConstants.weaponArray[selectedPosition]!.cost * 1.1

    ) {
        mainConstants.weaponArray[selectedPosition]!.damage += mainConstants.
            weaponArray[selectedPosition]!
            .damage *
            0.1
        mainConstants.weaponArray[selectedPosition]!.fireRate += mainConstants.
            weaponArray[selectedPosition]!
            .fireRate *
            0.1
        mainConstants.weaponArray[selectedPosition]!.level++;
        hero.gemCount -= mainConstants.weaponArray[selectedPosition]!.cost * 0.1
    } else {
        if (mainConstants.denySound) {
            mainConstants.denySound.pause();
            mainConstants.denySound.currentTime = 0;
        }
        mainConstants.denySound.play();
    }
}
function buyCard(
    ctx: CanvasRenderingContext2D,
    index: number,
    boxWrapperPosition: Point,
    boxWrapperWidth: number,
    boxWrapperHeight: number,
    gunLogoSize: number,
    gunImage: HTMLImageElement,
    gunSpritePosition: Point,
    gunSpriteWidth: number,
    gunSpriteHeight: number,
    name: string,
    cost: number,
    damage: number,
    fireRate: number,


) {
    //outer line
    ctx.strokeRect(
        boxWrapperPosition.x + boxWrapperWidth * index / 4,
        boxWrapperPosition.y,
        boxWrapperWidth / 4,
        boxWrapperHeight
    );
    //gun holding box
    ctx.fillRect(
        boxWrapperPosition.x +
        boxWrapperWidth * index / 4 +
        boxWrapperWidth / 8
        - gunLogoSize / 2,
        boxWrapperPosition.y * 1.3,
        gunLogoSize,
        gunLogoSize
    );
    //drawing gun
    ctx.drawImage(
        gunImage,
        gunSpritePosition.x,
        gunSpritePosition.y,
        gunSpriteWidth,
        gunSpriteHeight,
        boxWrapperPosition.x +
        boxWrapperWidth * index / 4 +
        boxWrapperWidth / 8
        - gunLogoSize / 2,
        boxWrapperPosition.y * 1.3,
        gunLogoSize,
        gunLogoSize);
    ctx.font = "2rem Eater"
    ctx.fillStyle = "white"
    const sample = ctx.measureText("sample");
    const lineHeight = sample.actualBoundingBoxAscent +
        sample.actualBoundingBoxDescent;
    ctx.fillText(
        `Gun: ${name}`,
        boxWrapperPosition.x +
        boxWrapperWidth * index / 4 + gunLogoSize / 2,
        boxWrapperPosition.y * 1.3 + gunLogoSize + lineHeight * 4
    );
    ctx.fillText(
        `Cost: ${cost}`,
        boxWrapperPosition.x +
        boxWrapperWidth * index / 4 + gunLogoSize / 2,
        boxWrapperPosition.y * 1.3 + gunLogoSize + lineHeight * 5.5
    );
    ctx.fillText(
        `Damage: ${damage}`,
        boxWrapperPosition.x +
        boxWrapperWidth * index / 4 + gunLogoSize / 2,
        boxWrapperPosition.y * 1.3 + gunLogoSize + lineHeight * 7
    );
    ctx.fillText(
        `Fire Rate: ${fireRate}`,
        boxWrapperPosition.x +
        boxWrapperWidth * index / 4 + gunLogoSize / 2,
        boxWrapperPosition.y * 1.3 + gunLogoSize + lineHeight * 8.5
    );

}
function buyPannelLoop(ctx: CanvasRenderingContext2D) {
    const boxWrapperWidth = canvas.width * 0.8
        - mainConstants.mapPosition.x
    const boxWrapperHeight = canvas.height * 0.5
        - mainConstants.mapPosition.y
    const boxWrapperPosition = new Point(
        canvas.width * 0.1 - mainConstants.mapPosition.x,
        canvas.height * 0.1 - mainConstants.mapPosition.y
    )
    let gunIndex: number;
    const gunLogoSize = canvas.width * 0.05;
    // clearing screen 
    ctx?.clearRect(
        -mainConstants.mapPosition.x,
        -mainConstants.mapPosition.y,
        canvas.width,
        canvas.height);

    ctx.fillStyle = "rgba(10,10,40,0.5)"
    //buy box Wrapper
    ctx.fillRect(
        boxWrapperPosition.x,
        boxWrapperPosition.y,
        boxWrapperWidth,
        boxWrapperHeight
    );
    //buy box title
    ctx.font = '3rem ShadowOfTheDeadOver';
    ctx.fillStyle = "#4caf50"
    ctx.fillText(
        `Buy Menu: `,
        canvas.width * 0.1 - mainConstants.mapPosition.x,
        canvas.height * 0.1 - mainConstants.mapPosition.y,
    );
    //show gems
    ctx.font = '2rem Eater';
    ctx.fillStyle = "#4caf50"
    ctx.fillText(
        `Gems Count: ${hero.gemCount}`,
        canvas.width * 0.8 - mainConstants.mapPosition.x,
        canvas.height * 0.1 - mainConstants.mapPosition.y,
    );
    ctx.fillStyle = "rgba(200,200,200,0.8)"
    //innerbox for buy
    ctx.strokeStyle = "green"
    //buycard for pistol
    gunIndex = 0
    buyCard(
        ctx,
        gunIndex,
        boxWrapperPosition,
        boxWrapperWidth,
        boxWrapperHeight,
        gunLogoSize,
        gunConstants.pistol.image,
        pestolSprite.positionRight[0],
        pestolSprite.width,
        pestolSprite.height,
        `Pistol`,
        gunConstants.pistol.cost,
        gunConstants.pistol.damage,
        gunConstants.pistol.fireRate

    );
    //buycard for smg
    gunIndex = 1
    buyCard(
        ctx,
        gunIndex,
        boxWrapperPosition,
        boxWrapperWidth,
        boxWrapperHeight,
        gunLogoSize,
        gunConstants.smg.image,
        smgSprite.positionRight[0],
        smgSprite.width,
        smgSprite.height,
        `SMG`,
        gunConstants.smg.cost,
        gunConstants.smg.damage,
        gunConstants.smg.fireRate
    );
    //buycard for vandal
    gunIndex = 2
    buyCard(
        ctx,
        gunIndex,
        boxWrapperPosition,
        boxWrapperWidth,
        boxWrapperHeight,
        gunLogoSize,
        gunConstants.vandal.image,
        vandalSprite.positionRight[0],
        vandalSprite.width,
        vandalSprite.height,
        `vandal`,
        gunConstants.vandal.cost,
        gunConstants.vandal.damage,
        gunConstants.vandal.fireRate

    );
    //buycard for vandal
    gunIndex = 3
    buyCard(
        ctx,
        gunIndex,
        boxWrapperPosition,
        boxWrapperWidth,
        boxWrapperHeight,
        gunLogoSize,
        gunConstants.hunter.image,
        hunterSprite.positionRight[0],
        hunterSprite.width,
        hunterSprite.height,
        `hunter`,
        gunConstants.hunter.cost,
        gunConstants.hunter.damage,
        gunConstants.vandal.fireRate

    );
    //rendering lower inventory
    lowerInventory(ctx);
    ctx.strokeStyle = "gold";
    ctx.strokeRect(
        -mainConstants.mapPosition.x + canvas.width * ((0.2 + 0.1 * selectedPosition) + 0.025),
        -mainConstants.mapPosition.y + canvas.height * (0.8 + 0.03),
        canvas.width * 0.05,
        canvas.width * 0.05
    )
    //time bar to buy guns
    progressBar(
        ctx,
        new Point(canvas.width * 0.1 - mainConstants.mapPosition.x,
            canvas.height * 0.7 - mainConstants.mapPosition.y),
        remainingTime(),
        mainConstants.buyTime,
        canvas.width * 0.8,
        canvas.height * 0.01,
        "Buy Time:"
    );
    //checking buy time
    if (remainingTime() >= mainConstants.buyTime) {
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
export { buyBtnsclicked, upgradeWeapon }
export default function buyPannel(
    ctx: CanvasRenderingContext2D
) {

    ctx.translate(-mainConstants.mapPosition.x,
        -mainConstants.mapPosition.y);
    mainConstants.mapPosition = new Point(0, 0)
    stateConstants.ingame = false;
    stateConstants.buyScreenFlag = true;
    buyStartTime = new Date;
    selectedPosition = 0;
    for (let i = 0; i < mainConstants.weaponArray.length; i++) {
        selectedPosition = i;
        if (!mainConstants.weaponArray[i]) {
            break;
        }
    }
    buyPannelLoop(ctx);
}