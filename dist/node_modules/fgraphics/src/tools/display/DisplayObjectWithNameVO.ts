import {IDisplayObjectWrapper} from "../../adapter/abstract/wrapper/display/IDisplayObjectWrapper";
export class DisplayObjectWithNameVO<ChildType extends IDisplayObjectWrapper> {
    public object:ChildType;
    public name:string;
}
