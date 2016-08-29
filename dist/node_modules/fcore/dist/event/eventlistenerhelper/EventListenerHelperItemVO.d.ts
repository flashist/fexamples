import {IEventDispatcher} from "./IEventDispatcher";
import {IEventListenerCallback} from "./IEventListenerCallback";
export declare class EventListenerHelperItemVO<EventType> {
    dispatcher: IEventDispatcher<EventType>;
    type: string;
    listener: IEventListenerCallback<EventType>;
    sourceListener: IEventListenerCallback<EventType>;
}
