import Timer  from './Timer.js'
import {Map} from './Map.js'
import {Input} from './Input.js'
const canvas = document.querySelector('#main')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')
ctx.translate(window.innerWidth / 2 , window.innerHeight / 2)
window.onresize = function(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    ctx.translate(window.innerWidth / 2 , window.innerHeight / 2)
}


export class Render extends Timer{
    constructor(fps) {
        super(fps)
        this.map = new Map(7,7)
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
            ctx.textBaseline = 'bottom'
            ctx.font = "24px Arial";
            ctx.fillText(this.getFPSCount()+"   FPS", canvas.width/2, canvas.height/2);
            ctx.textBaseline = 'top'
            let convertidas = this.map.car2iso((this.input.mouseX-canvas.width/2)/64, (this.input.mouseY-canvas.height/2)/64)
            // console.log(convertidas)
            let equis = Math.floor(convertidas.x)
            let lle  =Math.floor(convertidas.y)
            ctx.fillText('X: '+equis, 'Y:'+lle, canvas.width/2, -canvas.height/2)
            if(equis >= 0 && equis < this.map.tiles[0].length && lle >= 0 && lle < this.map.tiles.length){
                ctx.fillText('X: '+equis+', Y: '+lle, canvas.width/2, -canvas.height/2)
                this.map.tiles[lle][equis].imageId = -1
            }
            this.map.draw(ctx)

            // console.log(this.getTime())
        }
    }

    getFPSCount() {
        return Math.round(1000 / (this.getTime() / ++this.frameCount) * 100) / 100;
    }

}