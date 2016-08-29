import {IBaseClassWrapper} from "./IBaseClassWrapper";
import {BaseEventListenerObject} from "../../baseobject/BaseEventListenerObject";

export class BaseClassWrapper extends BaseEventListenerObject implements IBaseClassWrapper {
    private _object:any;
    public get object():any {
        return this._object;
    }

    public set object(value:any) {
        this._object = value;

        this.commitData();
    }
}
