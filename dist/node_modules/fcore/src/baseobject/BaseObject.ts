import {BaseEventDispatcher} from "../event/eventdispatcher/BaseEventDispatcher";

export class BaseObject extends BaseEventDispatcher {
    protected isConstructed:boolean;

    private _data:any;

    constructor(initParams?:any) {
        super();

        this.construction(initParams);
        this.isConstructed = true;

        this.addListeners();
        this.commitData();
    }


    protected construction(initParams?:any):void {
        // Note: subclasses should implement their own logic here
    }

    public destruction():void {
        // Note: subclasses should implement their own logic here


        this.removeListeners();
    }


    protected addListeners():void {
        this.removeListeners();

        // Note: subclasses should implement their own logic here
    }

    protected removeListeners():void {
        // Note: subclasses should implement their own logic here
    }


    protected commitData():void {
        // Note: subclasses should implement their own logic here
    }

    protected arrange():void {
        // Note: subclasses should implement their own logic here
    }


    public get data():any {
        return this._data;
    }

    public set data(value:any) {
        if (this.data == value) {
            return;
        }

        this._data = value;

        this.commitData();
    }
}
