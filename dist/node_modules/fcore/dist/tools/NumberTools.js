"use strict";
var NumberTools = (function () {
    function NumberTools() {
    }
    NumberTools.getRandom = function (min, max, isFloor, isRound, isCeil) {
        if (isFloor === void 0) { isFloor = false; }
        if (isRound === void 0) { isRound = false; }
        if (isCeil === void 0) { isCeil = false; }
        var result = min + Math.random() * (max - min);
        if (isFloor) {
            result = Math.floor(result);
        }
        if (isRound) {
            result = Math.round(result);
        }
        if (isCeil) {
            result = Math.ceil(result);
        }
        return result;
    };
    return NumberTools;
}());
exports.NumberTools = NumberTools;
//# sourceMappingURL=NumberTools.js.map