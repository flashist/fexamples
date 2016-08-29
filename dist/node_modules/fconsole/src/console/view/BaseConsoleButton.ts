import {
    IDisplayObjectContainerWrapper,
    ITextWrapper,
    EngineAdapter,
    DisplayObjectWrapperMouseEvent
} from "fgraphics/dist/index";
import {BaseEventListenerObject} from "fcore/dist/index";
import {CC} from "../CC";
import {ITooltipData} from "../../tooltip/ITooltipData";

export class BaseConsoleButton extends BaseEventListenerObject {

    public view:IDisplayObjectContainerWrapper;
    private field:ITextWrapper;

    private _label:string = "";

    public tooltipData:ITooltipData;

    constructor() {
        super();
    }

    protected construction():void {
        super.construction();

        this.view = EngineAdapter.instance.createDisplayObjectContainerWrapper();
        this.view.interactive = true;
        this.view.buttonMode = true;

        this.field = EngineAdapter.instance.createTextWrapper();
        this.view.addChild(this.field);
        this.field.color = CC.config.btnSettings.labelColor;
        this.field.size = CC.config.btnSettings.labelSize;

        this.commitData();
        this.onOut();
    }


    protected addListeners():void {
        super.addListeners();

        this.eventListenerHelper.addEventListener(
            this.view,
            DisplayObjectWrapperMouseEvent.ROLL_OVER,
            this.onOver
        );
        this.eventListenerHelper.addEventListener(
            this.view,
            DisplayObjectWrapperMouseEvent.ROLL_OUT,
            this.onOut
        );
        this.eventListenerHelper.addEventListener(
            this.view,
            DisplayObjectWrapperMouseEvent.CLICK,
            this.onClick
        );
        this.eventListenerHelper.addEventListener(
            this.view,
            DisplayObjectWrapperMouseEvent.MOUSE_UP_OUTSIDE,
            this.onOut
        );
    }


    private onOver():void {
        this.view.alpha = 1;

        if (this.tooltipData) {
            CC.tooltipManager.show(this.tooltipData);
        }
    }

    private onOut():void {
        this.view.alpha = 0.75;

        CC.tooltipManager.hide();
    }

    protected onClick():void {
        this.onOut();
    }


    protected commitData():void {
        super.commitData();

        this.field.text = this.label;

        this.arrange();
    }

    protected arrange():void {
        super.arrange();

    }


    get label():string {
        return this._label;
    }

    set label(value:string) {
        if (value == this.label) {
            return;
        }

        this._label = value;

        this.commitData();
    }
}