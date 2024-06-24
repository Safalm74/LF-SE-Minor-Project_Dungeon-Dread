import heroConstants from "../constants/heroConstants";
import mainConstants from "../constants/mainConstants";
import stateConstants from "../constants/stateConstants";
import { ctx } from "../main";
import Point from "../modules/points";
import { aboutbtnsclicked } from "../screens/aboutScreen";
import { buyBtnsclicked, upgradeWeapon } from "../screens/buyScreen";
import { controlBtnClicked } from "../screens/controlScreen";
import { firstScreenbtnsclicked } from "../screens/firstScreen";
import { hero } from "../screens/gameScreen";
import { btnsclicked } from "../screens/homeScreen";
import { infoScreenBtn } from "../screens/infoScreen";
function handleSounds() {
    if (stateConstants.ismute) {


        mainConstants.windSound.pause();
        mainConstants.windSound.currentTime = 0;
    }
    else {
        if (stateConstants.homeScreenFlag) {
            mainConstants.homeSound.play();
        }
        if (stateConstants.ingame) {
            mainConstants.windSound.play();
        }
    }
}
function handleEvents() {
    if (
        (stateConstants.btnPressed['a'] && stateConstants.btnPressed['w']) ||
        (stateConstants.btnPressed['a'] && stateConstants.btnPressed['s']) ||
        (stateConstants.btnPressed['d'] && stateConstants.btnPressed['w']) ||
        (stateConstants.btnPressed['d'] && stateConstants.btnPressed['s'])

    ) {
        hero.velocity.x = 0.7 * heroConstants.velocity.x
        hero.velocity.y = 0.7* heroConstants.velocity.y

    }
    else if (
        (
            stateConstants.btnPressed['c'] &&
            (
                stateConstants.btnPressed['w'] ||
                stateConstants.btnPressed['a'] ||
                stateConstants.btnPressed['s'] ||
                stateConstants.btnPressed['d']
            ))
    )
     {
        hero.run();
    }
    else {

        hero.velocity.x = heroConstants.velocity.x
        hero.velocity.y = heroConstants.velocity.y

    }
    if (stateConstants.btnPressed['a']) {
        hero.isMoving = true;
        hero.moveLeft(true, ctx);
    }
    if (stateConstants.btnPressed['d']) {
        hero.isMoving = true;
        hero.moveLeft(false, ctx);
    }
    if (stateConstants.btnPressed['w']) {
        hero.moveUp(true, ctx);
        hero.isMoving = true;
    }
    if (stateConstants.btnPressed['s']) {
        hero.moveUp(false, ctx);
        hero.isMoving = true;
    }
    if (stateConstants.btnPressed[' ']) {
        hero.ability();
    }

}

export { handleEvents }

export default function eventhandler() {
    //Defining Event Handlers
    window.addEventListener(
        'keydown',
        (e) => {
            stateConstants.btnPressed[e.key.toLowerCase()] = true
            if (stateConstants.buyScreenFlag && stateConstants.btnPressed['u']) {
                console.log('here');
                upgradeWeapon();
            }
            if (e.key.toLowerCase() === "m") {
                stateConstants.ismute = stateConstants.ismute ?
                    false :
                    true
                handleSounds();
            }
        }
    );
    window.addEventListener(
        'keyup',
        (e) => {
            stateConstants.btnPressed[e.key.toLowerCase()] = false
            hero.isMoving = false;
        }
    );
    window.addEventListener(
        'click',
        (e) => {
            if (stateConstants.firstPageFlag) {
                firstScreenbtnsclicked(
                    new Point(
                        e.offsetX,
                        e.offsetY),
                    ctx
                );
            }
            if (stateConstants.homeScreenFlag) {
                btnsclicked(
                    new Point(
                        e.offsetX,
                        e.offsetY),
                    ctx
                );
            }
            if (stateConstants.buyScreenFlag) {
                buyBtnsclicked(
                    new Point(
                        e.offsetX,
                        e.offsetY
                    )
                );
            }
            if (stateConstants.infoScreenFlag) {
                infoScreenBtn(
                    new Point(
                        e.offsetX,
                        e.offsetY
                    ),
                    ctx
                );
            }
            if (stateConstants.aboutScreenFlag) {
                aboutbtnsclicked(
                    new Point(
                        e.offsetX,
                        e.offsetY
                    ), ctx
                );
            }
            if (stateConstants.controlScreenFlag) {
                controlBtnClicked(
                    new Point(
                        e.offsetX,
                        e.offsetY
                    ), ctx
                );
            }
        }
    )

}