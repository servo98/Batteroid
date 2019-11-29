import Tile from './Tile.js'
import {loadImage} from '../Utils/Loader.js'
import {iso2car, car2iso} from '../Utils/Converter.js'
import {KEYS} from '../Utils/Input.js'
import Projectile from './Projectile.js'
import playAudio from '../Audio/AudioManagement.js'

export default class Map {
    constructor(width, height,) {
        this.ready = false
        this.width = width
        this.height = height
        this.tiles = []
        this.images = []
        this.players = []
        this.projectiles = []
        this.isGameOver = false
        this.firstClick = true
        this.firstClickEvent = true
        this.coordsFrom = undefined
        this.coordsTo = undefined
        this.characters = [
            [null,null,null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null,null,null],
            [null,null,null,null,null,null,null,null,null,null]
        ]
        this.selectedCharacter = undefined
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
        
    }

    update(input, camera){
        if(input.keys[KEYS.ESC]){
            console.log('reset de seleccion')
            this.firstClick = true
        }
        
        if(input.keys[KEYS.SPACE] && !this.isShooting){
            this.isShooting = true
            playAudio('resources/sounds/launchFirst.mp3')
            this.projectiles.push(new Projectile(0, 0, 700, 0, 0, 13, 13))
        }

        // this.players.forEach((player, indexP) => {
        //     player.characters.forEach((character, indexC) => {
        //         if(!character.isDead()){
        //             character.update(input, camera)
        //         } else {
        //             player.characters.splice(indexC, 1)
        //             if(player.characters.length == 0){
        //                 this.players.splice(indexP, 1)
        //             }
        //         }
        //     })
        // })

        this.characters.forEach((row, indexY) => {
            row.forEach((character, indexX) => {
                if(character!= null){
                    if(!character.isDead()){
                        character.update(input, camera)
                    } else {
    
                        this.characters[indexY][indexX] = null
                        // if(player.characters.length == 0){
                        //     this.players.splice(indexP, 1)
                        // }
                    }
                }
            })
        })

        // if(this.players.length == 1){
        //     //GAMEOVER
        //     this.isGameOver = true
        //     console.log('GANADOR es ', this.players[0].name)
        // }
        this.projectiles.forEach(((projectile, index) => {
            projectile.update()
            if(projectile.hit){
                this.projectiles.splice(index, 1)
                this.isShooting = false
            }
        }))
        
        // let convertidas = car2iso((input.mouseX+camera.x)/64, (input.mouseY+camera.y)/64)
        // let currentCoords = {
        //     x: Math.floor(convertidas.x),
        //     y: Math.floor(convertidas.y)
        // }

        // if(currentCoords.x >= 0 && currentCoords.x < this.tiles[0].length && currentCoords.y >= 0 && currentCoords.y < this.tiles.length){
        //     this.tiles[currentCoords.y][currentCoords.x].hide = true
        // }



        if(input.leftClick && this.firstClickEvent) {
            let convertidas = car2iso((input.mouseX+camera.x)/64, (input.mouseY+camera.y)/64)
            let currentCoords = {
                x: Math.floor(convertidas.x),
                y: Math.floor(convertidas.y)
            }

            if(currentCoords.x >= 0 && currentCoords.x < this.tiles[0].length && currentCoords.y >= 0 && currentCoords.y < this.tiles.length){
                if(this.firstClick){
                    this.coordsFrom = {x:currentCoords.x, y: currentCoords.y}
                    if(this.characters[this.coordsFrom.y][this.coordsFrom.x] != null){
                        console.log(this.characters[this.coordsFrom.y][this.coordsFrom.x])
                        this.firstClick = false
                    }
                }else{
                    // if(this.characters[this.coordsFrom.y][this.coordsFrom.x] == null){
                    //     // console.log(this.characters[this.coordsFrom.y][this.coordsFrom.x])
                    //     this.firstClick = true
                    // }
                    this.coordsTo = {x:currentCoords.x, y: currentCoords.y}
                    //Si son diferentes coords
                    if(this.coordsTo.x != this.coordsFrom.x 
                        || this.coordsTo.y != this.coordsFrom.y){
                        
                            let convertidas = iso2car(this.coordsTo.x, this.coordsTo.y)
                            if(this.characters[this.coordsTo.y][this.coordsTo.x] != null){
                                this.characters[this.coordsTo.y][this.coordsTo.x].health -= 10
                                console.log('character shot another character')
                            }else{

                                    console.log('Character moved')
                                    this.characters[this.coordsFrom.y][this.coordsFrom.x].moveTo(convertidas.x*64-32, convertidas.y*64 -24)
                                    this.characters[this.coordsTo.y][this.coordsTo.x] = this.characters[this.coordsFrom.y][this.coordsFrom.x]
                                    this.characters[this.coordsFrom.y][this.coordsFrom.x] = null

                            }
                    
                    } 
                    this.firstClick  = true
                  
                    

                }
                // this.firstClick =  !this.firstClick
            }
        } 
        this.firstClickEvent = !input.leftClick

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

        this.characters.forEach((row) => {
            row.forEach((character) => {
                if(character!= null)
                    if(camera.isInside(character))
                        character.draw(ctx, camera)
            })
        })
        // this.players.forEach(player => {
        //     player.characters.forEach(character => {
        //         if(camera.isInside(character))
        //             character.draw(ctx, camera)
        //     })
        // })
        
        this.projectiles.forEach((projectile => {
            if(camera.isInside(projectile))
            projectile.draw(ctx)
        }))
    }

    getCurrentTurn() {
        // return this.players.length
        let result = {name: 'Turno de...', index: -1}
        this.players.forEach((player, index) => {
            if(player.isTurn){
                result = {name: player.name, index}
                return 
            }
        })
        // console.log(result)
        return result
    }
    
}