import MapObject from './MapObject.js'
import loadImage from '../Utils/Loader.js'
export default class Projectile extends MapObject{
    constructor(x, y, xDest, yDest, imageId = 0, width = 64, height = 64) {
        super(x, y, imageId, width, height)
        this.originX = x
        this.originY = -y
        this.xDest = xDest
        this.yDest = yDest
        this.speed = 30
        this.initialTime = window.performance.now()
        this.images = []
        this.ready = false
        this.hit = false
        this.load()
    }

    load() {
        let imagesRoutes = []
        imagesRoutes.push(loadImage('resources/projectile.png'))
        Promise.all(imagesRoutes).then( (values) => {
            this.images.push(...values)
            this.ready = true
            console.log('All Images of Projectile loaded are loaded')
        })
    }

    update() {
        // console.log((window.performance.now()-this.initialTime)/1000)
        // console.log(this.x, this.y)
        this.calulateCoords()
    }

    draw(ctx) {
        if(!this.ready)
            return
        super.draw(ctx, this.images[this.imageId])
    }

    calulateCoords() {
        let currentTime = (window.performance.now()-this.initialTime)/1000
        this.y = this.originY+(this.speed*Math.sin(0.785398))*currentTime+(-10*currentTime*currentTime/2)
        this.x = currentTime*this.speed*Math.cos(0.785398)
    }
}