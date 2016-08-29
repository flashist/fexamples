"use strict";
var ObjectTools = (function () {
    function ObjectTools() {
    }
    ObjectTools.copyProps = function (copyTo, copyFrom, isNeedCreateProperty) {
        if (isNeedCreateProperty === void 0) { isNeedCreateProperty = false; }
        var result = false;
        var propNames = Object.keys(copyFrom);
        var propsCount = propNames.length;
        var propName;
        for (var propIndex = 0; propIndex < propsCount; propIndex++) {
            propName = propNames[propIndex];
            if (isNeedCreateProperty || copyTo.hasOwnProperty(propName)) {
                if (copyTo[propName] != copyFrom[propName]) {
                    copyTo[propName] = copyFrom[propName];
                    // Remember that change was made
                    result = true;
                }
            }
        }
        return result;
    };
    ObjectTools.isSimpleType = function (obj) {
        var isSimple = false;
        if (typeof (obj) == "string" || typeof (obj) == "number" || typeof (obj) == "boolean") {
            isSimple = true;
        }
        return isSimple;
    };
    ObjectTools.isString = function (obj) {
        if (typeof (obj) == "string") {
            return true;
        }
        else {
            return false;
        }
    };
    ObjectTools.isNumber = function (obj) {
        if (typeof (obj) == "number") {
            return true;
        }
        else {
            return false;
        }
    };
    return ObjectTools;
}());
exports.ObjectTools = ObjectTools;
//# sourceMappingURL=ObjectTools.js.map