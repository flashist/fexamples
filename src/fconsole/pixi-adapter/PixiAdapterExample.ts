import {EngineAdapter, PixiAdapter} from "fgraphics/dist/index";
import {CC} from "fconsole/dist/index";
import {FConsoleSettings} from "../FConsoleSettings";

export class PixiAdapterExample {
    constructor() {
        alert(FConsoleSettings.FCONSOLE_PIXI_ADAPTER_ALERT);

        // Console settings
        EngineAdapter.instance = new PixiAdapter({rendererWidth: 800, rendererHeight: 600});
        document.body.appendChild(EngineAdapter.instance.canvas);


        CC.startInit(EngineAdapter.instance.createDisplayObjectContainerWrapper(EngineAdapter.instance.stage.object));
        CC.visible = true;
    }

}