import {IMovieClipWrapper} from "../../adapter/abstract/wrapper/display/IDisplayMovieClipWrapper";
import {ObjectTools} from "fcore/dist/index";
export class MovieClipTools {
    public static safeGoTo(clip:IMovieClipWrapper, frame:string | number, defaultFrame?:string | number, isGoToAndStop:boolean = true):void {
        var frameToGo:string | number = defaultFrame;


        if (ObjectTools.isString(frame)) {
            if (MovieClipTools.checkIfClipHasLabel(clip, (frame as string))) {
                frameToGo = frame;
            }

            // If frame is a number
        } else {
            if (clip.totalFrames > frame) {
                frameToGo = frame;
            }
        }

        if (isGoToAndStop) {
            clip.gotoAndStop(frameToGo);
        } else {
            clip.gotoAndPlay(frameToGo);
        }
    }

    public static checkIfClipHasLabel(clip:IMovieClipWrapper, label:string):boolean {
        var result:boolean = false;

        var labelsCount:number = clip.labels.length;
        for (var labelIndex:number = 0; labelIndex < labelsCount; labelIndex++) {
            if (clip.labels[labelIndex].label == label) {
                result = true;
                break;
            }
        }

        return result;
    }
}
