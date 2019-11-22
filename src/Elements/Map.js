import Tile from './Tile.js'
import loadImage from '../Utils/Loader.js'
import Character from './Character.js'


export default class Map {
    constructor(width, height) {

        this.ready = false
        this.width = width
        this.height = height
        this.tiles = []
        this.images = []
        this.characters = []
        this.init()
    }

    iso2car(x, y) {
        return {
            x: (x - y)/2,
            y: (x + y) / 4
        };
    }
    
    car2iso(x, y){
        return {
            x: x + (2*y),
            y: (2*y) - x
        };
    }

    load() {
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

    init() {
        for(let y = 0; y < this.height; y++){
            let row = []
            for(let x = 0; x < this.width; x++){
                let convertidas = this.iso2car(x, y)
                row.push(new Tile(convertidas.x*64 - 32, convertidas.y*64, Math.floor(Math.random() * 3)+1))
            }
            this.tiles.push(row)
        }
        let convertidasCharacter = this.iso2car(0, 0)
        this.characters.push(new Character(convertidasCharacter.x*64 - 32, convertidasCharacter.y* 64))
        convertidasCharacter = this.iso2car(3, 4)
        this.characters.push(new Character(convertidasCharacter.x*64 - 32, convertidasCharacter.y* 64))
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
                character.draw(ctx)
        })
    }
}