import Timer  from './Timer.js'
import {Map} from './Map.js'
// import {Input} from './Input.js'
const canvas = document.querySelector('#main')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')
ctx.translate(window.innerWidth / 2 , window.innerHeight / 2)
window.onresize = function(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    ctx.translate(window.innerWidth / 2 , window.innerHeight / 2)
    // ctx.scale(3, 3);
}


export class Render extends Timer{
    constructor(fps) {
        super(fps)
        this.map = new Map(1,1)
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


            //CLEAR
            ctx.save()
            ctx.setTransform(1, 0, 0, 1, 0, 0)
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.restore()




            ctx.textAlign = 'right';
            ctx.textBaseline = 'bottom'
            ctx.font = "12px Arial";
            ctx.fillText(this.getFPSCount()+"   fps", canvas.width/2, canvas.height/2);
            
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