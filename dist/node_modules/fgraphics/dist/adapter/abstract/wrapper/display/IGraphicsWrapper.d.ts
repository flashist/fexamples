import {IDisplayObjectContainerWrapper} from "./IDisplayObjectContainerWrapper";
export interface IGraphicsWrapper extends IDisplayObjectContainerWrapper {
    isGraphicsWrapper: boolean;
    clear(): IGraphicsWrapper;
    beginFill(color: number, alpha?: number): IGraphicsWrapper;
    endFill(): IGraphicsWrapper;
    lineStyle(lineWidth: number, color: number, alpha: number): IGraphicsWrapper;
    lineTo(x: number, y: number): IGraphicsWrapper;
    moveTo(x: number, y: number): IGraphicsWrapper;
    drawRect(x: number, y: number, width: number, height: number): IGraphicsWrapper;
    drawCircle(x: number, y: number, radius: number): IGraphicsWrapper;
}
