import {BaseLoggerItem} from "./BaseLoggerItem";
export declare class Logger {
    protected static loggerItems: BaseLoggerItem[];
    protected static loggerItemsCount: number;
    static addLoggerItem(item: BaseLoggerItem): void;
    static log(...args: any[]): void;
    static error(...args: any[]): void;
    static debug(...args: any[]): void;
    static logCurrentTime(): void;
    static startLogTime(id: string): void;
    static stopLogTime(id: string): void;
}
