import { hero } from "../screens/game";
import { moveLeft,moveUp } from "./moveHandler";
export default function eventhandler() {
    //Defining Event Handlers
    window.addEventListener(
        'keydown',
        (e) => {
            hero.isMoving=true;
            switch (e.key.toLowerCase()) {
                case "a":
                    moveLeft(true);
                    break;
                case "d":
                    moveLeft(false);
                    break;

                case "w":
                    moveUp(true);
                    break;

                case "s":
                    moveUp(false);
                    break;
            }
        }
    );
    window.addEventListener(
        'keyup',
        () => {
            hero.isMoving = false;
        }
    );
}