import Timer  from '../Utils/Timer.js'
import Map from '../Elements/Map.js'
import Interface from '../Elements/Interface.js'
import Input from '../Utils/Input.js'
import Camera from './Camera.js'

import {car2iso} from '../Utils/Converter.js'


export default class Render extends Timer{
    constructor(fps, canvasId) {
        super(fps)

        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext('2d')
        
        this.elemets = []
        this.map = new Map(10,10)
        this.interface = new Interface()
        this.input = new Input()
        this.camera = new Camera(-window.innerWidth/2, -window.innerHeight/2)

        this.camera.width = this.canvas.width = window.innerWidth
        this.camera.height = this.canvas.height = window.innerHeight
        this.ctx.translate(this.camera.width / 2 ,this.camera.height / 2)
        window.onresize = () => {
            this.camera.width = this.canvas.width = window.innerWidth
            this.camera.height = this.canvas.height = window.innerHeight
            this.ctx.translate(-this.camera.x , -this.camera.y)
        }
        
    }

    load() {
        this.elemets.forEach((element => element.load()))
    }

    render(newTime) {
        super.loop(newTime)
        requestAnimationFrame(this.render.bind(this));
        if(this.pause)
            return


        //UPDATE
        this.update()

        

        

        if (this.elapsed > this.fpsInterval) {
            this.then = this.now - ( this.elapsed %  this.fpsInterval)


            //CLEAR
            this.clear()

            //DRAW
            this.draw()



            let convertidas = car2iso((this.input.mouseX+this.camera.x)/64, (this.input.mouseY+this.camera.y)/64)
            let currentCoords = {
                x: Math.floor(convertidas.x),
                y: Math.floor(convertidas.y)
            }
            // if(currentCoords.x >= 0 && currentCoords.x < this.map.tiles[0].length && currentCoords.y >= 0 && currentCoords.y < this.map.tiles.length){
            //     this.map.tiles[currentCoords.y][currentCoords.x].hide = true
            // }


            // this.map.draw(this.ctx, this.camera)


            this.ctx.textAlign = 'right'
            this.ctx.font = "24px Arial"
            this.ctx.textBaseline = 'top'
            this.ctx.fillStyle = 'white'
            // if(currentCoords.x >= 0 && currentCoords.x < this.map.tiles[0].length && currentCoords.y >= 0 && currentCoords.y < this.map.tiles.length){
                this.ctx.fillText('X: '+currentCoords.x+ 'Y:'+currentCoords.y,  this.camera.x+this.camera.width, this.camera.y)   
            // }


            this.ctx.textBaseline = 'bottom'
            this.ctx.fillText(this.getFPSCount()+"   FPS", this.camera.x+this.camera.width, this.camera.y+this.camera.height);
            
            // this.ctx.fillRect(0,0, 10, 10)
            // if(currentCoords.x >= 0 && currentCoords.x < this.map.tiles[0].length && currentCoords.y >= 0 && currentCoords.y < this.map.tiles.length){
            //     this.map.tiles[currentCoords.y][currentCoords.x].hide = false
            // }


            // console.log(this.camera.x, this.camera.y)
            // this.interface.draw(this.ctx)
            // console.log((this.framesNumber()/1000).toFixed(2))
            
        }
    }

    getFPSCount() {
        return Math.round(1000 / (this.framesNumber() / ++this.frameCount) * 100) / 100;
    }

    update() {

        
        

        this.camera.update(this.input)
        this.elemets.forEach(element => element.update(this.input, this.camera))
    }
    clear() {
        this.ctx.save()
        this.ctx.setTransform(1, 0, 0, 1, 0, 0)
        this.ctx.clearRect(0, 0, this.camera.width, this.camera.height)  
        this.ctx.fillStyle = this.camera.backGroundColor
        this.ctx.fillRect(0, 0, this.camera.width, this.camera.height)
        this.ctx.restore()
    }
    draw() {
        this.camera.draw(this.ctx)
        this.elemets.forEach(element => element.draw(this.ctx, this.camera))
    }

    addElement(element) {
        this.elemets.push(element)
    }

}