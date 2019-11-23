import MapObject from './MapObject.js'
import loadImage from '../Utils/Loader.js'
import {KEYS} from '../Utils/Input.js'
import Projectile from './Projectile.js'
export default class Character extends MapObject{
    constructor(x, y, imageId = 0) {
        super(x, y, imageId, 64, 64)
        this.ready = false
        this.x = x
        this.y = y-24
        this.imageId = imageId
        this.images = []
        this.projectiles = []
        this.isShooting = false
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
        if(input.keys[KEYS.SPACE] && !this.isShooting){
            this.isShooting = true
            this.projectiles.push(new Projectile(this.x+this.width/2, this.y+this.height/2, 100, 0, 0, 13, 13))
        }
        this.projectiles.forEach(((projectile, index) => {
            projectile.update()
            if(projectile.hit){
                this.projectiles.splice(index, 1)
                this.isShooting = false
            }
        }))
    }

    draw(ctx, camera) {
        if(!this.ready)
            return
        super.draw(ctx, this.images[this.imageId])

        this.projectiles.forEach((projectile => {
            if(camera.isInside(projectile))
                projectile.draw(ctx)
        }))
    }


}