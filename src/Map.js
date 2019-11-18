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
        console.log(-camera.width/2, camera.width/2)
        if(!this.ready)
            return
        this.tiles.forEach((row) => {
            row.forEach((tile) => {

                // let convertidas = this.iso2car(tile.x, tile.y)
                //     ctx.drawImage(images[tile], convertidas.x*64, convertidas.y*64 - z*32);
                if(tile.x >= -camera.width/2 - camera.x &&
                    tile.x <= camera.width/2 - camera.x - 100 &&
                    tile.y >= -camera.height/2 - camera.y &&
                    tile.y <= camera.height/2 - camera.y - 100){
                    tile.draw(ctx, this.images[tile.imageId])
                }
            })
        })
    }
}