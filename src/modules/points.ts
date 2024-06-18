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
            (this.y - obj.y) ** 2
        ));
    }
    angle(obj: Point) {
        const dx = (this.x - obj.x);
        const dy = (this.y - obj.y);
        return Math.atan(dy/dx);
    }
    add(obj:Point){
        return (new Point(this.x+obj.x,this.y+obj.y))
    }
    pointDifference(obj:Point){
        return (new Point(this.x-obj.x,this.y-obj.y))
    }
}