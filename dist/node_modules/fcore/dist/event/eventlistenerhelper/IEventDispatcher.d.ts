import {IEventListenerCallback} from "./IEventListenerCallback";
export interface IEventDispatcher<EventType> {
    addEventListener(type: string, listener: IEventListenerCallback<EventType>): void;
    removeAllEventListeners(type?: string): void;
    removeEventListener(type: string, listener: any): void;
    dispatchEvent(event: EventType, data?: any): void;
}
