import {EngineAdapter, PixiAdapter, TickerEvent} from "fgraphics/dist/index";
import {CC} from "fconsole/dist/index";
import {Logger, ConsoleCustomLoggerItem} from "fcore/dist/index";
import {FConsoleSettings} from "../FConsoleSettings";
import {CustomContainer} from "./custom/CustomContainer";
import {CustomGraphics} from "./custom/CustomGraphics";

export class PixiAdapterExample {
    constructor() {
        alert(FConsoleSettings.FCONSOLE_PIXI_ADAPTER_ALERT);

        Logger.addLoggerItem(new ConsoleCustomLoggerItem());
        Logger.log(FConsoleSettings.FCONSOLE_PIXI_ADAPTER_ALERT);

        // Initialization of the grpahics adapter (in the current case PixiAdapter)
        EngineAdapter.instance = new PixiAdapter(
            {
                rendererSettings: {
                    backgroundColor: 0xAAAAAA
                },
                rendererWidth: 800,
                rendererHeight: 600
            }
        );
        // console.log("PixiAdapterExample | constructor __ EngineAdapter.instance: ", EngineAdapter.instance);
        // Append the renderer canvas to DOM
        document.body.appendChild(EngineAdapter.instance.canvas);


        // Creation of random stuff
        let tempStuff:PIXI.DisplayObject;
        let stuffCount:number = 50;
        for (let stuffIndex:number = 0; stuffIndex < stuffCount; stuffIndex++) {
            if (Math.random() < 0.5) {
                tempStuff = new CustomContainer();
            } else {
                tempStuff = new CustomGraphics();
            }

            tempStuff.x = Math.random() * EngineAdapter.instance.rendererWidth;
            tempStuff.y = Math.random() * EngineAdapter.instance.rendererHeight;

            EngineAdapter.instance.stage.object.addChild(tempStuff);
        }

        // Initialization of the console (should be initialized after initialization of the adapter)
        CC.startInit(
            EngineAdapter.instance.stage,
            // Password for showing/hiding the console.
            // ` is the default password, and might not be passed into the startInit method.
            "`"
        );
        // The console might be hidden at the beginning and shown by pressing a password combination
        CC.visible = true;

        // Render graphics by ticker events
        EngineAdapter.instance.mainTicker.addEventListener(
            TickerEvent.TICK,
            () => {
                EngineAdapter.instance.renderGraphics();
            }
        );
    }

}