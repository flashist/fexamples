import {BaseLoggerItem} from "./BaseLoggerItem";
export declare class ConsoleCustomLoggerItem extends BaseLoggerItem {
    constructor();
    log(...args: any[]): void;
    error(...args: any[]): void;
    debug(...args: any[]): void;
    startLogTime(id: string): void;
    stopLogTime(id: string): void;
}
