import {IDisplayObjectWrapper} from "./IDisplayObjectWrapper";
export interface IDisplayObjectContainerWrapper extends IDisplayObjectWrapper {
    // A way to check if object is an instance of the IDisplayObjectContainerWrapper
    isDisplayObjectContainerWrapper: boolean;


    addChild(child:IDisplayObjectWrapper): void;
    addChildAt(child:IDisplayObjectWrapper, index:number): void;

    removeChild(child:IDisplayObjectWrapper): void;
    removeChildAt(index:number): void;

    getChildAt(index:number): IDisplayObjectWrapper;
    setChildIndex(child:IDisplayObjectWrapper, index:number): void;

    nativeChildren: any[];
}
