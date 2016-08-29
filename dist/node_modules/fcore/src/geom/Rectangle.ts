export class Rectangle {
    public x:number;
    public y:number;
    public width:number;
    public height:number;

    constructor(x:number = 0, y:number = 0, width:number = 0, height:number = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public clone():Rectangle {
        return new Rectangle(this.x, this.y, this.width, this.height);
    }

    public multiply(xMultiply:number, yMultiply:number):void {
        this.x *= xMultiply;
        this.y *= yMultiply;
        this.width *= xMultiply;
        this.height *= yMultiply;
    }

    public contains(x:number, y:number):boolean {
        if (this.width <= 0 || this.height <= 0) {
            return false;
        }

        if (x >= this.x && x < this.x + this.width) {
            if (y >= this.y && y < this.y + this.height) {
                return true;
            }
        }

        return false;
    };
}
