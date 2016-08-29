import {BaseObject} from "./BaseObject";
export declare class BaseDataVO extends BaseObject {
    objectType: string;
    objectId: string;
    private sourceData;
    protected sourceDataPropNamesMap: any;
    constructor();
    protected commitSourceData(): void;
    changeSourceData(changesData: any): void;
}
