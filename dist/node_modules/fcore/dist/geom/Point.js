"use strict";
var Point = (function () {
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Point.prototype.clone = function () {
        return new Point(this.x, this.y);
    };
    Point.prototype.multiply = function (xMultiply, yMultiply) {
        this.x *= xMultiply;
        this.y *= yMultiply;
    };
    return Point;
}());
exports.Point = Point;
//# sourceMappingURL=Point.js.map