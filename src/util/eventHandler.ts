import stateConstants from "../constants/stateConstants";
import { hero } from "../screens/game";
import { moveLeft, moveUp } from "./moveHandler";


function handleEvents() {
    if (stateConstants.btnPressed['a']) {
        hero.isMoving = true;
        moveLeft(true);
    }
    if (stateConstants.btnPressed['d']) {
        moveLeft(false);
        hero.isMoving = true;
    }
    if (stateConstants.btnPressed['w']) {
        moveUp(true);
        hero.isMoving = true;
    }
    if (stateConstants.btnPressed['s']) {
        moveUp(false);
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