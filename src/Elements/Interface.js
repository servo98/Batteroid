import MapObject from './MapObject.js' 
import loadImage from '../Utils/Loader.js'
import InterfaceObject from './InterfaceObject.js'
export default class Interface {
    constructor() {
        this.ready = false
        this.cursor  = new MapObject(100, 100, 0, 31, 31)
        this.images = []
        this.playerFrames = []
        this.elements = []
        this.load()
    }

    load() {
        let imagesRoutes = []
        imagesRoutes.push(loadImage('resources/interface/cursor.png'))
        imagesRoutes.push(loadImage('resources/interface/playerFrame.png'))
        imagesRoutes.push(loadImage('resources/interface/add.png'))
        Promise.all(imagesRoutes).then( (values) => {
            this.images.push(...values)
            this.ready = true
            console.log('All Images of Interface are loaded')
        })
    }

    update(input, camera) {
        this.cursor.x = input.mouseX + camera.x 
        this.cursor.y = input.mouseY + camera.y
        this.elements.forEach(element => {
            // element.update(input, camera)
            element.x = camera.x+element.originalX
            element.y = camera.y+element.originalY
        })

    }

    draw(ctx) {
        if(!this.ready)
            return
        this.cursor.x -= this.images[this.cursor.imageId].width/2
        this.cursor.y -= this.images[this.cursor.imageId].height/2

        // ctx.save()
        // ctx.globalAlpha = 0.2
        // ctx.fillStyle = '#4DFF3C'
        // console.log(this.selector.x, this.selector.y, this.selector.x+this.selector.x2, this.selector.y+this.selector.y2)
        // ctx.fillRect(this.selector.x, this.selector.y, this.selector.x+this.selector.x2, this.selector.y+this.selector.y2)
        // ctx.restore()
        this.elements.forEach(element => {
            element.draw(ctx, this.images[element.imageId])
        })
        this.cursor.draw(ctx, this.images[this.cursor.imageId])
    } 

    addElement(x, y, width, height, imageId) {
        this.elements.push(new InterfaceObject(x, y, imageId, width, height))
    }
}