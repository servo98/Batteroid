import Timer  from './Timer.js'
import {Map} from './Map.js'
import {Input} from './Input.js'
import {Camera} from './Camera.js'
const BACK_GROUND_COLOR = 'rgba(61, 61, 61,1.0)'


export class Render extends Timer{
    constructor(fps, canvasId) {
        super(fps)

        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext('2d')
        
        
        this.map = new Map(1000,1000)
        this.input = new Input()
        this.camera = new Camera(0, 0)

        this.camera.width = this.canvas.width = window.innerWidth
        this.camera.height = this.canvas.height = window.innerHeight
        this.ctx.translate(this.camera.width / 2 ,this.camera.height / 2)
        window.onresize = () => {
            this.camera.width = this.canvas.width = window.innerWidth
            this.camera.height = this.canvas.height = window.innerHeight
            this.ctx.translate((this.camera.width / 2)+this.camera.x , (this.camera.height / 2)+this.camera.y)
        }
        this.map.load()
        
    }


    render(newTime) {
        super.loop(newTime)
        requestAnimationFrame(this.render.bind(this));
        if(this.pause)
            return
        //INPUT
        // processInput()
        //UPDATE
        // update() 

        if (this.elapsed > this.fpsInterval) {
            this.then = this.now - ( this.elapsed %  this.fpsInterval)


            //CLEAR
            this.ctx.save()
            this.ctx.setTransform(1, 0, 0, 1, 0, 0)
            // this.ctx.clearRect(0, 0, this.camera.width, this.camera.height)  
            this.ctx.fillStyle = BACK_GROUND_COLOR
            this.ctx.fillRect(0, 0, this.camera.width, this.camera.height)
            this.ctx.restore()

            
            let convertidas = this.map.car2iso((this.input.mouseX-this.canvas.width/2-this.camera.x)/64, (this.input.mouseY-this.canvas.height/2-this.camera.y)/64)
            let currentCoords = {
                x: Math.floor(convertidas.x),
                y: Math.floor(convertidas.y)
            }
            // if(currentCoords.x >= 0 && currentCoords.x < this.map.tiles[0].length && currentCoords.y >= 0 && currentCoords.y < this.map.tiles.length){
            //     this.map.tiles[currentCoords.y][currentCoords.x].hide = true
            // }


            this.map.draw(this.ctx, this.camera)


            this.ctx.textAlign = 'right'
            this.ctx.font = "24px Arial"
            this.ctx.textBaseline = 'top'
            this.ctx.fillStyle = 'white'
            if(currentCoords.x >= 0 && currentCoords.x < this.map.tiles[0].length && currentCoords.y >= 0 && currentCoords.y < this.map.tiles.length){
                this.ctx.fillText('X: '+currentCoords.x+ 'Y:'+currentCoords.y, this.canvas.width/2-this.camera.x, -this.canvas.height/2-this.camera.y)
                
            }
            this.ctx.textBaseline = 'bottom'
            this.ctx.fillText(this.getFPSCount()+"   FPS | OffX: "+this.camera.x+" OffY: "+this.camera.y, this.canvas.width/2-this.camera.x, this.canvas.height/2-this.camera.y);
            
            
            // if(currentCoords.x >= 0 && currentCoords.x < this.map.tiles[0].length && currentCoords.y >= 0 && currentCoords.y < this.map.tiles.length){
            //     this.map.tiles[currentCoords.y][currentCoords.x].hide = false
            // }


            // console.log(this.camera.x, this.camera.y)
            if(this.input.controls[0]){
                this.camera.moveUp()
                this.ctx.translate(0 , this.camera.speed)
            }
            if(this.input.controls[1]){
                this.camera.moveLeft()
                this.ctx.translate(this.camera.speed , 0)
            }
            if(this.input.controls[2]){
                this.camera.moveDown()
                this.ctx.translate(0 , -this.camera.speed)
            }
            if(this.input.controls[3]){
                this.camera.moveRight()
                this.ctx.translate(-this.camera.speed , 0)
            }
            
        }
    }

    getFPSCount() {
        return Math.round(1000 / (this.getTime() / ++this.frameCount) * 100) / 100;
    }

}