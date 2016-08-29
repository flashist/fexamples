import {ITickerWrapper} from "../../../abstract/wrapper/ticker/ITickerWrapper";
import {BaseClassWrapper} from "fcore/dist/index";
import {TickerEvent} from "../../../abstract/wrapper/ticker/TickerEvent";
export class PixiTickerWrapper extends BaseClassWrapper implements ITickerWrapper {
    private _pixiTicker:PIXI.ticker.Ticker;

    protected prevLastTime:number = 0;
    protected lastTime:number = 0;

    constructor() {
        super();
    }


    protected removeListeners():void {
        super.removeListeners();

        if (this.pixiTicker) {
            this.removeTickerListeners(this.pixiTicker);
        }
    }


    protected addTickerListeners(ticker:PIXI.ticker.Ticker):void {
        if (!ticker) {
            return;
        }

        ticker.add(
            this.onTick,
            this
        );
    }

    protected removeTickerListeners(ticker:PIXI.ticker.Ticker):void {
        if (!ticker) {
            return;
        }

        ticker.remove(
            this.onTick,
            this
        );
    }

    protected onTick(deltaTime:number):void {
        this.prevLastTime = this.lastTime;
        this.lastTime = this.pixiTicker.lastTime;

        this.dispatchEvent(TickerEvent.TICK);
    }


    protected commitData():void {
        super.commitData();

        this.pixiTicker = (this.object as PIXI.ticker.Ticker);
    }


    protected get pixiTicker():PIXI.ticker.Ticker {
        return this._pixiTicker;
    }

    protected set pixiTicker(value:PIXI.ticker.Ticker) {
        if (value == this.pixiTicker) {
            return;
        }

        this.removeTickerListeners(this.pixiTicker);
        //
        this._pixiTicker = value;
        this.addTickerListeners(this.pixiTicker);
    }


    public get fps():number {
        return this.pixiTicker.FPS;
    }

    public get minFPS():number {
        return this.pixiTicker.minFPS;
    }

    public get deltaTime():number {
        return this.lastTime - this.prevLastTime;
    }

    public get deltaTimeToTargetFpsCoef():number {
        return this.deltaTime / 1000;
    }

    public update(currentTime:number):void {
        if (this.pixiTicker) {
            (this.pixiTicker as any).update(currentTime);
        }
    }
}
