import {Timer}  from './Timer.js';
import {Input} from './Input.js'

export class Render extends Timer{
    constructor(fps) {
        super(fps)
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