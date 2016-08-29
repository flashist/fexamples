import {BaseObject, EventListenerHelper} from "fcore/dist/index";
import {IDisplayObjectWrapper, DisplayObjectWrapperMouseEvent, EngineAdapter, TickerEvent} from "fgraphics/dist/index";
import {DragHelperEvent} from "./DragHelperEvent";

export class DragHelper extends BaseObject {

    private _view:IDisplayObjectWrapper;
    private viewEventListenerHelper:EventListenerHelper<string>;

    private _isDragStarted:boolean;

    public startDragGlobalX:number = 0;
    public startDragGlobalY:number = 0;
    public lastDragGlobalX:number = 0;
    public lastDragGlobalY:number = 0;
    public changeDragGlobalX:number = 0;
    public changeDragGlobalY:number = 0;

    // Might be useful to prevent too quick/too small drags
    public dragUpdateDelay:number = 0;

    protected dragStartTime:number = 0;

    public constructor() {
        super();
    }


    protected construction():void {
        super.construction();

        this.viewEventListenerHelper = new EventListenerHelper(this);
    }

    destruction():void {
        super.destruction();

        if (this.viewEventListenerHelper) {
            this.viewEventListenerHelper.destruction();
            this.viewEventListenerHelper = null;
        }
    }


    protected removeListeners():void {
        super.removeListeners();

        this.removeViewListeners(this.view);
    }


    protected addViewObjectListeners(object:IDisplayObjectWrapper):void {
        if (!object) {
            return;
        }

        this.viewEventListenerHelper.addEventListener(
            object,
            DisplayObjectWrapperMouseEvent.MOUSE_DOWN,
            this.onMouseDown
        );
        this.viewEventListenerHelper.addEventListener(
            object,
            DisplayObjectWrapperMouseEvent.MOUSE_UP,
            this.onMouseUp
        );
        this.viewEventListenerHelper.addEventListener(
            object,
            DisplayObjectWrapperMouseEvent.MOUSE_UP_OUTSIDE,
            this.onMouseUp
        );
        this.viewEventListenerHelper.addEventListener(
            EngineAdapter.instance.mainTicker,
            TickerEvent.TICK,
            this.onTick
        );
    }

    protected removeViewListeners(object:IDisplayObjectWrapper):void {
        if (!object) {
            return;
        }
        this.viewEventListenerHelper.removeAllListeners();
    }


    private onMouseDown():void {
        this.startDrag();
    }

    private onMouseUp():void {
        this.stopDrag();
    }

    private onTick():void {
        if (this.isDragStarted) {
            if (this.checkIsNeedUpdateDrag()) {
                this.updateDrag();
            }
        }
    }


    private dispatchDragStartEvent():void {
        this.dispatchEvent(DragHelperEvent.DRAG_START);
    }

    private dispatchDragUpdateEvent():void {
        this.dispatchEvent(DragHelperEvent.DRAG_UPDATE);
    }

    private dispatchDragEndEvent():void {
        this.dispatchEvent(DragHelperEvent.DRAG_END);
    }

    private startDrag():void {
        if (this.isDragStarted) {
            return;
        }
        this.isDragStarted = true;

        this.startDragGlobalX = EngineAdapter.instance.globalMouseX;
        this.startDragGlobalY = EngineAdapter.instance.globalMouseY;

        this.lastDragGlobalX = this.startDragGlobalX;
        this.lastDragGlobalY = this.startDragGlobalY;

        this.changeDragGlobalX = 0;
        this.changeDragGlobalY = 0;

        this.dispatchDragStartEvent();
    }

    private stopDrag():void {
        if (!this.isDragStarted) {
            return;
        }
        this.isDragStarted = false;

        this.updateDrag();

        this.dispatchDragEndEvent();
    }

    private updateDrag():void {
        // Если последняя точка перетаскивания не изменилась, то прерываем функцию
        if (this.lastDragGlobalX == EngineAdapter.instance.globalMouseX &&
            this.lastDragGlobalY == EngineAdapter.instance.globalMouseY) {
            return;
        }

        this.lastDragGlobalX = EngineAdapter.instance.globalMouseX;
        this.lastDragGlobalY = EngineAdapter.instance.globalMouseY;

        this.changeDragGlobalX = this.lastDragGlobalX - this.startDragGlobalX;
        this.changeDragGlobalY = this.lastDragGlobalY - this.startDragGlobalY;

        this.dispatchDragUpdateEvent();
    }


    public get isDragStarted():boolean {
        return this._isDragStarted;
    }

    public set isDragStarted(value:boolean) {
        if (value == this.isDragStarted) {
            return;
        }

        this._isDragStarted = value;
        if (this.isDragStarted) {
            this.dragStartTime = Date.now();
        }
    }


    get view():IDisplayObjectWrapper {
        return this._view;
    }
    set view(value:IDisplayObjectWrapper) {

        if (value == this.view) {
            return;
        }

        this.removeViewListeners(this.view);

        this._view = value;
        this.addViewObjectListeners(this.view);
    }


    private checkIsNeedUpdateDrag():boolean {
        var result:boolean;

        if (Date.now() >= this.dragStartTime + this.dragUpdateDelay) {
            result = true;
        }

        return result;
    }
}