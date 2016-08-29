export class UniqueTools {
    protected static UNIQUE_ID_PROP_NAME:string = "flashistUniqueId";

    protected static globalUniqueId:number = 0;

    public static getObjectUniqueId(object:any):string {
        if (!object.hasOwnProperty(UniqueTools.UNIQUE_ID_PROP_NAME)) {
            UniqueTools.globalUniqueId++;
            object[UniqueTools.UNIQUE_ID_PROP_NAME] = UniqueTools.globalUniqueId.toString();
        }

        return object[UniqueTools.UNIQUE_ID_PROP_NAME];
    }
}
