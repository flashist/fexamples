"use strict";
var Dictionary_1 = require("../../datastructure/Dictionary");
var Logger_1 = require("../../logger/Logger");
var ObjectsPool = (function () {
    function ObjectsPool() {
        this.objectsToClassMap = new Dictionary_1.Dictionary();
    }
    ObjectsPool.prototype.addObject = function (object, ObjectClass) {
        if (!object) {
            return;
        }
        var tempItems = this.getObjectsByClass(ObjectClass);
        if (tempItems) {
            if (tempItems.indexOf(object) == -1) {
                tempItems.push(object);
            }
        }
    };
    ObjectsPool.prototype.getObject = function (ObjectClass, isNeedCreate) {
        if (isNeedCreate === void 0) { isNeedCreate = true; }
        var result;
        var tempArr = this.getObjectsByClass(ObjectClass);
        if (tempArr.length > 0) {
            result = tempArr.shift();
            Logger_1.Logger.log("ObjectsPool | getObject __ OBJECT WAS GOT FROM POOL!");
        }
        else {
            result = new ObjectClass();
            Logger_1.Logger.log("ObjectsPool | getObject __ OBJECT WAS CREATED!");
        }
        return result;
    };
    ObjectsPool.prototype.getObjectsByClass = function (ObjectClass) {
        var result = this.objectsToClassMap.getItem(ObjectClass);
        if (!result) {
            result = [];
            this.objectsToClassMap.addItem(ObjectClass, result);
        }
        return result;
    };
    return ObjectsPool;
}());
exports.ObjectsPool = ObjectsPool;
//# sourceMappingURL=ObjectsPool.js.map