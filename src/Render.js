import {Timer}  from './Timer.js'
import {Map} from './Map.js'
// import {Input} from './Input.js'
const canvas = document.querySelector('#main')
const ctx = canvas.getContext('2d')

export class Render extends Timer{
    constructor(fps) {
        super(fps)
        this.map = new Map(100,100)
        this.load()
        // this.input = new Input()
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

            ctx.save()
            ctx.setTransform(1, 0, 0, 1, 0, 0)
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.restore()
            
            this.map.draw(ctx)
            // console.log('ay we')
            // console.log(this.getFPSCount())
            // console.log(sinceStart / 1000)
            // // if(currentSecond != pastSecond){
            // //     pastSecond = currentSecond
            // //     console.log(Math.round(sinceStart/1000))
            // // }
        }
    }

    getFPSCount() {
        return Math.round(1000 / (this.getTime() / ++this.frameCount) * 100) / 100;
    }

}