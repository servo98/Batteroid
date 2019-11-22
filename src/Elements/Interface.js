import MapObject from './MapObject.js' 
import loadImage from '../Utils/Loader.js'
export default class Interface {
    constructor() {
        this.ready = false
        this.cursor  = new MapObject(100, 100, 0, 31, 31)
        this.images = []
    }

    load() {
        let imagesRoutes = []
        imagesRoutes.push(loadImage('resources/interface/cursor.png'))
        Promise.all(imagesRoutes).then( (values) => {
            this.images.push(...values)
            this.ready = true
            console.log('All Images of Interface are loaded')
        })
    }

    update(input, camera) {
        this.cursor.x = input.mouseX + camera.x 
        this.cursor.y = input.mouseY + camera.y
    }

    draw(ctx) {
        if(!this.ready)
            return
        this.cursor.x -= this.images[this.cursor.imageId].width/2
        this.cursor.y -= this.images[this.cursor.imageId].height/2
        this.cursor.draw(ctx, this.images[this.cursor.imageId])
    } 
}