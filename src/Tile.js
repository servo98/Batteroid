import {MapObject} from './MapObject.js'
export class Tile extends MapObject{
    constructor(id, name, x, y, imageId) {
        super('tile:'+id, name, x, y, imageId)
    }

    
    
}