import MapObject from './MapObject.js' 
import {loadImage} from '../Utils/Loader.js'
import InterfaceObject from './InterfaceObject.js'
export default class Interface {
    constructor() {
        this.ready = false
        this.cursor  = new MapObject(100, 100, 0, 31, 31)
        this.images = []
        this.playerFrames = []
        this.elements = []
        this.load()
        this.firstClick = true
    }

    load() {
        let imagesRoutes = []
        imagesRoutes.push(loadImage('resources/interface/cursor.png'))
        imagesRoutes.push(loadImage('resources/interface/playerFrame.png'))
        imagesRoutes.push(loadImage('resources/interface/add.png'))
        imagesRoutes.push(loadImage('resources/interface/title.png'))
        imagesRoutes.push(loadImage('resources/interface/topYellow.png'))
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
            if(input.leftClick && this.firstClick) {
                if(element.isClicked(input, camera) && element.handler){
                    element.handler()
                }
            } 
            element.update(input, camera)
        })

        this.firstClick = !input.leftClick

    }

    draw(ctx) {
        if(!this.ready)
            return
        this.cursor.x -= this.images[this.cursor.imageId].width/2
        this.cursor.y -= this.images[this.cursor.imageId].height/2
        this.elements.forEach(element => {
            element.draw(ctx, this.images[element.imageId])
        })
        this.cursor.draw(ctx, this.images[this.cursor.imageId])
    } 

    addElement(x, y, width, height, imageId, text = '', handler = undefined) {
        this.elements.push(new InterfaceObject(x, y, imageId, width, height, text, handler))
    }
}