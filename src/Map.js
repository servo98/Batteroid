import {Tile} from './Tile.js'
import {Loader} from './Loader.js'

export class Map {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.tiles = []
        this.init()
        this.images = []
        this.loader = new Loader()
    }
    load() {
        let imagesRoutes = []
        imagesRoutes.push(this.loader.loadImage('resources/purple.png'))
        imagesRoutes.push(this.loader.loadImage('resources/yellow.png'))
        imagesRoutes.push(this.loader.loadImage('resources/red.png'))
        imagesRoutes.push(this.loader.loadImage('resources/green.png'))
        Promise.all(imagesRoutes).then( (values) => {
            this.images.push(...values)
            console.log('All Images loaded')
        })
    }

    init() {
        for(let y = 0; y < this.height; y++){
            let row = []
            for(let x = 0; x < this.width; x++){
                row.push(new Tile('01', null, 0, 0, 0))
            }
            this.tiles.push(row)
        }
    }

    draw(ctx) {
        this.tiles.forEach((row) => {
            row.forEach((tile) => {
                tile.draw(ctx)
            })
        })
    }
}