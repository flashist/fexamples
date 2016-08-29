"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PixiSpriteWrapper_1 = require("./PixiSpriteWrapper");
var index_1 = require("fcore/dist/index");
var TextWrapperAlign_1 = require("../../../abstract/wrapper/display/TextWrapperAlign");
var PixiTextWrapper = (function (_super) {
    __extends(PixiTextWrapper, _super);
    function PixiTextWrapper() {
        _super.call(this);
        this.isTextWrapper = true;
        this._fontFamily = "";
    }
    PixiTextWrapper.prototype.commitData = function () {
        _super.prototype.commitData.call(this);
        this.pixiText = this.object;
        if (!this.pixiText) {
            return;
        }
        var tempStyle = {};
        index_1.ObjectTools.copyProps(tempStyle, this.pixiText.style, true);
        if (this.color) {
            tempStyle.fill = this.color;
        }
        if (this.align && this.align != TextWrapperAlign_1.TextWrapperAlign.NONE) {
            tempStyle.align = this.align;
        }
        else {
            tempStyle.align = "";
        }
        /*tempStyle.font = "";
        if (this.fontFamily) {
            tempStyle.font += this.fontFamily;
        }
        if (this.size) {
            if (tempStyle.font) {
                tempStyle.font += " ";
            }
            tempStyle.font += this.size + "px";
        }*/
        if (this.fontFamily) {
            tempStyle.fontFamily = this.fontFamily;
        }
        if (this.size) {
            tempStyle.fontSize = this.size;
        }
        this.pixiText.style = tempStyle;
    };
    Object.defineProperty(PixiTextWrapper.prototype, "text", {
        get: function () {
            return this.pixiText.text;
        },
        set: function (value) {
            this.pixiText.text = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PixiTextWrapper.prototype, "fontFamily", {
        get: function () {
            return this._fontFamily;
        },
        set: function (value) {
            if (value == this.fontFamily) {
                return;
            }
            this._fontFamily = value;
            this.commitData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PixiTextWrapper.prototype, "size", {
        get: function () {
            return this._size;
        },
        set: function (value) {
            if (value == this.size) {
                return;
            }
            this._size = value;
            this.commitData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PixiTextWrapper.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (value) {
            if (value == this.color) {
                return;
            }
            this._color = value;
            this.commitData();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PixiTextWrapper.prototype, "align", {
        get: function () {
            return this._align;
        },
        set: function (value) {
            if (value == this.align) {
                return;
            }
            this._align = value;
            this.commitData();
        },
        enumerable: true,
        configurable: true
    });
    return PixiTextWrapper;
}(PixiSpriteWrapper_1.PixiSpriteWrapper));
exports.PixiTextWrapper = PixiTextWrapper;
//# sourceMappingURL=PixiTextWrapper.js.map