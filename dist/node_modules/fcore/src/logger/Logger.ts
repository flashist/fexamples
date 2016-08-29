import {BaseLoggerItem} from "./BaseLoggerItem";
export class Logger {
    protected static loggerItems:BaseLoggerItem[] = [];
    protected static loggerItemsCount:number = 0;

    public static addLoggerItem(item:BaseLoggerItem):void {
        Logger.loggerItems.push(item);
        Logger.loggerItemsCount = Logger.loggerItems.length;
    }


    public static log(...args):void {
        //console.log("console __ CustomLogger | log __ args: " + args + " | CustomLogger.loggerItems.length: " + CustomLogger.loggerItems.length);

        for (var itemIndex:number = 0; itemIndex < Logger.loggerItemsCount; itemIndex++) {
            Logger.loggerItems[itemIndex].log.apply(Logger.loggerItems[itemIndex], args);
        }
    }

    public static error(...args):void {
        //console.error("console __ CustomLogger | log __ args: " + args + " | CustomLogger.loggerItems.length: " + CustomLogger.loggerItems.length);

        for (var itemIndex:number = 0; itemIndex < Logger.loggerItemsCount; itemIndex++) {
            Logger.loggerItems[itemIndex].error.apply(Logger.loggerItems[itemIndex], args);
        }
    }

    public static debug(...args):void {
        for (var itemIndex:number = 0; itemIndex < Logger.loggerItemsCount; itemIndex++) {
            Logger.loggerItems[itemIndex].debug.apply(Logger.loggerItems[itemIndex], args);
        }
    }


    public static logCurrentTime():void {
        var tempDate:Date = new Date();
        Logger.log("time: " + tempDate.getTime());
    }

    public static startLogTime(id:string):void {
        for (var itemIndex:number = 0; itemIndex < Logger.loggerItemsCount; itemIndex++) {
            Logger.loggerItems[itemIndex].startLogTime.apply(Logger.loggerItems[itemIndex], id);
        }
    }

    public static stopLogTime(id:string):void {
        for (var itemIndex:number = 0; itemIndex < Logger.loggerItemsCount; itemIndex++) {
            Logger.loggerItems[itemIndex].stopLogTime.apply(Logger.loggerItems[itemIndex], id);
        }
    }
}
