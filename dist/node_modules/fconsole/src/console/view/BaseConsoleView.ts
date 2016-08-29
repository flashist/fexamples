import {IDisplayObjectContainerWrapper, EngineAdapter, IGraphicsWrapper, ITextWrapper} from "fgraphics/dist/index";
import {BaseEventListenerObject, EventListenerHelper} from "fcore/dist/index";
import {DragHelper, DragHelperEvent} from "flibs/dist/index";
import {BaseConsoleButton} from "./BaseConsoleButton";
import {CC} from "../CC";
import {CaptureKeyButton} from "./capturekey/CaptureKeyButton";
import {CaptuerKeyButtonEvent} from "./capturekey/CaptureKeyButtonEvent";
import {ITooltipData} from "../../tooltip/ITooltipData";

export class BaseConsoleView extends BaseEventListenerObject {

    private static CAPTURE_LABEL_FIRST_PART:string = "Capture key:";
    private static NO_CAPTURE_KEY_TEXT:string = "(click to add)";

    public view:IDisplayObjectContainerWrapper;
    private bgGraphics:IGraphicsWrapper;

    protected contentCont:IDisplayObjectContainerWrapper;
    protected titleCont:IDisplayObjectContainerWrapper;

    private _visible:boolean;

    private dragHelper:DragHelper;
    private viewDragStartX:number;
    private viewDragStartY:number;

    private buttonsList:BaseConsoleButton[];
    private btnsCont:IDisplayObjectContainerWrapper;
    private buttonsEventListenerHelper:EventListenerHelper<string>;

    protected titleLabel:ITextWrapper;
    private _titleVisible:boolean;

    protected captureBtn:BaseConsoleButton;
    private _captureVisible:boolean;
    private captureKey:string;

    public lastBgWidth:number = 0;
    public lastBgHeight:number = 0;

    constructor() {
        super();
    }

    protected construction():void {
        super.construction();

        this.captureKey = "";

        this._titleVisible = true;
        this._captureVisible = false;

        this.buttonsList = [];
        this.buttonsEventListenerHelper = new EventListenerHelper<string>(this);

        this.view = EngineAdapter.instance.createDisplayObjectContainerWrapper();

        this.bgGraphics = EngineAdapter.instance.createGraphicsWrapper();
        this.view.addChild(this.bgGraphics);
        //
        this.bgGraphics.interactive = true;

        this.dragHelper = new DragHelper();
        this.dragHelper.view = (this.bgGraphics as any);

        this.contentCont = EngineAdapter.instance.createDisplayObjectContainerWrapper();
        this.view.addChild(this.contentCont);

        this.titleCont = EngineAdapter.instance.createDisplayObjectContainerWrapper();
        this.contentCont.addChild(this.titleCont);

        this.titleLabel = EngineAdapter.instance.createTextWrapper();
        this.titleCont.addChild(this.titleLabel);
        this.titleLabel.color = CC.config.viewSettings.titleLabelColor;
        this.titleLabel.size = CC.config.viewSettings.titleLabelSize;
        this.titleLabel.text = "Test Title";

        this.btnsCont = EngineAdapter.instance.createDisplayObjectContainerWrapper();
        this.titleCont.addChild(this.btnsCont);

        this.captureBtn = new CaptureKeyButton();
        this.titleCont.addChild(this.captureBtn.view);
        this.captureBtn.view.y = this.titleLabel.y + this.titleLabel.height;
        //
        this.captureBtn.tooltipData = {title: CC.config.localization.captureKeyBtnTooltipTitle};

        this.commitData();
    }

    public destruction():void {
        super.destruction();

        if (this.buttonsEventListenerHelper) {
            this.buttonsEventListenerHelper.destruction();
            this.buttonsEventListenerHelper = null;
        }
    }


    protected addListeners():void {
        super.addListeners();

        this.eventListenerHelper.addEventListener(
            this.dragHelper,
            DragHelperEvent.DRAG_START,
            this.onDragStart
        );
        this.eventListenerHelper.addEventListener(
            this.dragHelper,
            DragHelperEvent.DRAG_UPDATE,
            this.onDragUpdate
        );

        this.eventListenerHelper.addEventListener(
            this.captureBtn,
            CaptuerKeyButtonEvent.CAPTURE_KEY_PRESS,
            this.onCaptureKey
        );
    }

