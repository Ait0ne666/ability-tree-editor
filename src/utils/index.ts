import * as PIXI from 'pixi.js'

const distanceBetweenPoints = (first: PIXI.Point, second: PIXI.Point): number => {

    return Math.sqrt((first.x - second.x)*(first.x - second.x) + (first.y - second.y)*(first.y - second.y))
}


export {distanceBetweenPoints}