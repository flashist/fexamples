import {IDisplayObjectContainerWrapper} from "./IDisplayObjectContainerWrapper";
import {IMovieClipLabel} from "./IMovieClipLabel";
export interface IMovieClipWrapper extends IDisplayObjectContainerWrapper {
    isMovieClipWrapper: boolean;
    gotoAndPlay(frame: number | string): void;
    gotoAndStop(frame: number | string): void;
    labels: IMovieClipLabel[];
    totalFrames: number;
}
