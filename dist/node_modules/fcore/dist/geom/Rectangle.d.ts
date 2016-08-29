export declare class Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x?: number, y?: number, width?: number, height?: number);
    clone(): Rectangle;
    multiply(xMultiply: number, yMultiply: number): void;
    contains(x: number, y: number): boolean;
}
