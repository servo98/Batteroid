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

    update(input) {
        
        
    }

    draw(ctx) {
        if(!this.ready)
            return
        super.draw(ctx, this.images[this.imageId])

        
    }


}