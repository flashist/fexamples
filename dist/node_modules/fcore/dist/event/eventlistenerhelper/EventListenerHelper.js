"use strict";
var AssociativeArray_1 = require("../../datastructure/associativearray/AssociativeArray");
var EventListenerHelperItemVO_1 = require("./EventListenerHelperItemVO");
var ArrayTools_1 = require("../../tools/ArrayTools");
var EventListenerHelper = (function () {
    function EventListenerHelper(listenerThis) {
        this.listenerThis = listenerThis;
        this.construction();
    }
    EventListenerHelper.prototype.construction = function () {
        this.listenersByTypeMap = new AssociativeArray_1.AssociativeArray();
    };
    EventListenerHelper.prototype.destruction = function () {
        this.removeAllListeners();
        this.listenerThis = null;
    };
    EventListenerHelper.prototype.addEventListener = function (dispatcher, type, listener) {
        var tempListeners = this.getEventListeners(type);
        var tempListenerData = new EventListenerHelperItemVO_1.EventListenerHelperItemVO();
        tempListenerData.dispatcher = dispatcher;
        tempListenerData.type = type;
        tempListenerData.listener = listener.bind(this.listenerThis);
        tempListenerData.sourceListener = listener;
        tempListeners.push(tempListenerData);
        //
        dispatcher.addEventListener(type, tempListenerData.listener);
    };
    EventListenerHelper.prototype.removeEventListener = function (dispatcher, type, listener) {
        var tempListeners = this.getEventListeners(type);
        //CustomLogger.log("EventListenerHelper | removeEventListener __ start __ tempListeners.length: " + tempListeners.length);
        tempListeners.filter(function (item, index, array) {
            var result = true;
            if (item.dispatcher == dispatcher && item.sourceListener == listener) {
                item.dispatcher.removeEventListener(item.type, item.listener);
                // Remove the item from the source list
                result = false;
            }
            return result;
        });
        //CustomLogger.log("EventListenerHelper | removeEventListener __ end __ tempListeners.length: " + tempListeners.length);
    };
    EventListenerHelper.prototype.removeAllListeners = function (dispatcher) {
        //CustomLogger.log("EventListenerHelper | removeAllListeners");
        var listenersByTypeList = this.listenersByTypeMap.getAllItems();
        var listenersList = [];
        listenersByTypeList.forEach(function (item, index, array) {
            //CustomLogger.log("EventListenerHelper | removeAllListeners __ start __ item.length: " + item.length);
            // Make a copy of the item, to prevent possible problems with loop and array,
            // because we plan to remove items from it
            var typeListenersCopy = item.concat();
            //
            var tempListenerData;
            var listenersCount = typeListenersCopy.length;
            for (var listenerIndex = 0; listenerIndex < listenersCount; listenerIndex++) {
                tempListenerData = typeListenersCopy[listenerIndex];
                if (!dispatcher || tempListenerData.dispatcher == dispatcher) {
                    tempListenerData.dispatcher.removeEventListener(tempListenerData.type, tempListenerData.listener);
                    // Remove information about listener from the list,
                    // to release the memory used by this item
                    ArrayTools_1.ArrayTools.removeItem(item, tempListenerData);
                }
            }
            //CustomLogger.log("EventListenerHelper | removeAllListeners __ end __ item.length: " + item.length);
        });
    };
    EventListenerHelper.prototype.getEventListeners = function (type) {
        if (!this.listenersByTypeMap.containsKey(type)) {
            this.listenersByTypeMap.push([], type);
        }
        var result = this.listenersByTypeMap.getItem(type);
        return result;
    };
    return EventListenerHelper;
}());
exports.EventListenerHelper = EventListenerHelper;
//# sourceMappingURL=EventListenerHelper.js.map