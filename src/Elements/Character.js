import MapObject from './MapObject.js'
import {loadImage} from '../Utils/Loader.js'
import {iso2car, car2iso} from '../Utils/Converter.js'

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
        this.availableTiles = []
        this.availableTilesObject = []
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
        if(this.selected){
            let arregloTmp = []
            this.availableTiles.forEach((availableTile) => {
                let convertidas = iso2car(availableTile.x, availableTile.y)
                arregloTmp.push({x: convertidas.x*64-32, y: convertidas.y*64 -24})
            })
            this.availableTilesObject = arregloTmp
        }else{
            this.availableTilesObject = []
        }
            
        
    }

    drawAvailable(ctx) {
        this.availableTilesObject.forEach(tile => {
            ctx.drawImage(this.images[9], tile.x, tile.y+24, 64, 32)
        })
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

    calculateAvailable() {
        let temparray = []
        let convertidas = car2iso(this.x/64, this.y/64)
        let currentCoords = {
            x: Math.floor(convertidas.x)+2,
            y: Math.floor(convertidas.y)+1
        }
        // console.log(currentCoords)
        this.availableMoves.forEach((availableMove) => {
            let tmpCoord = {x: currentCoords.x+availableMove.x, y: currentCoords.y+availableMove.y}
            if(tmpCoord.x >= 0 && tmpCoord.x < 10 && tmpCoord.y >= 0 && tmpCoord.y < 10)
                temparray.push(tmpCoord)
        })
        this.availableTiles = temparray

        // if(currentCoords.x >= 0 && currentCoords.x < this.tiles[0].length && currentCoords.y >= 0 && currentCoords.y < this.tiles.length){

        // }
    }

    isValidTarget(cords) {
        let result = false
        this.availableTiles.forEach(tile => {
            if(tile.x == cords.x && tile.y == cords.y){
                result = true
                return
            }
        })
        return result
    }


}