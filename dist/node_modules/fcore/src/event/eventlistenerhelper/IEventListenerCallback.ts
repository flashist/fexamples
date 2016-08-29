export interface IEventListenerCallback<EventType> extends Function {
    (event:EventType, data?:any): void;
}
