import heroConstants from "../constants/heroConstants";
import stateConstants from "../constants/stateConstants";
import { ctx } from "../main";
import Point from "../modules/points";
import { buyBtnsclicked } from "../screens/buyScreen";
import { hero } from "../screens/gameScreen";
import { btnsclicked } from "../screens/homeScreen";

function handleEvents() {
    if (
        (stateConstants.btnPressed['a'] && stateConstants.btnPressed['w']) ||
        (stateConstants.btnPressed['a'] && stateConstants.btnPressed['s']) ||
        (stateConstants.btnPressed['d'] && stateConstants.btnPressed['w']) ||
        (stateConstants.btnPressed['d'] && stateConstants.btnPressed['s'])

    ) {
        hero.velocity.x=0.7*heroConstants.velocity.x
        hero.velocity.y=0.7*heroConstants.velocity.y

    }
    else{

        hero.velocity.x=heroConstants.velocity.x
        hero.velocity.y=heroConstants.velocity.y

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
    if (stateConstants.btnPressed['\n']) {
        console.log('enter')
    }
}

export { handleEvents }

export default function eventhandler() {
    //Defining Event Handlers
    window.addEventListener(
        'keydown',
        (e) => {
            stateConstants.btnPressed[e.key.toLowerCase()] = true
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
            btnsclicked(
                new Point(
                    e.offsetX,
                    e.offsetY),
                ctx
            );

            if (stateConstants.buyScreenFlag) {
                buyBtnsclicked(
                    new Point(
                        e.offsetX,
                        e.offsetY
                    )
                );
            }
        }
    )

}