import {IDisplayObjectWrapper} from "../../adapter/abstract/wrapper/display/IDisplayObjectWrapper";
import {IDisplayObjectContainerWrapper} from "../../adapter/abstract/wrapper/display/IDisplayObjectContainerWrapper";
import {EngineAdapter} from "../../adapter/abstract/EngineAdapter";
import {DisplayObjectWithNameVO} from "./DisplayObjectWithNameVO";

export class DisplayObjectTools {
    public static removeAllChildren(container:IDisplayObjectContainerWrapper):void {
        while (container.nativeChildren.length > 0) {
            container.removeChildAt(0);
        }
    }

    public static childRemoveItselfFromParent(child:IDisplayObjectWrapper):void {
        if (!child || !child.parent) {
            return;
        }

        child.parent.removeChild(child);
    }

    public static moveObjectToTopLayer(object:IDisplayObjectWrapper):void
    {
        if (!object || !object.parent)
        {
            return;
        }

        object.parent.setChildIndex(object, object.parent.nativeChildren.length - 1);
    }

    public static safeAddChildAt(container:IDisplayObjectContainerWrapper,
                                 child:IDisplayObjectWrapper,
                                 index:number):void {
        if (index < 0) {
            index = 0;
        } else if (index > container.nativeChildren.length) {
            index = container.nativeChildren.length;
        }

        container.addChildAt(child, index);
    }

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
    public static findChildByName<ChildType extends IDisplayObjectWrapper>(container:IDisplayObjectContainerWrapper,
                                                                           childName:string,
                                                                           isRecursive:boolean):ChildType {
        var result:ChildType = EngineAdapter.instance.findChildByName<ChildType>(container.object, childName, isRecursive);
        return result;
    }

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

    public static findChildrenByNamePart<ChildType extends IDisplayObjectWrapper>(container:IDisplayObjectContainerWrapper,
                                                                                  namePart:string,
                                                                                  isRecursive:boolean):DisplayObjectWithNameVO<ChildType>[] {

        var result:DisplayObjectWithNameVO<ChildType>[] = EngineAdapter.instance.findChildrenByNamePart<ChildType>(
            container.object,
            namePart,
            isRecursive
        );

        return result;
    }


    public static scaleObject(object:IDisplayObjectContainerWrapper,
                              width:number,
                              height:number,
                              isNeedIncreaseSize:boolean = false,
                              scaleByMaxSide:boolean = true):void {

        if (object.width <= 0 || object.height <= 0) {
            return;
        }

        if (!isNeedIncreaseSize && object.width <= width && object.height <= height) {
            return;
        }

        var maxDelta:number = width / height;
        var objDelta:number = object.width / object.height;

        if ((objDelta > maxDelta && scaleByMaxSide) || (objDelta <= maxDelta && !scaleByMaxSide)) {
            object.width = width;
            object.scaleY = object.scaleX;

        } else {
            object.height = height;
            object.scaleX = object.scaleY;
        }
    }
}
