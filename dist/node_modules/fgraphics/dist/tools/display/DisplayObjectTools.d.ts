import {IDisplayObjectWrapper} from "../../adapter/abstract/wrapper/display/IDisplayObjectWrapper";
import {IDisplayObjectContainerWrapper} from "../../adapter/abstract/wrapper/display/IDisplayObjectContainerWrapper";
import {DisplayObjectWithNameVO} from "./DisplayObjectWithNameVO";
export declare class DisplayObjectTools {
    static removeAllChildren(container: IDisplayObjectContainerWrapper): void;
    static childRemoveItselfFromParent(child: IDisplayObjectWrapper): void;
    static moveObjectToTopLayer(object: IDisplayObjectWrapper): void;
    static safeAddChildAt(container: IDisplayObjectContainerWrapper, child: IDisplayObjectWrapper, index: number): void;
    static findChildByName<ChildType extends IDisplayObjectWrapper>(container: IDisplayObjectContainerWrapper, childName: string, isRecursive: boolean): ChildType;
    static findChildrenByNamePart<ChildType extends IDisplayObjectWrapper>(container: IDisplayObjectContainerWrapper, namePart: string, isRecursive: boolean): DisplayObjectWithNameVO<ChildType>[];
    static scaleObject(object: IDisplayObjectContainerWrapper, width: number, height: number, isNeedIncreaseSize?: boolean, scaleByMaxSide?: boolean): void;
}
