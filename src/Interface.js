import {MapObject} from './MapObject.js' 
import {Loader} from './Loader.js'
export default class Interface {
    constructor() {
        this.ready = false
        this.cursor  = new MapObject(100, 100, 0)
        this.images = []
        this.loader = new Loader()
    }

    load() {
        let imagesRoutes = []
        imagesRoutes.push(this.loader.loadImage('resources/interface/cursor.png'))
        Promise.all(imagesRoutes).then( (values) => {
            this.images.push(...values)
            this.ready = true
            console.log('All Images of Interface are loaded')
        })
    }

    draw(ctx) {
        if(!this.ready)
            return
        this.cursor.x -= this.images[this.cursor.imageId].width
        this.cursor.y -= this.images[this.cursor.imageId].height
        this.cursor.draw(ctx, this.images[this.cursor.imageId])
    } 
}