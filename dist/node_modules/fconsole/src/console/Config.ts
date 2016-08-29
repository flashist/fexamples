export class Config {

    public localization = {
        closeBtnTooltipTitle: "Close",

        displayListBtnTooltipTitle: "Display List Inspector",
        displayListBtnTooltipText: "Map the display list\nunder your mouse",

        captureKeyBtnTooltipTitle: "Assign a key",
        captureKeyBtnNormalLabel: "Capture key: {0}",
        captureKeyBtnPressedLabel: "Press a key",
        captureKeyBtnNoKeyHelpText: "(click to add)",

        displayListTitle: "Display List Inspector",
    };

    public btnSettings = {
        labelSize: 14,
        labelColor: 0xFF9900
    };

    public viewSettings = {
        bgColor: 0x000000,
        bgAlpha: 0.75,
        bgToContentShift: {x: 10, y: 10},

        borderWidth: 1,
        borderColor: 0x660000,
        borderAlpha: 0.75,

        titleLabelColor: 0xFFFFFF,
        titleLabelSize: 14
    };

    public displayListSettings = {
        hierarchyLabelColor: 0xCCCCCC,
        hierarchyLabelSize: 14
    };

    public tooltipSettings = {
        bgColor: 0x000000,
        bgAlpha: 0.75,
        bgToContentShift: {x: 10, y: 10},

        borderWidth: 1,
        borderColor: 0x660000,
        borderAlpha: 0.75,

        titleLabelColor: 0xFF9900,
        titleLabelSize: 14,

        textLabelColor: 0xCCCCCC,
        textLabelSize: 12
    };
}