import {BaseObject} from "../baseobject/BaseObject";
export declare abstract class BaseLoggerItem extends BaseObject {
    constructor();
    abstract log(...args: any[]): void;
    abstract error(...args: any[]): void;
    abstract debug(...args: any[]): void;
    abstract startLogTime(id: string): void;
    abstract stopLogTime(id: string): void;
}
