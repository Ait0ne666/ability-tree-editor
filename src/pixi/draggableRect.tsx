import { gsap } from 'gsap'
import * as PIXI from 'pixi.js'
import { Point } from 'pixi.js'
import { distanceBetweenPoints } from '../utils'
import { AnchorPoint } from './anchor-point'


class DraggableRect extends PIXI.Graphics {
    private _data: any
    private _dragging: boolean = false
    private _pointerOffset: {
        x: number,
        y: number
    } | null = null
    private _nodes: PIXI.Point[]
    private _anchor: PIXI.Point | null = null
    private _position: PIXI.Point
    private _selected: boolean = false
    private _size = 100

    constructor(nodes: PIXI.Point[], position: PIXI.Point) {
        super()
        this._position = position;
        this._nodes = nodes
        this.interactive = true
        this.buttonMode = true
        this.on('pointerdown', this.onDragStart)
            .on('pointerup', this.onDragEnd)
            .on('pointerupoutside', this.onDragEnd)
            .on('pointermove', this.onDragMove);
        this.lineStyle(0, 0x0000ff)
        this.beginFill(0x0000ff, 1)
        this.drawRect(
            this._position.x,
            this._position.y,
            100,
            100,
        )
        this.x = this._position.x
        this.y = this._position.y


        const circleTopLeftGraphics = new AnchorPoint(this._position)
        circleTopLeftGraphics.on("newLineStart", (pos) => {
            this.emit("newLineStart", pos)
        })

        .on("newLineMove", (pos) => {
            console.log("Move")
            console.log(this._position)
            this.emit("newLineMove", pos)
        })

        .on("newLineEnd", (pos) => {
            console.log('end')
            this.emit("newLineEnd", pos)
        })


        const circleTopRightGraphics = new AnchorPoint(new Point(this._position.x + this._size,
            this._position.y))

        const circleBottomLeftGraphics = new AnchorPoint(new Point(this._position.x,
            this._position.y + this._size))



        const circleBottomRightGraphics = new AnchorPoint(new Point(this._position.x + this._size,
            this._position.y + this._size))




        this.addChild(circleTopLeftGraphics, circleTopRightGraphics, circleBottomRightGraphics, circleBottomLeftGraphics)


        
    }




    setSelected(value: boolean) {
        this._selected = value
    }


    private onDragStart(event: any) {
        this._data = event.data;
        this.alpha = 0.5;
        this._dragging = true;
        const pointerPosition = this._data.getLocalPosition(this.parent)
        this._pointerOffset = { x: pointerPosition.x - this.x, y: pointerPosition.y - this.y };

    }

    private onDragEnd() {
        this.alpha = 1;
        this._dragging = false;
        this._data = null;
        this._pointerOffset = null



        this._anchor = this.getNearestNode()
        const pull = this.globalToLocal(this._anchor)
        gsap.to(this, {
            duration: 0.3,
            x: pull.x,
            y: pull.y
        })

        this._anchor = null

    }

    private onDragMove() {
     
        if (this._dragging && this._pointerOffset) {
            const newPosition = this._data.getLocalPosition(this.parent);
            this.x = newPosition.x - this._pointerOffset.x;
            this.y = newPosition.y - this._pointerOffset.y;
        }
    }



    private getNearestNode() {
        const origin = new Point(this.getBounds().x, this.getBounds().y)
        let nearest = this._nodes[0]
        let currentMinDistance = distanceBetweenPoints(nearest, origin)

        for (let i = 1; i < this._nodes.length; i++) {
            let point = this._nodes[i]

            let distance = distanceBetweenPoints(point, origin)

            if (distance < currentMinDistance) {
                currentMinDistance = distance
                nearest = point
            }

        }


        return nearest
    }


    private globalToLocal = (point: PIXI.Point) => {
        return new Point(point.x - this._position.x, point.y - this._position.y)
    }



}



export { DraggableRect }