    private onDragStart():void {
        this.viewDragStartX = this.view.x;
        this.viewDragStartY = this.view.y;

        CC.moveViewToTopLayer(this);
    }

    private onDragUpdate():void {
        this.view.x = this.viewDragStartX + this.dragHelper.changeDragGlobalX;
        this.view.y = this.viewDragStartY + this.dragHelper.changeDragGlobalY;
    }

    protected onClose():void {
        CC.hideView(this);
    }

    protected onCaptureKey():void {

    }


    public get visible():boolean {
        return this._visible;
    }
    public set visible(value:boolean) {
        if (value == this.visible) {
            return;
        }
        this._visible = value;

        /*if (this.visible) {
            CC.showView(this);
        } else {
            CC.hideView(this);
        }*/

        this.commitData();
    }

    protected commitData():void {
        super.commitData();

        this.titleLabel.visible = this.titleVisible;
        this.captureBtn.view.visible = this.captureVisible;
        if (this.captureKey) {
            this.captureBtn.label = BaseConsoleView.CAPTURE_LABEL_FIRST_PART + " " + this.captureKey;
        } else {
            this.captureBtn.label = BaseConsoleView.CAPTURE_LABEL_FIRST_PART + " " + BaseConsoleView.NO_CAPTURE_KEY_TEXT;
        }

        this.arrange();
    }

    protected arrange():void {

        // Reset previously set changes

        let tempBtn:BaseConsoleButton;
        let prevBtn:BaseConsoleButton;
        let btnsCount:number = this.buttonsList.length;
        for (let btnIndex:number = 0; btnIndex < btnsCount; btnIndex++) {
            tempBtn = this.buttonsList[btnIndex];
            if (prevBtn) {
                tempBtn.view.x = prevBtn.view.x + prevBtn.view.width + 5;
            }

            prevBtn = tempBtn;
        }

        if (this.titleVisible) {
            this.btnsCont.x = this.titleLabel.x + this.titleLabel.width + 10;
        } else {
            this.btnsCont.x = this.titleLabel.x;
        }

        let tempWidth:number = this.contentCont.width + CC.config.viewSettings.bgToContentShift.x;
        let tempHeight:number = this.contentCont.height + CC.config.viewSettings.bgToContentShift.y;
        if (tempWidth != this.lastBgWidth || tempHeight != this.lastBgHeight) {

            this.lastBgWidth = tempWidth;
            this.lastBgHeight = tempHeight;

            this.bgGraphics.clear();
            this.bgGraphics.beginFill(CC.config.viewSettings.bgColor, CC.config.viewSettings.bgAlpha);
            this.bgGraphics.lineStyle(CC.config.viewSettings.borderWidth, CC.config.viewSettings.borderColor, CC.config.viewSettings.borderAlpha);
            this.bgGraphics.drawRect(
                0,
                0,
                tempWidth,
                tempHeight
            );
            this.bgGraphics.endFill();
        }

        this.contentCont.x = this.bgGraphics.x + ((this.bgGraphics.width - this.contentCont.width) >> 1);
        this.contentCont.y = this.bgGraphics.y + ((this.bgGraphics.height - this.contentCont.height) >> 1);
    }

    protected createTitleBtn(label:string, tooltipData?:ITooltipData):BaseConsoleButton {
        let tempBtn = new BaseConsoleButton();
        this.btnsCont.addChild(tempBtn.view);
        tempBtn.label = label;
        tempBtn.tooltipData = tooltipData;

        this.buttonsList.push(tempBtn);

        return tempBtn;
    }

    get titleVisible():boolean {
        return this._titleVisible;
    }
    set titleVisible(value:boolean) {
        if (value == this.titleVisible) {
            return;
        }

        this._titleVisible = value;

        this.commitData();
    }

    get captureVisible():boolean {
        return this._captureVisible;
    }
    set captureVisible(value:boolean) {
        if (value == this.captureVisible) {
            return;
        }

        this._captureVisible = value;

        this.commitData();
    }
}