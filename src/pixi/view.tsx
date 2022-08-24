import { assert } from "@darksun/assert";
import * as PIXI from "pixi.js";
import { DraggableRect } from "./draggableRect";

import { PixiApp } from "./pixi-app";
import { gsap, } from 'gsap'
import { PixiPlugin } from "gsap/PixiPlugin";
gsap.registerPlugin(PixiPlugin)

PixiPlugin.registerPIXI(PIXI)

const LOG_TAG = "View";

export type Dimensions = {
    width: number;
    height: number;
};

class View {
    private _app: PixiApp;
    private _root: HTMLElement;
    private _cellSize = 40;
    private _gridGraphics: PIXI.Graphics;
    private _treeContainer: PIXI.Container
    private _treeObjects: PIXI.Graphics[] = []
    private _gridNodes: PIXI.Point[] = []

    private _lineInProgress: PIXI.Graphics | null = null
    private _lineInProgressAnchor: PIXI.Point | null = null

    constructor(root: HTMLElement) {
        this._root = root;

        const { width, height } = this.getWindowDimensions();

        this._app = new PixiApp(root);

        const gridContainer = new PIXI.Container();
        this._gridGraphics = new PIXI.Graphics();
        gridContainer.addChild(this._gridGraphics);

        this._app.stage.addChild(gridContainer);

        this._treeContainer = new PIXI.Container()
        this._app.stage.addChild(this._treeContainer)


        this.newLineMove = this.newLineMove.bind(this)
        this.newLineStart = this.newLineStart.bind(this)
        this.newLineEnd = this.newLineEnd.bind(this)
    }

    async run() {
        this._app.start();
        this.drawGrid();
        this.drawTestRect();
    }

    shutdown() {
        this._app.stop();
    }

    handleResize() {
        const width = this._root.getBoundingClientRect().width ?? 0;
        const height = this._root.getBoundingClientRect().height ?? 0;
    }



    private drawGrid() {
        const { width, height } = this.getWindowDimensions();

        const columns = width / this._cellSize;
        const rows = height / this._cellSize;

        const lightColor = 0x999999;
        this._gridGraphics.lineStyle(1, lightColor)
        this._gridGraphics.beginFill()

        for (let column = 1; column < columns; column++) {
            this._gridGraphics.moveTo(column * this._cellSize, 0)
            this._gridGraphics.lineTo(
                column * this._cellSize,
                height
            );
        }
        for (let row = 1; row < rows; row++) {
            this._gridGraphics.moveTo(0, row * this._cellSize,)
            this._gridGraphics.lineTo(
                width,
                row * this._cellSize,
            );
        }


        for (let column = 0; column < columns; column++) {
            for (let row = 0; row < rows; row++) {
                this._gridNodes.push(new PIXI.Point(column * this._cellSize, row * this._cellSize))
            }
        }

        this._gridGraphics.endFill()
    }


    private getWindowDimensions(): Dimensions {
        const width = this._root.getBoundingClientRect().width ?? 0;
        const height = this._root.getBoundingClientRect().height ?? 0;

        return {
            width,
            height,
        };
    }


    private drawTestRect() {
        const rectGraphics = new DraggableRect(this._gridNodes, new PIXI.Point(100, 200))
        this._treeObjects.push(rectGraphics)
        this._treeContainer.addChild(rectGraphics)
        rectGraphics.on("newLineStart", this.newLineStart)
        rectGraphics.on("newLineEnd", this.newLineEnd)
        rectGraphics.on("newLineMove", this.newLineMove)

        const rectGraphics2 = new DraggableRect(this._gridNodes, new PIXI.Point(300, 300))
        this._treeObjects.push(rectGraphics2)
        this._treeContainer.addChild(rectGraphics2)
        rectGraphics2.on("newLineStart", this.newLineStart)
        rectGraphics2.on("newLineEnd", this.newLineEnd)
        rectGraphics2.on("newLineMove", this.newLineMove)
    }
    
    
    private newLineStart(point: PIXI.Point) {
        console.log(point)
        this._lineInProgress = new PIXI.Graphics()
        this._lineInProgressAnchor = point.clone()
        this._treeContainer.addChild(this._lineInProgress)
  
    }

    private newLineEnd(point: PIXI.Point) {
        console.log(point)
        this._lineInProgress = null
        this._lineInProgressAnchor = null
    }
    private newLineMove(point: PIXI.Point) {
        this._lineInProgress?.clear()
        this._lineInProgress!.beginFill(0xFFffffff, 0)
        this._lineInProgress?.lineStyle(5, 0xFF0000)
        this._lineInProgress?.moveTo(this._lineInProgressAnchor!.x, this._lineInProgressAnchor!.y)
        const middle = new PIXI.Point((point.x + this._lineInProgressAnchor!.x)/2 + 10, (point.y + this._lineInProgressAnchor!.y)/2 + 10)
        this._lineInProgress?.quadraticCurveTo(middle.x, middle.y, point.x, point.y)

    
        this._lineInProgress!.endFill()
    }
}

export { View };
