export default class Timer {
    constructor(fps) {
        this.fpsInterval = 1000 / fps
        this.then = this.startTime = window.performance.now()
        this.pause = false
        this.now = 0
        this.elapsed = 0
        this.frameCount = 0
    }

    starto() {
        // console.log(this.pause)
        this.animate()
    }

    animate(newtime) {
        console.log(this.pause)
        if(this.pause)
            return

        this.now = newtime;
        this.elapsed = this.now - this.then;
        requestAnimationFrame(this.animate.bind(this));
        //INPUT
        // processInput()
        //UPDATE
        // update() 

        if (this.elapsed > this.fpsInterval) {
            this.then = this.now - ( this.elapsed %  this.fpsInterval);
        

            // // TESTING...Report #seconds since start and achieved fps.
            let sinceStart = this.now - this.startTime;
            let currentFps = Math.round(1000 / (sinceStart / ++this.frameCount) * 100) / 100;
            console.log("Elapsed time= " + Math.round(sinceStart/1000) + " secs @ " + currentFps + " fps.");

            // // let milis = Math.round(sinceStart)
            // // currentSecond = Math.round(sinceStart / 1000)
            // // console.clear()
            // console.log(sinceStart / 1000)
            // // if(currentSecond != pastSecond){
            // //     pastSecond = currentSecond
            // //     console.log(Math.round(sinceStart/1000))
            // // }
        }
    }
}