import {AssociativeArrayEvent} from "./AssociativeArrayEvent";
import {BaseObject} from "../../baseobject/BaseObject";

export class AssociativeArray<ValueType> extends BaseObject {
    protected map:{ [key: string]: ValueType };
    protected list:ValueType[];

    public constructor() {
        super();
    }

    public construction():void {
        super.construction();

        this.map = {};
        this.list = [];
    }

    public destruction():void {
        super.destruction();

        this.map = null;
        this.list = null;
    }


    protected dispatchChangeEvent():void {
        this.dispatchEvent(AssociativeArrayEvent.CHANGE);
    }


    public reset():void {
        while (this.list.length > 0) {
            this.removeByIndex(0);
        }
    }


    public push(item:ValueType, key:string, checkUniqueKey:boolean = true):void {
        this.addToIndex(item, key, this.list.length, checkUniqueKey);
    }

    public addToIndex(item:ValueType, key:string, index:number, checkUniqueKey:boolean = true):void {
        var isNeedAdd:boolean = true;
        if (checkUniqueKey) {
            if (this.containsKey(key)) {
                isNeedAdd = false;
            }
        }

        if (isNeedAdd) {
            this.list.splice(index, 0, item);
            this.map[key] = item;
        }

        //
        this.dispatchChangeEvent();
    }


    public remove(item:ValueType):void {
        if (!this.contains(item)) {
            return;
        }
        var tempIndex:number = this.indexOf(item);
        this.removeByIndex(tempIndex);
    }

    public removeByKey(key:string):void {
        var item:ValueType = this.getItem(key);
        this.remove(item);
    }

    public removeByIndex(index:number):void {
        var removedList:ValueType[] = this.list.splice(index, 1);
        var removedItem:ValueType = removedList[index];

        var key:string = this.getItemKey(removedItem);
        this.map[key] = null;


        //
        this.dispatchChangeEvent();
    }


    public contains(item:ValueType):boolean {
        var result:boolean = false;
        if (this.indexOf(item) != -1) {
            result = true;
        }

        return result;
    }

    public containsKey(key:string):boolean {
        var result:boolean = false;
        if (this.map[key]) {
            result = true;
        }

        return result;
    }


    public indexOf(item:ValueType):number {
        return this.list.indexOf(item);
    }


    public getItem(key:string):ValueType {
        return this.map[key];
    }

    public getItemByIndex(index:number):ValueType {
        var result:ValueType;
        if (index < this.list.length) {
            result = this.list[index];
        }

        return result;
    }

    public getItemKey(item:ValueType):string {
        var result:string = null;

        var key:string;
        for (key in this.map) {
            if (this.map[key] == item) {
                result = key;
                break;
            }
        }


        return result;
    }

    public getAllItems():ValueType[] {
        return this.list.concat();
    }

    public get length():number {
        return this.list.length;
    }


    public forEach(
        callback:(value:ValueType, index:number, array:ValueType[]) => void,
        thisArg?:any):void {

        this.list.forEach(callback, thisArg);
    }

    public every(
        callback:(value:ValueType, index:number, array:ValueType[]) => boolean,
        thisArg?:any):boolean {

        return this.list.every(callback, thisArg);
    }
}
