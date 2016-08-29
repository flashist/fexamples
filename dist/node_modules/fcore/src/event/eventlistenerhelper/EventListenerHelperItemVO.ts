import {IEventDispatcher} from "./IEventDispatcher";
import {IEventListenerCallback} from "./IEventListenerCallback";
export class EventListenerHelperItemVO<EventType> {
    public dispatcher:IEventDispatcher<EventType>;
    public type:string;
    public listener:IEventListenerCallback<EventType>;
    public sourceListener:IEventListenerCallback<EventType>;
}
