import { hero } from "../screens/game";
import Point from "../modules/points";
export default function eventhandler(){

    //Defining Event Handlers
    window.addEventListener(
        'keydown',
        (e) => {
            switch (e.key.toLowerCase()) {
                case "a" :
                        hero.moveLeft(true);
                    break;
                case "d":
                    hero.moveLeft(false);
                    break;

                case "w":
                    hero.moveUp(true);
                    break;

                case "s":
                    hero.moveUp(false);
                    break;
            }
        }
    );
    window.addEventListener(
        'keyup',
        () => {
            hero.velocity=new Point(0,0);
            hero.isMoving=false;
        }
    );
}