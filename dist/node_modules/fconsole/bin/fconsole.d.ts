declare module "TestConsoleClass" {
    export class TestConsoleClass {
        constructor();
    }
}
declare module "tooltip/ITooltipData" {
    export interface ITooltipData {
        title: string;
        text?: string;
    }
}
declare module "console/view/BaseConsoleButton" {
    import { IDisplayObjectContainerWrapper } from "fgraphics/dist/index";
    import { BaseEventListenerObject } from "fcore/dist/index";
    import { ITooltipData } from "tooltip/ITooltipData";
    export class BaseConsoleButton extends BaseEventListenerObject {
        view: IDisplayObjectContainerWrapper;
        private field;
        private _label;
        tooltipData: ITooltipData;
        constructor();
        protected construction(): void;
        protected addListeners(): void;
        private onOver();
        private onOut();
        protected onClick(): void;
        protected commitData(): void;
        protected arrange(): void;
        label: string;
    }
}
declare module "console/view/capturekey/CaptureKeyButtonEvent" {
    export class CaptuerKeyButtonEvent {
        static CAPTURE_KEY_PRESS: string;
    }
}
declare module "console/view/capturekey/CaptureKeyButton" {
    import { BaseConsoleButton } from "console/view/BaseConsoleButton";
    import { InputManagerEventData } from "flibs/dist/index";
    export class CaptureKeyButton extends BaseConsoleButton {
        private captureKey;
        private captureCode;
        private _isClicked;
        constructor();
        protected construction(): void;
        protected addListeners(): void;
        protected onClick(): void;
        protected onKeyPress(data: InputManagerEventData): void;
        protected commitData(): void;
        protected arrange(): void;
        isClicked: boolean;
    }
}
declare module "console/view/BaseConsoleView" {
    import { IDisplayObjectContainerWrapper, ITextWrapper } from "fgraphics/dist/index";
    import { BaseEventListenerObject } from "fcore/dist/index";
    import { BaseConsoleButton } from "console/view/BaseConsoleButton";
    import { ITooltipData } from "tooltip/ITooltipData";
    export class BaseConsoleView extends BaseEventListenerObject {
        private static CAPTURE_LABEL_FIRST_PART;
        private static NO_CAPTURE_KEY_TEXT;
        view: IDisplayObjectContainerWrapper;
        private bgGraphics;
        protected contentCont: IDisplayObjectContainerWrapper;
        protected titleCont: IDisplayObjectContainerWrapper;
        private _visible;
        private dragHelper;
        private viewDragStartX;
        private viewDragStartY;
        private buttonsList;
        private btnsCont;
        private buttonsEventListenerHelper;
        protected titleLabel: ITextWrapper;
        private _titleVisible;
        protected captureBtn: BaseConsoleButton;
        private _captureVisible;
        private captureKey;
        constructor();
        protected construction(): void;
        destruction(): void;
        protected addListeners(): void;
        private onDragStart();
        private onDragUpdate();
        protected onClose(): void;
        protected onCaptureKey(): void;
        visible: boolean;
        protected commitData(): void;
        protected arrange(): void;
        protected createTitleBtn(label: string, tooltipData?: ITooltipData): BaseConsoleButton;
        titleVisible: boolean;
        captureVisible: boolean;
    }
}
declare module "console/view/ConsoleView" {
    import { BaseConsoleView } from "console/view/BaseConsoleView";
    export class ConsoleView extends BaseConsoleView {
        private displayListBtn;
        private closeBtn;
        constructor();
        protected construction(): void;
        protected addListeners(): void;
        private onDisplayListClick();
    }
}
declare module "console/view/DisplayListView" {
    import { BaseConsoleView } from "console/view/BaseConsoleView";
    export class DisplayListView extends BaseConsoleView {
        private lastCheckedPos;
        private displayListField;
        private closeBtn;
        constructor();
        protected construction(): void;
        protected addListeners(): void;
        private onTick();
        protected onCaptureKey(): void;
        private getObjectsUnderMouse();
        private parseUnderPointData(data, prefix?);
        private groupLogUnderPointData(data, prefix?);
    }
}
declare module "console/Config" {
    export class Config {
        localization: {
            closeBtnTooltipTitle: string;
            displayListBtnTooltipTitle: string;
            displayListBtnTooltipText: string;
            captureKeyBtnTooltipTitle: string;
            captureKeyBtnNormalLabel: string;
            captureKeyBtnPressedLabel: string;
            captureKeyBtnNoKeyHelpText: string;
            displayListTitle: string;
        };
        btnSettings: {
            labelSize: number;
            labelColor: number;
        };
        viewSettings: {
            bgColor: number;
            bgAlpha: number;
            bgToContentShift: {
                x: number;
                y: number;
            };
            borderWidth: number;
            borderColor: number;
            borderAlpha: number;
            titleLabelColor: number;
            titleLabelSize: number;
        };
        displayListSettings: {
            hierarchyLabelColor: number;
            hierarchyLabelSize: number;
        };
        tooltipSettings: {
            bgColor: number;
            bgAlpha: number;
            bgToContentShift: {
                x: number;
                y: number;
            };
            borderWidth: number;
            borderColor: number;
            borderAlpha: number;
            titleLabelColor: number;
            titleLabelSize: number;
            textLabelColor: number;
            textLabelSize: number;
        };
    }
}
declare module "tooltip/BaseTooltip" {
    import { IDisplayObjectContainerWrapper } from "fgraphics/dist/index";
    import { ITooltipData } from "tooltip/ITooltipData";
    import { BaseObject } from "fcore/dist/index";
    export abstract class BaseTooltip extends BaseObject {
        view: IDisplayObjectContainerWrapper;
        protected tooltipData: ITooltipData;
        protected construction(): void;
        protected commitData(): void;
    }
}
declare module "tooltip/TooltipManager" {
    import { BaseEventListenerObject, Point } from "fcore/dist/index";
    import { IDisplayObjectContainerWrapper } from "fgraphics/dist/index";
    import { BaseTooltip } from "tooltip/BaseTooltip";
    import { ITooltipData } from "tooltip/ITooltipData";
    export class TooltipManager extends BaseEventListenerObject {
        private static SHOW_DELAY;
        private _tooltipCont;
        private tooltipInsideCont;
        private tooltip;
        private _mouseShift;
        private _visible;
        constructor(tooltip: BaseTooltip);
        protected construction(tooltip: BaseTooltip): void;
        protected addListeners(): void;
        private onTick();
        show(data: ITooltipData): void;
        hide(): void;
        /**
         * Обновление подсказки.
         */
        update(): void;
        /**
         * Move a tooltip to a new position.
         * Might be overridden in subclasses to implement different behavior (e.g. tween movement).
         *
         * @param x
         * @param y
         */
        protected moveTooltipTo(x: number, y: number): void;
        tooltipCont: IDisplayObjectContainerWrapper;
        mouseShift: Point;
        private visible;
    }
}
declare module "console/view/tooltip/ConsoleTooltip" {
    import { BaseTooltip } from "tooltip/BaseTooltip";
    export class ConsoleTooltip extends BaseTooltip {
        private contentCont;
        private titleLabel;
        private textLabel;
        private bg;
        constructor();
        protected construction(): void;
        protected commitData(): void;
        protected arrange(): void;
    }
}
declare module "console/CC" {
    import { BaseConsoleView } from "console/view/BaseConsoleView";
    import { DisplayListView } from "console/view/DisplayListView";
    import { Config } from "console/Config";
    import { TooltipManager } from "tooltip/TooltipManager";
    export class CC {
        private static eventListenerHelper;
        private static root;
        private static viewsCont;
        private static tooltipsCont;
        private static password;
        private static passwordInputIndex;
        static config: Config;
        static tooltipManager: TooltipManager;
        private static view;
        static displayListView: DisplayListView;
        static startInit(root: any, password?: string, config?: Config): void;
        private static onPasswordInput();
        static visible: boolean;
        static showView(view: BaseConsoleView, moveToMouse?: boolean): void;
        static hideView(view: BaseConsoleView): void;
        static toggleView(view: BaseConsoleView, moveToMouse?: boolean): void;
        static moveViewToTopLayer(view: BaseConsoleView): void;
    }
}
declare module "index" {
    export * from "TestConsoleClass";
    export * from "console/CC";
    export * from "console/Config";
    export * from "tooltip/BaseTooltip";
    export * from "tooltip/ITooltipData";
    export * from "tooltip/TooltipManager";
    export * from "console/view/BaseConsoleButton";
    export * from "console/view/BaseConsoleView";
    export * from "console/view/ConsoleView";
    export * from "console/view/DisplayListView";
    export * from "console/view/capturekey/CaptureKeyButton";
    export * from "console/view/capturekey/CaptureKeyButtonEvent";
    export * from "console/view/tooltip/ConsoleTooltip";
}
