import {IDisplayObjectWrapper} from "../../adapter/abstract/wrapper/display/IDisplayObjectWrapper";
export declare class DisplayObjectWithNameVO<ChildType extends IDisplayObjectWrapper> {
    object: ChildType;
    name: string;
}
