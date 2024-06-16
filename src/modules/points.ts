interface Ipoint {
    x: number;
    y: number;
}

export default class Point implements Ipoint {
    x;
    y;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}