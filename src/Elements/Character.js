import MapObject from './MapObject.js'
import {loadImage} from '../Utils/Loader.js'
import {iso2car} from '../Utils/Converter.js'

export default class Character extends MapObject{
    constructor(x, y, imageId = 0, id, playerName, availableMoves) {
        let convertidas = iso2car(x, y)
        super(convertidas.x*64-32, convertidas.y*64 -24, imageId, 64, 64)
        this.ready = false
        this.imageId = imageId
        this.images = []
        this.projectiles = []
        this.isShooting = false
        this.health = 50
        this.canMove = false
        this.canShoot = false
        this.id = id
        this.playerName = playerName
        this.availableMoves = availableMoves
        this.selected = false
        this.load()
    }

    load() {
        let imagesRoutes = []
        imagesRoutes.push(loadImage('resources/entity1_0.png'))
        imagesRoutes.push(loadImage('resources/entity1_1.png'))
        imagesRoutes.push(loadImage('resources/entity1_2.png'))
        imagesRoutes.push(loadImage('resources/entity1_3.png'))
        imagesRoutes.push(loadImage('resources/entity2_0.png'))
        imagesRoutes.push(loadImage('resources/entity2_1.png'))
        imagesRoutes.push(loadImage('resources/entity2_2.png'))
        imagesRoutes.push(loadImage('resources/entity2_3.png'))
        imagesRoutes.push(loadImage('resources/interface/topYellow.png'))
        imagesRoutes.push(loadImage('resources/interface/topGreen.png'))
        imagesRoutes.push(loadImage('resources/interface/topRed.png'))
        Promise.all(imagesRoutes).then( (values) => {
            this.images.push(...values)
            this.ready = true
            console.log('All Images of Character are loaded')
        })
    }

    update(input, camera) {
        
    }

    draw(ctx) {
        if(!this.ready)
            return
        
        if(this.canMove && this.canShoot) {
            ctx.drawImage(this.images[8], this.x, this.y+24, 64, 32)
        }else {
            ctx.drawImage(this.images[10], this.x, this.y+24, 64, 32)
        }
        if(this.selected){
            ctx.drawImage(this.images[9], this.x, this.y+24, 64, 32)

            //Draw under
            //DRAW availables moves
            // console.log(this.availableMoves)
        }

        if(this.health < 50) {
            ctx.save()
            ctx.fillStyle = "rgb(244, 87, 79)"
            ctx.fillRect(this.x+(this.width/2)-25, this.y-10, 50, 3)
            ctx.fillStyle = "rgb(117, 196, 107)"
            ctx.fillRect(this.x+(this.width/2)-25, this.y-10, this.health, 3)
            ctx.restore()
        }
        super.draw(ctx, this.images[this.imageId])
        
    }

    isDead() {
        return this.health <= 0
    }

    moveTo(x, y) {
        if(this.canMove){
            this.x = x
            this.y = y
        }
        this.canMove = false
    }

    shoot(target){
        if(this.canShoot){
            target.health -= 10
        }
        this.canShoot = false

    }


}