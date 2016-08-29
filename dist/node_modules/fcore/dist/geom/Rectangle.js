"use strict";
var Rectangle = (function () {
    function Rectangle(x, y, width, height) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Rectangle.prototype.clone = function () {
        return new Rectangle(this.x, this.y, this.width, this.height);
    };
    Rectangle.prototype.multiply = function (xMultiply, yMultiply) {
        this.x *= xMultiply;
        this.y *= yMultiply;
        this.width *= xMultiply;
        this.height *= yMultiply;
    };
    Rectangle.prototype.contains = function (x, y) {
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
    ;
    return Rectangle;
}());
exports.Rectangle = Rectangle;
//# sourceMappingURL=Rectangle.js.map