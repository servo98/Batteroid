import Tile from './Tile.js'
import {loadImage} from '../Utils/Loader.js'
import {iso2car, car2iso} from '../Utils/Converter.js'
import {KEYS} from '../Utils/Input.js'
import Projectile from './Projectile.js'

export default class Map {
    constructor(width, height) {
        this.ready = false
        this.width = width
        this.height = height
        this.tiles = []
        this.images = []
        this.characters = []
        this.projectiles = []
        this.load()
    }

    load() {


        for(let y = 0; y < this.height; y++){
            let row = []
            for(let x = 0; x < this.width; x++){
                let convertidas = iso2car(x, y)
                row.push(new Tile(convertidas.x*64 - 32, convertidas.y*64, Math.floor(Math.random() * 3)+1))
            }
            this.tiles.push(row)
        }

        // let convertidasCharacter = iso2car(5, 0)
        // this.characters.push(new Character(5, 0))
        // convertidasCharacter = iso2car(7, 4)
        // this.characters.push(new Character(convertidasCharacter.x*64 - 32, convertidasCharacter.y* 64))
        // convertidasCharacter = iso2car(4, 4)
        // this.characters.push(new Character(convertidasCharacter.x*64 - 32, convertidasCharacter.y* 64))
        // convertidasCharacter = iso2car(7, 1)
        // this.characters.push(new Character(convertidasCharacter.x*64 - 32, convertidasCharacter.y* 64))
        // convertidasCharacter = iso2car(3, 1)
        // this.characters.push(new Character(convertidasCharacter.x*64 - 32, convertidasCharacter.y* 64))
        // convertidasCharacter = iso2car(4, 9)
        // this.characters.push(new Character(convertidasCharacter.x*64 - 32, convertidasCharacter.y* 64))


        let imagesRoutes = []
        imagesRoutes.push(loadImage('resources/purple.png'))
        imagesRoutes.push(loadImage('resources/yellow.png'))
        imagesRoutes.push(loadImage('resources/red.png'))
        imagesRoutes.push(loadImage('resources/green.png'))
        Promise.all(imagesRoutes).then( (values) => {
            this.images.push(...values)
            this.ready = true
            console.log('All Images of Tiles are loaded')
        })
        this.characters.forEach(character => {
            character.load()
        })
    }

    update(input, camera){
        // console.log(this.characters.length)
        if(input.keys[KEYS.SPACE] && !this.isShooting){
            this.isShooting = true
            this.projectiles.push(new Projectile(0, 0, 700, 0, 0, 13, 13))
        }
        this.characters.forEach((character) => {
            character.update(input)
        })
        this.projectiles.forEach(((projectile, index) => {
            projectile.update()
            if(projectile.hit){
                this.projectiles.splice(index, 1)
                this.isShooting = false
            }
        }))
        
        let convertidas = car2iso((input.mouseX+camera.x)/64, (input.mouseY+camera.y)/64)
        let currentCoords = {
            x: Math.floor(convertidas.x),
            y: Math.floor(convertidas.y)
        }

        if(currentCoords.x >= 0 && currentCoords.x < this.tiles[0].length && currentCoords.y >= 0 && currentCoords.y < this.tiles.length){
            this.tiles[currentCoords.y][currentCoords.x].hide = true
        }
        


    }

    draw(ctx, camera) {
        if(!this.ready)
            return
        this.tiles.forEach((row) => {
            row.forEach((tile) => {
                if(camera.isInside(tile))
                    tile.draw(ctx, this.images[tile.imageId])
            })
        })
        
        this.characters.forEach(character => {
            if(camera.isInside(character))
            character.draw(ctx, camera)
        })
        
        this.projectiles.forEach((projectile => {
            if(camera.isInside(projectile))
            projectile.draw(ctx)
        }))
    }
    

    addCharacter(character) {
        this.characters.push(character)
    }
}