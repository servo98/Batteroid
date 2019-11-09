export  class Timer {
    constructor(fps) {
        this.fpsInterval = 1000 / fps
        this.then = this.startTime = window.performance.now()
        this.pause = false
        this.now = 0
        this.elapsed = 0
        this.frameCount = 0
    }

    init() {
        console.log('Timer initiated')
        this.loop()
        // input.init()
        
    }

    loop(newtime) {
        if(this.pause)
            return
        this.now = newtime;
        this.elapsed = this.now - this.then;
    }

    getTime() {
        return this.now - this.startTime
    }
    
}