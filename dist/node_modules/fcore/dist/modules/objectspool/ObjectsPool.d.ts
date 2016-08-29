import {Dictionary} from "../../datastructure/Dictionary";
export declare class ObjectsPool {
    protected objectsToClassMap: Dictionary<any, any>;
    constructor();
    addObject(object: any, ObjectClass: any): void;
    getObject(ObjectClass: any, isNeedCreate?: boolean): any;
    protected getObjectsByClass(ObjectClass: any): any[];
}
