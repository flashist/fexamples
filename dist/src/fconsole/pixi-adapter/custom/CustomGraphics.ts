export class CustomGraphics extends PIXI.Graphics {

    public customGraphicsProp1:string = "customProp1";
    public customGraphicsProp2:number = 0;
    public customGraphicsProp3:boolean = false;

    constructor() {
        super();

        this.beginFill(Math.floor(Math.random() * 0xFFFFFF), 0.5);
        this.lineStyle(2, Math.floor(Math.random() * 0xFFFFFF), 0.5);
        if (Math.random() < 0.5) {
            this.drawRect(0, 0, 5 + Math.random() * 95, 5 + Math.random() * 95);
        }else {
            this.drawCircle(0, 0, 5 + Math.random() * 45);
        }
        this.endFill();
    }

}