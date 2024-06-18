import mainConstants from "../constants/mainConstants";
import stateConstants from "../constants/stateConstants";
import { ctx } from "../main";
import { hero } from "../screens/game";

function handleEvents() {
    if (stateConstants.btnPressed['a']) {
        hero.isMoving = true;
        hero.moveLeft(true,ctx);
    }
    if (stateConstants.btnPressed['d']) {
        hero.isMoving = true;
        hero.moveLeft(false,ctx);
    }
    if (stateConstants.btnPressed['w']) {
        hero.moveUp(true,ctx);
        hero.isMoving = true;
    }
    if (stateConstants.btnPressed['s']) {
        hero.moveUp(false,ctx);
        hero.isMoving = true;
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
}