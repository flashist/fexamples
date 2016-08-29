import {BaseObject} from "../baseobject/BaseObject";

export abstract class BaseLoggerItem extends BaseObject {
    constructor() {
        super();
    }

    public abstract log(...args):void;

    public abstract error(...args):void;

    public abstract debug(...args):void;

    public abstract startLogTime(id:string):void;

    public abstract stopLogTime(id:string):void;
}