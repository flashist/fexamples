import {Logger} from "../logger/Logger";
import {ObjectTools} from "../tools/ObjectTools";
import {BaseObject} from "./BaseObject";

export class BaseDataVO extends BaseObject {

    public objectType:string = "";
    public objectId:string = "";

    private sourceData:any = {};

    protected sourceDataPropNamesMap:any = {};

    public constructor() {
        super();
    }


    protected commitSourceData():void {
        var propName:string;
        var propValue:any;

        var sourcePropName:any;
        for (sourcePropName in this.sourceData) {
            propName = sourcePropName;

            // If there is a special name for the processed property,
            // then use the special name instead of the original name
            if (this.sourceDataPropNamesMap[sourcePropName]) {
                propName = this.sourceDataPropNamesMap[sourcePropName];
            }


            if (propName) {
                propValue = this.sourceData[sourcePropName];

                if (propValue != null) {
                    if (this.hasOwnProperty(propName) ||
                        (this["__proto__"] && this["__proto__"].hasOwnProperty(propName))) {
                        try {
                            this[propName] = propValue;

                        } catch (error) {
                            Logger.error("BaseDataVO | commitSourceData __ ERROR! error: " + error);
                        }
                    }
                }
            }
        }
    }

    public changeSourceData(changesData:any):void {
        ObjectTools.copyProps(this.sourceData, changesData, true);

        this.commitSourceData();
    }
}
