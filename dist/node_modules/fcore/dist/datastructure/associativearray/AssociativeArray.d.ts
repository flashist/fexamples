import {BaseObject} from "../../baseobject/BaseObject";
export declare class AssociativeArray<ValueType> extends BaseObject {
    protected map: {
        [key: string]: ValueType;
    };
    protected list: ValueType[];
    constructor();
    construction(): void;
    destruction(): void;
    protected dispatchChangeEvent(): void;
    reset(): void;
    push(item: ValueType, key: string, checkUniqueKey?: boolean): void;
    addToIndex(item: ValueType, key: string, index: number, checkUniqueKey?: boolean): void;
    remove(item: ValueType): void;
    removeByKey(key: string): void;
    removeByIndex(index: number): void;
    contains(item: ValueType): boolean;
    containsKey(key: string): boolean;
    indexOf(item: ValueType): number;
    getItem(key: string): ValueType;
    getItemByIndex(index: number): ValueType;
    getItemKey(item: ValueType): string;
    getAllItems(): ValueType[];
    length: number;
    forEach(callback: (value: ValueType, index: number, array: ValueType[]) => void, thisArg?: any): void;
    every(callback: (value: ValueType, index: number, array: ValueType[]) => boolean, thisArg?: any): boolean;
}
