import {UniqueTools} from "../tools/UniqueTools";
export class Dictionary<KeyType, ItemType> {

    protected map:any;

    public constructor() {
        this.map = {};
    }


    public getItem(key:KeyType):ItemType {
        var tempId:string = UniqueTools.getObjectUniqueId(key);

        var result:any = this.map[tempId];
        return result;
    }

    public addItem(key:KeyType, item:ItemType):void {
        var tempId:string = UniqueTools.getObjectUniqueId(key);
        this.map[tempId] = item;
    }
}
