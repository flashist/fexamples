import {IEventDispatcher} from "../eventlistenerhelper/IEventDispatcher";
import {IEventListenerCallback} from "../eventlistenerhelper/IEventListenerCallback";
export declare class BaseEventDispatcher implements IEventDispatcher<string> {
    private eventEmitter;
    constructor();
    addEventListener(type: string, listener: IEventListenerCallback<string>): void;
    removeAllEventListeners(type?: string): void;
    removeEventListener(type: string, listener: any): void;
    dispatchEvent(event: string, data?: any): void;
}
