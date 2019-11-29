import MapObject from './MapObject.js'
import {loadImage} from '../Utils/Loader.js'
import {iso2car} from '../Utils/Converter.js'

export default class Character extends MapObject{
    constructor(x, y, imageId = 0) {
        let convertidas = iso2car(x, y)
        // console.log(convertidas.x*64-32, convertidas.y*64)
        super(convertidas.x*64-32, convertidas.y*64 -24, imageId, 64, 64)
        this.ready = false
        // this.x = convertidas.x*64-32
        // this.y = convertidas.y*64 -24
        this.imageId = imageId
        this.images = []
        this.projectiles = []
        this.isShooting = false
        this.load()
        this.health = 100
    }

    load() {
        let imagesRoutes = []
        imagesRoutes.push(loadImage('resources/entity1.png'))
        imagesRoutes.push(loadImage('resources/entity2.png'))
        Promise.all(imagesRoutes).then( (values) => {
            this.images.push(...values)
            this.ready = true
            console.log('All Images of Character are loaded')
        })
    }

    update(input) {
        
        
    }

    draw(ctx) {
        if(!this.ready)
            return
        ctx.save()
        ctx.fillStyle = "rgb(244, 87, 79)"
        ctx.fillRect(this.x+(this.width/2)-50, this.y-10, 100, 3)
        ctx.fillStyle = "rgb(117, 196, 107)"
        ctx.fillRect(this.x+(this.width/2)-50, this.y-10, this.health, 3)
        ctx.restore()
        super.draw(ctx, this.images[this.imageId])
        
    }


}