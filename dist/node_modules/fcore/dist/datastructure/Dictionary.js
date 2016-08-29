"use strict";
var UniqueTools_1 = require("../tools/UniqueTools");
var Dictionary = (function () {
    function Dictionary() {
        this.map = {};
    }
    Dictionary.prototype.getItem = function (key) {
        var tempId = UniqueTools_1.UniqueTools.getObjectUniqueId(key);
        var result = this.map[tempId];
        return result;
    };
    Dictionary.prototype.addItem = function (key, item) {
        var tempId = UniqueTools_1.UniqueTools.getObjectUniqueId(key);
        this.map[tempId] = item;
    };
    return Dictionary;
}());
exports.Dictionary = Dictionary;
//# sourceMappingURL=Dictionary.js.map