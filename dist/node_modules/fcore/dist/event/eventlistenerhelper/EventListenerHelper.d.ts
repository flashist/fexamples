import {AssociativeArray} from "../../datastructure/associativearray/AssociativeArray";
import {EventListenerHelperItemVO} from "./EventListenerHelperItemVO";
import {IEventDispatcher} from "./IEventDispatcher";
import {IEventListenerCallback} from "./IEventListenerCallback";
export declare class EventListenerHelper<EventType extends any> {
    protected listenerThis: any;
    protected listenersByTypeMap: AssociativeArray<EventListenerHelperItemVO<EventType>[]>;
    constructor(listenerThis?: any);
    protected construction(): void;
    destruction(): void;
    addEventListener(dispatcher: IEventDispatcher<EventType>, type: string, listener: IEventListenerCallback<EventType>): void;
    removeEventListener(dispatcher: IEventDispatcher<EventType>, type: string, listener: IEventListenerCallback<EventType>): void;
    removeAllListeners(dispatcher?: IEventDispatcher<EventType>): void;
    protected getEventListeners(type: string): EventListenerHelperItemVO<EventType>[];
}
