import {IMovieClipWrapper} from "../../adapter/abstract/wrapper/display/IDisplayMovieClipWrapper";
export declare class MovieClipTools {
    static safeGoTo(clip: IMovieClipWrapper, frame: string | number, defaultFrame?: string | number, isGoToAndStop?: boolean): void;
    static checkIfClipHasLabel(clip: IMovieClipWrapper, label: string): boolean;
}
