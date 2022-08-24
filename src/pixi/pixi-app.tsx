
import * as PIXI from "pixi.js";

class PixiApp extends PIXI.Application {
    constructor(root: HTMLElement) {
        super({
            backgroundColor: 0,
            backgroundAlpha: 0,
            view: document.getElementById("canvas") as HTMLCanvasElement,
            resizeTo: root,
        });

    }

}

export { PixiApp };
