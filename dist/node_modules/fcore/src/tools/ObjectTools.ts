export class ObjectTools {
    public static copyProps(copyTo:any, copyFrom:any, isNeedCreateProperty:boolean = false):boolean {
        var result:boolean = false;

        var propNames:string[] = Object.keys(copyFrom);
        var propsCount:number = propNames.length;
        var propName:string;
        for (var propIndex:number = 0; propIndex < propsCount; propIndex++) {
            propName = propNames[propIndex];

            if (isNeedCreateProperty || copyTo.hasOwnProperty(propName)) {
                if (copyTo[propName] != copyFrom[propName]) {
                    copyTo[propName] = copyFrom[propName];

                    // Remember that change was made
                    result = true;
                }
            }
        }

        return result;
    }

    public static isSimpleType(obj:any):boolean {
        var isSimple:boolean = false;
        if (typeof (obj) == "string" || typeof (obj) == "number" || typeof (obj) == "boolean") {
            isSimple = true;
        }

        return isSimple;
    }

    public static isString(obj:any):boolean {
        if (typeof (obj) == "string") {
            return true;
        } else {
            return false;
        }
    }

    public static isNumber(obj:any):boolean {
        if (typeof (obj) == "number") {
            return true;
        } else {
            return false;
        }
    }
}
