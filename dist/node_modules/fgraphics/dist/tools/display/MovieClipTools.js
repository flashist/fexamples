"use strict";
var index_1 = require("fcore/dist/index");
var MovieClipTools = (function () {
    function MovieClipTools() {
    }
    MovieClipTools.safeGoTo = function (clip, frame, defaultFrame, isGoToAndStop) {
        if (isGoToAndStop === void 0) { isGoToAndStop = true; }
        var frameToGo = defaultFrame;
        if (index_1.ObjectTools.isString(frame)) {
            if (MovieClipTools.checkIfClipHasLabel(clip, frame)) {
                frameToGo = frame;
            }
        }
        else {
            if (clip.totalFrames > frame) {
                frameToGo = frame;
            }
        }
        if (isGoToAndStop) {
            clip.gotoAndStop(frameToGo);
        }
        else {
            clip.gotoAndPlay(frameToGo);
        }
    };
    MovieClipTools.checkIfClipHasLabel = function (clip, label) {
        var result = false;
        var labelsCount = clip.labels.length;
        for (var labelIndex = 0; labelIndex < labelsCount; labelIndex++) {
            if (clip.labels[labelIndex].label == label) {
                result = true;
                break;
            }
        }
        return result;
    };
    return MovieClipTools;
}());
exports.MovieClipTools = MovieClipTools;
//# sourceMappingURL=MovieClipTools.js.map