import MapObject from './MapObject.js'
import loadImage from '../Utils/Loader.js'
export default class Character extends MapObject{
    constructor(x, y, imageId = 0) {
        super(x, y, imageId, 64, 64)
        this.ready = false
        this.x = x
        this.y = y-24
        this.imageId = imageId
        this.images = []
    }

    load() {
        let imagesRoutes = []
        imagesRoutes.push(loadImage('resources/entity.png'))
        Promise.all(imagesRoutes).then( (values) => {
            this.images.push(...values)
            this.ready = true
            console.log('All Images of Character are loaded')
        })
    }

    draw(ctx) {
        if(!this.ready)
            return
        super.draw(ctx, this.images[this.imageId])
    }


}