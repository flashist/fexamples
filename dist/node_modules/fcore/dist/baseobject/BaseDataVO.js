"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Logger_1 = require("../logger/Logger");
var ObjectTools_1 = require("../tools/ObjectTools");
var BaseObject_1 = require("./BaseObject");
var BaseDataVO = (function (_super) {
    __extends(BaseDataVO, _super);
    function BaseDataVO() {
        _super.call(this);
        this.objectType = "";
        this.objectId = "";
        this.sourceData = {};
        this.sourceDataPropNamesMap = {};
    }
    BaseDataVO.prototype.commitSourceData = function () {
        var propName;
        var propValue;
        var sourcePropName;
        for (sourcePropName in this.sourceData) {
            propName = sourcePropName;
            // If there is a special name for the processed property,
            // then use the special name instead of the original name
            if (this.sourceDataPropNamesMap[sourcePropName]) {
                propName = this.sourceDataPropNamesMap[sourcePropName];
            }
            if (propName) {
                propValue = this.sourceData[sourcePropName];
                if (propValue != null) {
                    if (this.hasOwnProperty(propName) ||
                        (this["__proto__"] && this["__proto__"].hasOwnProperty(propName))) {
                        try {
                            this[propName] = propValue;
                        }
                        catch (error) {
                            Logger_1.Logger.error("BaseDataVO | commitSourceData __ ERROR! error: " + error);
                        }
                    }
                }
            }
        }
    };
    BaseDataVO.prototype.changeSourceData = function (changesData) {
        ObjectTools_1.ObjectTools.copyProps(this.sourceData, changesData, true);
        this.commitSourceData();
    };
    return BaseDataVO;
}(BaseObject_1.BaseObject));
exports.BaseDataVO = BaseDataVO;
//# sourceMappingURL=BaseDataVO.js.map