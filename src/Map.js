import {Tile} from './Tile.js'
import {Loader} from './Loader.js'


export class Map {
    constructor(width, height) {

        this.ready = false

        this.width = width
        this.height = height
        this.tiles = []
        this.images = []
        this.loader = new Loader()
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
        imagesRoutes.push(this.loader.loadImage('resources/purple.png'))
        imagesRoutes.push(this.loader.loadImage('resources/yellow.png'))
        imagesRoutes.push(this.loader.loadImage('resources/red.png'))
        imagesRoutes.push(this.loader.loadImage('resources/green.png'))
        Promise.all(imagesRoutes).then( (values) => {
            this.images.push(...values)
            this.ready = true
            console.log('All Images loaded')
        })
    }

    init() {
        for(let y = 0; y < this.height; y++){
            let row = []
            for(let x = 0; x < this.width; x++){
                let convertidas = this.iso2car(x, y)
                row.push(new Tile('01', null,  convertidas.x*64 - 32, convertidas.y*64, Math.floor(Math.random() * 3)+1))
            }
            this.tiles.push(row)
        }
    }

    draw(ctx, camera) {
        if(!this.ready)
            return
        this.tiles.forEach((row) => {
            row.forEach((tile) => {
                if(tile.x >= camera.x - camera.offset &&
                    tile.x <= camera.x + camera.width + camera.offset &&
                    tile.y >= camera.y - camera.offset&&
                    tile.y <= camera.y + camera.height + camera.offset){
                    tile.draw(ctx, this.images[tile.imageId])
                }
            })
        })
    }
}