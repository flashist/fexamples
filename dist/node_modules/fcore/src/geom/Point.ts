export class Point {
    public x:number;
    public y:number;

    constructor(x:number = 0, y:number = 0) {
        this.x = x;
        this.y = y;
    }

    public clone():Point {
        return new Point(this.x, this.y);
    }


    public multiply(xMultiply:number, yMultiply:number):void {
        this.x *= xMultiply;
        this.y *= yMultiply;
    }
}
