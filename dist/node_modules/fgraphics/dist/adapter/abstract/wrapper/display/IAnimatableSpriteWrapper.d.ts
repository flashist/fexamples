import {ISpriteWrapper} from "./ISpriteWrapper";
import {ISpriteSheetWrapper} from "./ISpriteSheetWrapper";
export interface IAnimatableSpriteWrapper extends ISpriteWrapper {
    isAnimatableSpriteWrapper: boolean;
    isLooped: boolean;
    currentFrame: number;
    spriteSheet: ISpriteSheetWrapper;
    play(): any;
    stop(): any;
    gotoAndPlay(frame: number): void;
    gotoAndStop(frame: number): void;
}
