import {CustomGraphics} from "./CustomGraphics";
export class CustomContainer extends PIXI.Container {

    public customContainerProp1:string = "customProp1";
    public customContainerProp2:number = 0;
    public customContainerProp3:boolean = false;

    constructor() {
        super();

        let tempGraphics = new CustomGraphics();
        this.addChild(tempGraphics);
        tempGraphics.name = "insideGraphics";
    }

}