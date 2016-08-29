import {BaseEventDispatcher} from "../event/eventdispatcher/BaseEventDispatcher";
export declare class BaseObject extends BaseEventDispatcher {
    protected isConstructed: boolean;
    private _data;
    constructor(initParams?: any);
    protected construction(initParams?: any): void;
    destruction(): void;
    protected addListeners(): void;
    protected removeListeners(): void;
    protected commitData(): void;
    protected arrange(): void;
    data: any;
}
