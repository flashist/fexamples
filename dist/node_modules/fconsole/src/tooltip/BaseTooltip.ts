import {IDisplayObjectContainerWrapper, EngineAdapter} from "fgraphics/dist/index";
import {ITooltipData} from "./ITooltipData";
import {BaseObject} from "fcore/dist/index";

export abstract class BaseTooltip extends BaseObject {

    public view:IDisplayObjectContainerWrapper;

    protected tooltipData:ITooltipData;


    protected construction():void {
        super.construction();

        this.view = EngineAdapter.instance.createDisplayObjectContainerWrapper();
    }


    protected commitData():void {
        super.commitData();

        this.tooltipData = (this.data as ITooltipData);
    }
}