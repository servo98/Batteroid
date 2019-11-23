import MapObject from './MapObject.js'
export default class InterfaceObject extends MapObject{
    constructor( x, y, imageId = 0, width = 64, height = 64){
        super( x, y, imageId, width, height)
        this.originalX = x
        this.originalY = y
    }

}