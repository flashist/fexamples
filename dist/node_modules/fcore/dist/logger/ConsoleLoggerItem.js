"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseLoggerItem_1 = require("./BaseLoggerItem");
var ConsoleCustomLoggerItem = (function (_super) {
    __extends(ConsoleCustomLoggerItem, _super);
    function ConsoleCustomLoggerItem() {
        _super.call(this);
    }
    ConsoleCustomLoggerItem.prototype.log = function () {
        //console.log("console __ ConsoleCustomLoggerItem | log __ args: " + args + " | args.length: " + args.length);
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        console.log.apply(console, args);
    };
    ConsoleCustomLoggerItem.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        console.error.apply(console, args);
    };
    ConsoleCustomLoggerItem.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        console.debug.apply(console, args);
    };
    ConsoleCustomLoggerItem.prototype.startLogTime = function (id) {
        console.time(id);
    };
    ConsoleCustomLoggerItem.prototype.stopLogTime = function (id) {
        console.timeEnd(id);
    };
    return ConsoleCustomLoggerItem;
}(BaseLoggerItem_1.BaseLoggerItem));
exports.ConsoleCustomLoggerItem = ConsoleCustomLoggerItem;
//# sourceMappingURL=ConsoleLoggerItem.js.map