import {Dictionary} from "../../datastructure/Dictionary";
import {Logger} from "../../logger/Logger";
export class ObjectsPool {
    protected objectsToClassMap:Dictionary<any, any>;

    public constructor() {
        this.objectsToClassMap = new Dictionary<any, any>();


    }

    public addObject(object:any, ObjectClass:any):void {
        if (!object) {
            return;
        }

        var tempItems:any[] = this.getObjectsByClass(ObjectClass);
        if (tempItems) {
            if (tempItems.indexOf(object) == -1) {
                tempItems.push(object);
            }
        }
    }

    public getObject(ObjectClass:any, isNeedCreate:boolean = true):any {
        var result:any;

        var tempArr:any[] = this.getObjectsByClass(ObjectClass);
        if (tempArr.length > 0) {
            result = tempArr.shift();
            Logger.log("ObjectsPool | getObject __ OBJECT WAS GOT FROM POOL!");

        } else {
            result = new ObjectClass();
            Logger.log("ObjectsPool | getObject __ OBJECT WAS CREATED!");
        }

        return result;
    }

    protected getObjectsByClass(ObjectClass:any):any[] {
        var result:any[] = (this.objectsToClassMap.getItem(ObjectClass) as any[]);
        if (!result) {
            result = [];
            this.objectsToClassMap.addItem(ObjectClass, result);
        }

        return result;
    }
}
