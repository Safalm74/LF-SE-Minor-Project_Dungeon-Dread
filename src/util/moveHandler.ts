import { hero, gruntType1Array } from "../screens/game";

function moveLeft(left: boolean) {
    hero.moveLeft(left);
    const velocity = left ? 3 : -3

    //moving grunType1Array
    gruntType1Array.forEach(
        (obj) => {
            obj.position.x += velocity
        }
    );

}

function moveUp(up: boolean) {
    hero.moveUp(up);

    const velocity = up ? 3 : -3
    //moving grunType1Array
    gruntType1Array.forEach(
        (obj) => {
            obj.position.y += velocity
        }
    );

}

export { moveLeft, moveUp }