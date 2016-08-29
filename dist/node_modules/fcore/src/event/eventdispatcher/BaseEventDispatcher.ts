import {IEventDispatcher} from "../eventlistenerhelper/IEventDispatcher";
import {IEventListenerCallback} from "../eventlistenerhelper/IEventListenerCallback";

// Type definition for the eventemitter3
declare var EventEmitter;
declare type EventEmitter = {
    addListener(type:string, listener:Function, context?:any);
    removeListener(type:string, listener:Function, context?:any);
    removeAllListeners(type?:string);
    emit(type:string, ...args);
};

export class BaseEventDispatcher implements IEventDispatcher<string> {
    private eventEmitter:EventEmitter;

    public constructor() {
        this.eventEmitter = new EventEmitter();
    }

    addEventListener(type:string, listener:IEventListenerCallback<string>):void {
        this.eventEmitter.addListener(type, listener as Function);
    }

    removeAllEventListeners(type?:string):void {
        this.eventEmitter.removeAllListeners(type);
    }

    removeEventListener(type:string, listener:any):void {
        this.eventEmitter.removeListener(type, listener as Function);
    }

    dispatchEvent(event:string, data?:any):void {
        this.eventEmitter.emit(event, data);
    }
}
