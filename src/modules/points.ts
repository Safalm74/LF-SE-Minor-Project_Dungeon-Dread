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
    distanceBetween(obj: Point) {
        return (Math.sqrt(
            (this.x - obj.x) ** 2 +
            (this.y -obj.y)**2
        ));
    }
}