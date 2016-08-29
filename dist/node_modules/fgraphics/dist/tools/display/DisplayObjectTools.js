"use strict";
var EngineAdapter_1 = require("../../adapter/abstract/EngineAdapter");
var DisplayObjectTools = (function () {
    function DisplayObjectTools() {
    }
    DisplayObjectTools.removeAllChildren = function (container) {
        while (container.nativeChildren.length > 0) {
            container.removeChildAt(0);
        }
    };
    DisplayObjectTools.childRemoveItselfFromParent = function (child) {
        if (!child || !child.parent) {
            return;
        }
        child.parent.removeChild(child);
    };
    DisplayObjectTools.moveObjectToTopLayer = function (object) {
        if (!object || !object.parent) {
            return;
        }
        object.parent.setChildIndex(object, object.parent.nativeChildren.length - 1);
    };
    DisplayObjectTools.safeAddChildAt = function (container, child, index) {
        if (index < 0) {
            index = 0;
        }
        else if (index > container.nativeChildren.length) {
            index = container.nativeChildren.length;
        }
        container.addChildAt(child, index);
    };
    /*public static cacheObjectByFilterBounds(object: createjs.DisplayObject): void
     {
     if (!object)
     {
     return;
     }

     var tempRect: createjs.Rectangle = DisplayObjectTools.getObjectFiltersBound(object);
     object.cache(tempRect.x, tempRect.y, tempRect.width, tempRect.height);
     }*/
    //public static findChildByName<ChildType extends createjs.DisplayObject>(
    //    container: createjs.Container,
    //    childName: string,
    //    isRecursive: boolean): ChildType
    //{
    //    var result: ChildType;
    //    if (container[childName] instanceof createjs.DisplayObject)
    //    {
    //        result = (container[childName] as ChildType);
    //    } else if (isRecursive)
    //    {
    //        var tempChildContainer: createjs.Container;
    //        var everyResult: boolean;
    //        container.nativeChildren.every(
    //            (item: createjs.DisplayObject, index: number, array: createjs.DisplayObject[]): boolean =>
    //            {
    //                everyResult = true;
    //                if (item instanceof createjs.Container)
    //                {
    //                    tempChildContainer = (item as createjs.Container);
    //                    result = DisplayObjectTools.findChildByName<ChildType>(tempChildContainer, childName, isRecursive);
    //                    if (result)
    //                    {
    //                        everyResult = false;
    //                    }
    //                }
    //                return everyResult;
    //            }
    //        );
    //    }
    //    return result;
    //}
    DisplayObjectTools.findChildByName = function (container, childName, isRecursive) {
        var result = EngineAdapter_1.EngineAdapter.instance.findChildByName(container.object, childName, isRecursive);
        return result;
    };
    //public static findChildrenByNamePart<ChildType extends IDisplayObjectWrapper>(
    //    container: IDisplayObjectContainerWrapper,
    //    namePart: string,
    //    isRecursive: boolean): DisplayObjectWithNameVO<ChildType>[]
    //{
    //    var result: DisplayObjectWithNameVO<ChildType>[] = [];
    //    var tempDisplayObjectWrapper: IDisplayObjectWrapper;
    //    var tempContainerWrapper: IDisplayObjectContainerWrapper;
    //    var tempContainer: IDisplayObjectContainerWrapper;
    //    var tempData: DisplayObjectWithNameVO<ChildType>;
    //    var propName: string;
    //    for (propName in container.object)
    //    {
    //        if (propName == "gameCont")
    //        {
    //            CustomLogger.log("AAA");
    //        }
    //        if (container.checkIfParamIsParent(propName))
    //        {
    //            // Do nothing to prevent wrong recursion
    //            continue;
    //        } else if (propName.indexOf(namePart) != -1)
    //        {
    //            tempDisplayObjectWrapper = EngineAdapter.instance.createDisplayWrapperBasedOnObject<IDisplayObjectWrapper>(container.object[propName]);
    //            if (tempDisplayObjectWrapper && tempDisplayObjectWrapper.isDisplayObjectWrapper)
    //            {
    //                tempData = new DisplayObjectWithNameVO<ChildType>();
    //                tempData.object = (tempDisplayObjectWrapper as ChildType);
    //                tempData.name = propName;
    //                result.push(tempData);
    //            }
    //        } else if (isRecursive)
    //        {
    //            tempContainerWrapper = EngineAdapter.instance.createDisplayWrapperBasedOnObject<IDisplayObjectContainerWrapper>(container.object[propName]);
    //            if (tempContainerWrapper && tempContainerWrapper.isDisplayObjectContainerWrapper)
    //            {
    //                var tempItems: DisplayObjectWithNameVO<ChildType>[] = DisplayObjectTools.findChildrenByNamePart<ChildType>(
    //                    tempContainerWrapper,
    //                    namePart,
    //                    isRecursive
    //                );
    //                result = result.concat(tempItems);
    //            }
    //        }
    //    }
    //    return result;
    //}
    DisplayObjectTools.findChildrenByNamePart = function (container, namePart, isRecursive) {
        var result = EngineAdapter_1.EngineAdapter.instance.findChildrenByNamePart(container.object, namePart, isRecursive);
        return result;
    };
    DisplayObjectTools.scaleObject = function (object, width, height, isNeedIncreaseSize, scaleByMaxSide) {
        if (isNeedIncreaseSize === void 0) { isNeedIncreaseSize = false; }
        if (scaleByMaxSide === void 0) { scaleByMaxSide = true; }
        if (object.width <= 0 || object.height <= 0) {
            return;
        }
        if (!isNeedIncreaseSize && object.width <= width && object.height <= height) {
            return;
        }
        var maxDelta = width / height;
        var objDelta = object.width / object.height;
        if ((objDelta > maxDelta && scaleByMaxSide) || (objDelta <= maxDelta && !scaleByMaxSide)) {
            object.width = width;
            object.scaleY = object.scaleX;
        }
        else {
            object.height = height;
            object.scaleX = object.scaleY;
        }
    };
    return DisplayObjectTools;
}());
exports.DisplayObjectTools = DisplayObjectTools;
//# sourceMappingURL=DisplayObjectTools.js.map