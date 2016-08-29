import {BaseConsoleView} from "./BaseConsoleView";
import {CC} from "../CC";
import {BaseConsoleButton} from "./BaseConsoleButton";
import {DisplayObjectWrapperMouseEvent} from "fgraphics/dist/index";
export class ConsoleView extends BaseConsoleView {

    private displayListBtn:BaseConsoleButton;
    private closeBtn:BaseConsoleButton;

    constructor() {
        super();
    }

    protected construction():void {
        super.construction();

        this.titleVisible = false;

        this.displayListBtn = this.createTitleBtn(
            "DL",
            {
                title: CC.config.localization.displayListBtnTooltipTitle,
                text: CC.config.localization.displayListBtnTooltipText
            }
        );
        this.closeBtn = this.createTitleBtn(
            "X",
            {title: CC.config.localization.closeBtnTooltipTitle}
        );
    }

    protected addListeners():void {
        super.addListeners();

        this.eventListenerHelper.addEventListener(
            this.displayListBtn.view,
            DisplayObjectWrapperMouseEvent.CLICK,
            this.onDisplayListClick
        );

        this.eventListenerHelper.addEventListener(
            this.closeBtn.view,
            DisplayObjectWrapperMouseEvent.CLICK,
            this.onClose
        );
    }


    private onDisplayListClick():void {
        CC.toggleView(CC.displayListView);
    }
}