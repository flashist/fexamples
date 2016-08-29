import {BaseLoggerItem} from "./BaseLoggerItem";

export class ConsoleCustomLoggerItem extends BaseLoggerItem {
    constructor() {
        super();
    }

    public log(...args):void {
        //console.log("console __ ConsoleCustomLoggerItem | log __ args: " + args + " | args.length: " + args.length);

        console.log.apply(console, args);
    }

    public error(...args):void {
        console.error.apply(console, args);
    }

    public debug(...args):void {
        console.debug.apply(console, args);
    }

    public startLogTime(id:string):void {
        console.time(id);
    }

    public stopLogTime(id:string):void {
        console.timeEnd(id);
    }
}