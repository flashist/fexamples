"use strict";
var Logger = (function () {
    function Logger() {
    }
    Logger.addLoggerItem = function (item) {
        Logger.loggerItems.push(item);
        Logger.loggerItemsCount = Logger.loggerItems.length;
    };
    Logger.log = function () {
        //console.log("console __ CustomLogger | log __ args: " + args + " | CustomLogger.loggerItems.length: " + CustomLogger.loggerItems.length);
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        for (var itemIndex = 0; itemIndex < Logger.loggerItemsCount; itemIndex++) {
            Logger.loggerItems[itemIndex].log.apply(Logger.loggerItems[itemIndex], args);
        }
    };
    Logger.error = function () {
        //console.error("console __ CustomLogger | log __ args: " + args + " | CustomLogger.loggerItems.length: " + CustomLogger.loggerItems.length);
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        for (var itemIndex = 0; itemIndex < Logger.loggerItemsCount; itemIndex++) {
            Logger.loggerItems[itemIndex].error.apply(Logger.loggerItems[itemIndex], args);
        }
    };
    Logger.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        for (var itemIndex = 0; itemIndex < Logger.loggerItemsCount; itemIndex++) {
            Logger.loggerItems[itemIndex].debug.apply(Logger.loggerItems[itemIndex], args);
        }
    };
    Logger.logCurrentTime = function () {
        var tempDate = new Date();
        Logger.log("time: " + tempDate.getTime());
    };
    Logger.startLogTime = function (id) {
        for (var itemIndex = 0; itemIndex < Logger.loggerItemsCount; itemIndex++) {
            Logger.loggerItems[itemIndex].startLogTime.apply(Logger.loggerItems[itemIndex], id);
        }
    };
    Logger.stopLogTime = function (id) {
        for (var itemIndex = 0; itemIndex < Logger.loggerItemsCount; itemIndex++) {
            Logger.loggerItems[itemIndex].stopLogTime.apply(Logger.loggerItems[itemIndex], id);
        }
    };
    Logger.loggerItems = [];
    Logger.loggerItemsCount = 0;
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map