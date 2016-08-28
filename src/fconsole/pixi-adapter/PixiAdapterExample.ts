import {EngineAdapter, PixiAdapter} from "fgraphics/dist/index";
import {CC} from "fconsole/dist/index";
import {FConsoleSettings} from "../FConsoleSettings";

export class PixiAdapterExample {
    constructor() {
        alert(FConsoleSettings.FCONSOLE_PIXI_ADAPTER_ALERT);

        // Console settings
        EngineAdapter.instance = new PixiAdapter({canvas: renderer.view, renderer: renderer, nativeStage: stage});
        CC.startInit(EngineAdapter.instance.createDisplayObjectContainerWrapper(stage));
        CC.visible = true;
    }

}