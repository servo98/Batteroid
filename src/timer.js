let stop = false;
let frameCount = 0;
let fps,
    fpsInterval,
    startTime,
    now,
    then,
    elapsed,
    sinceStart,
    currentSecond,
    pastSecond

startAnimating(60);

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = window.performance.now();
    startTime = then;
    animate();
}


function animate(newtime) {

    //PAUSE??
    if (stop) {
        return;
    }
    now = newtime;
    elapsed = now - then;
    requestAnimationFrame(animate);
    //INPUT
    // processInput()
    //UPDATE
    // update() 

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
      

        // TESTING...Report #seconds since start and achieved fps.
        sinceStart = now - startTime;
        // let currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100;
        // console.log("Elapsed time= " + Math.round(sinceStart/1000) + " secs @ " + currentFps + " fps.");

        // let milis = Math.round(sinceStart)
        currentSecond = Math.round(sinceStart / 1000)
        // console.clear()
        console.log(sinceStart / 1000)
        // if(currentSecond != pastSecond){
        //     pastSecond = currentSecond
        //     console.log(Math.round(sinceStart/1000))
        // }
    }
}