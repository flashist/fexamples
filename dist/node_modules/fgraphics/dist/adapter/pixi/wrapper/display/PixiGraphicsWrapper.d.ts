import {IGraphicsWrapper} from "../../../abstract/wrapper/display/IGraphicsWrapper";
import {PixiDisplayObjectContainerWrapper} from "./PixiDisplayObjectContainerWrapper";
export declare class PixiGraphicsWrapper extends PixiDisplayObjectContainerWrapper implements IGraphicsWrapper {
    isGraphicsWrapper: boolean;
    protected pixiGraphics: PIXI.Graphics;
    constructor();
    protected commitData(): void;
    clear(): IGraphicsWrapper;
    beginFill(color: number, alpha?: number): IGraphicsWrapper;
    endFill(): IGraphicsWrapper;
    lineStyle(lineWidth: number, color: number, alpha: number): IGraphicsWrapper;
    lineTo(x: number, y: number): IGraphicsWrapper;
    moveTo(x: number, y: number): IGraphicsWrapper;
    drawRect(x: number, y: number, width: number, height: number): IGraphicsWrapper;
    drawCircle(x: number, y: number, radius: number): IGraphicsWrapper;
}
