import Timer  from './Timer.js'
import {Map} from './Map.js'
import {Input} from './Input.js'
const canvas = document.querySelector('#main')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')
let offsetX = window.innerWidth / 2
let offsetY = window.innerHeight / 2
ctx.translate(offsetX , offsetY)
window.onresize = function(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    offsetX = window.innerWidth / 2
    offsetY = window.innerHeight / 2
    ctx.translate(offsetX , offsetY)
}


export class Render extends Timer{
    constructor(fps) {
        super(fps)
        this.map = new Map(15,15)
        this.load()
        this.input = new Input()
    }

    load() {
        this.map.load()
    }

    render(newTime) {
        super.loop(newTime)
        requestAnimationFrame(this.render.bind(this));
        //INPUT
        // processInput()
        //UPDATE
        // update() 

        // console.log(this.elapsed  > this.fpsInterval)
        if (this.elapsed > this.fpsInterval) {
            this.then = this.now - ( this.elapsed %  this.fpsInterval)


            //CLEAR
            ctx.save()
            ctx.setTransform(1, 0, 0, 1, 0, 0)
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.fillStyle = 'rgba(211, 84, 0,1.0)'
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.restore()



            ctx.textAlign = 'right';
            ctx.font = "24px Arial";
            
            ctx.textBaseline = 'top'
            let convertidas = this.map.car2iso((this.input.mouseX-canvas.width/2)/64, (this.input.mouseY-canvas.height/2)/64)
            // console.log(convertidas)
            let equis = Math.floor(convertidas.x)
            let lle  =Math.floor(convertidas.y)
            ctx.fillText('X: '+equis, 'Y:'+lle, canvas.width/2, -canvas.height/2)
            if(equis >= 0 && equis < this.map.tiles[0].length && lle >= 0 && lle < this.map.tiles.length){
                ctx.fillText('X: '+equis+', Y: '+lle, canvas.width/2, -canvas.height/2)
                this.map.tiles[lle][equis].hide = true
            }
            this.map.draw(ctx)
            if(equis >= 0 && equis < this.map.tiles[0].length && lle >= 0 && lle < this.map.tiles.length){
                this.map.tiles[lle][equis].hide = false
            }
            ctx.textBaseline = 'bottom'
            ctx.fillText(this.getFPSCount()+"   FPS", canvas.width/2, canvas.height/2);
            // console.log(this.getTime())
            // console.log(offsetX, offsetY)
            if(this.input.controls[0])
                ctx.translate(0 , -3)
            if(this.input.controls[1])
                ctx.translate(-3 , 0)
            if(this.input.controls[2])
                ctx.translate(0 , 3)
            if(this.input.controls[3])
                ctx.translate(3 , 0)
            
        }
    }

    getFPSCount() {
        return Math.round(1000 / (this.getTime() / ++this.frameCount) * 100) / 100;
    }

}