"use strict";
var ArrayTools = (function () {
    function ArrayTools() {
    }
    ArrayTools.removeItem = function (list, item, removeCount) {
        if (removeCount === void 0) { removeCount = ArrayTools.REMOVE_COUNT_ALL; }
        if (removeCount == ArrayTools.REMOVE_COUNT_ALL) {
            removeCount = Number.MAX_VALUE;
        }
        var totalRemovedCount = 0;
        var itemIndex = list.indexOf(item);
        while (itemIndex != -1 && totalRemovedCount < removeCount) {
            list.splice(itemIndex, 1);
            itemIndex = list.indexOf(item, itemIndex);
            totalRemovedCount++;
        }
    };
    ArrayTools.removeItems = function (list, removeItems) {
        var item;
        for (var itemIndex = 0; itemIndex < removeItems.length; itemIndex++) {
            item = removeItems[itemIndex];
            ArrayTools.removeItem(list, item);
        }
    };
    ArrayTools.checkIfEqual = function (list1, list2) {
        var isEqual = true;
        // If there are the only 1 correct array
        if ((!list1 && list2) || (list1 && !list2)) {
            isEqual = false;
        }
        else if (list1 && list2) {
            if (list1.length != list2.length) {
                isEqual = false;
            }
            else {
                var itemsCount = list1.length;
                for (var itemIndex = 0; itemIndex < itemsCount; itemIndex++) {
                    if (list1[itemIndex] != list2[itemIndex]) {
                        isEqual = false;
                        break;
                    }
                }
            }
        }
        return isEqual;
    };
    ArrayTools.changeItemIndex = function (item, list, newIndex) {
        if (newIndex >= list.length) {
            return;
        }
        var oldIndex = list.indexOf(item);
        if (oldIndex == -1) {
            return;
        }
        if (oldIndex == newIndex) {
            return;
        }
        list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
    };
    ArrayTools.REMOVE_COUNT_ALL = -1;
    return ArrayTools;
}());
exports.ArrayTools = ArrayTools;
//# sourceMappingURL=ArrayTools.js.map