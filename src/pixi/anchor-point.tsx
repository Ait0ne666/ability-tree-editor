import * as PIXI from 'pixi.js'


class AnchorPoint extends PIXI.Graphics {
    private _data: PIXI.InteractionData | null = null
    private _dragging: boolean = false
    private _pointerOffset: {
        x: number,
        y: number
    } | null = null
    private _position: PIXI.Point
    private _radius = 4

    constructor(position: PIXI.Point) {
        super()
        this.interactive = true
        this.buttonMode = true
        this.on('pointerdown', this.onDragStart)
            .on('pointerup', this.onDragEnd)
            .on('pointerupoutside', this.onDragEnd)
            .on('pointermove', this.onDragMove);
        this._position = position


        this.lineStyle(1, 0x000000)
        this.beginFill(0xffffff, 1)
        this.drawCircle(
            this._position.x,
            this._position.y,
            this._radius)

    }



    private onDragStart(event: PIXI.InteractionEvent) {
        event.stopPropagation()
        this._dragging = true
        this._data = event.data;
        this.emit("newLineStart", this._data.global)
        
    }

    private onDragEnd(event: PIXI.InteractionEvent) {
        
        this._dragging = false
        // event.stopPropagation()
        this.emit("newLineEnd", event.data.global)

    }

    private onDragMove(event: PIXI.InteractionEvent) {
        console.log(this._dragging)
        // event.stopPropagation()
        if (this._dragging) {
            this.emit("newLineMove", event.data.global)
        }
    }


}



export { AnchorPoint }