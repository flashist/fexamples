import {Point} from "fcore/dist/index";
import {IDisplayObjectContainerWrapper} from "./IDisplayObjectContainerWrapper";
export interface ISpriteWrapper extends IDisplayObjectContainerWrapper {
    // A way to check if object is an instance of the isSpriteWrapper
    isSpriteWrapper: boolean;


    texture: any;
    //gotoAndStop(frame: number): void;

    anchor: Point;
}
