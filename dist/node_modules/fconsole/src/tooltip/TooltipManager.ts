import {BaseEventListenerObject, Point} from "fcore/dist/index";
import {IDisplayObjectContainerWrapper, EngineAdapter, TickerEvent} from "fgraphics/dist/index";
import {BaseTooltip} from "./BaseTooltip";
import {ITooltipData} from "./ITooltipData";

export class TooltipManager extends BaseEventListenerObject {

    private static SHOW_DELAY:Number = 0.5;

    private _tooltipCont:IDisplayObjectContainerWrapper;
    private tooltipInsideCont:IDisplayObjectContainerWrapper;
    private tooltip:BaseTooltip;

    private _mouseShift:Point;

    private _visible:boolean;

    constructor(tooltip:BaseTooltip) {
        super(tooltip);
    }


    protected construction(tooltip:BaseTooltip):void {
        super.construction();

        this.tooltip = tooltip;
        this.mouseShift = new Point();

        this.tooltipInsideCont = EngineAdapter.instance.createDisplayObjectContainerWrapper();
        this.tooltipInsideCont.addChild(this.tooltip.view);

        this.hide();
    }

    protected addListeners():void {
        super.addListeners();

        this.eventListenerHelper.addEventListener(
            EngineAdapter.instance.mainTicker,
            TickerEvent.TICK,
            this.onTick
        )
    }

    private onTick():void {
        this.update();
    }


    public show(data:ITooltipData):void {
        this.visible = true;

        this.tooltip.data = data;

        this.update();
    }

    public hide():void {
        this.visible = false;
    }


    /**
     * Обновление подсказки.
     */
    public update():void {
        if (!this.visible) {
            return;
        }
        if (!this.tooltipCont) {
            return;
        }
        if (!this.tooltip) {

        }

        let tempPos:Point = new Point(EngineAdapter.instance.globalMouseX, EngineAdapter.instance.globalMouseY);
        tempPos.x += this.mouseShift.x;
        tempPos.y += this.mouseShift.y;

        if (tempPos.x < 0) {
            tempPos.x = 0;
        } else if (tempPos.x + this.tooltip.view.width > EngineAdapter.instance.rendererWidth) {
            tempPos.x = EngineAdapter.instance.rendererWidth - this.tooltip.view.width;
        }

        if (tempPos.y < 0) {
            tempPos.y = 0;
        } else if (tempPos.y + this.tooltip.view.height > EngineAdapter.instance.rendererHeight) {
            tempPos.y = EngineAdapter.instance.rendererHeight - this.tooltip.view.height;
        }

        tempPos = this.tooltip.view.parent.toLocal(tempPos);
        this.moveTooltipTo(tempPos.x, tempPos.y);
    }

    /**
     * Move a tooltip to a new position.
     * Might be overridden in subclasses to implement different behavior (e.g. tween movement).
     *
     * @param x
     * @param y
     */
    protected moveTooltipTo(x:number, y:number):void {
        this.tooltip.view.x = x;
        this.tooltip.view.y = y;
    }


    public get tooltipCont():IDisplayObjectContainerWrapper {
        return this._tooltipCont;
    }

    public set tooltipCont(value:IDisplayObjectContainerWrapper) {
        if (this.tooltipCont == value) {
            return;
        }

        this._tooltipCont = value;

        if (this.tooltipCont) {
            this.tooltipCont.addChild(this.tooltipInsideCont);
        }

        this.update();
    }


    get mouseShift():Point {
        return this._mouseShift;
    }

    set mouseShift(value:Point) {
        this._mouseShift = value.clone();

        this.update();
    }


    private get visible():boolean {
        return this._visible;
    }

    private set visible(value:boolean) {
        this._visible = value;

        this.tooltipInsideCont.visible = this.visible;
    }
}