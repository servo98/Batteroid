let stop = false;
let frameCount = 0;
let fps, fpsInterval, startTime, now, then, elapsed;

const camera = {
    xPos: 0,
    yPos: 0,
    width: window.innerWidth,
    height: window.innerHeight
}

startAnimating(60);

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = window.performance.now();
    startTime = then;
    animate();
}

let currentSecond = 0
let pastSecond = 0

function animate(newtime) {

    // pause
    // if (stop) {
    //     return;
    // }
    now = newtime;
    elapsed = now - then;
    requestAnimationFrame(animate);




    processInput()
    update()
    
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        
        render()
        //CLEAR
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();


        //DRAW
        ctx.rotate(0.004)
        ctx.fillStyle = 'green';
        ctx.fillRect(-50, -50, 100, 100);
        
        
        // TESTING...Report #seconds since start and achieved fps.
        // let sinceStart = now - startTime;
        // let currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100;
        // console.log("Elapsed time= " + Math.round(sinceStart/1000) + " secs @ " + currentFps + " fps.");
        
        // let milis = Math.round(sinceStart)
        // currentSecond = Math.round(sinceStart / 1000)
        // if(currentSecond != pastSecond){
        //     pastSecond = currentSecond
        //     console.log(milis)
        // }
    }
}
