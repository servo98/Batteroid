let stop = false;
let frameCount = 0;
let fps, fpsInterval, startTime, now, then, elapsed;
let eso = 0.003
const camera = {
    xPos: 0,
    yPos: 0,
    xMov: 0,
    yMov: 0,
    acceleration : 3,
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
        
        ctx.translate(camera.xMov, camera.yMov);
        render()
        //CLEAR
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();


        //DRAW  
        // ctx.restore()
        ctx.save();
        ctx.fillStyle = 'green';
        ctx.rotate(eso)
        eso += camera.acceleration / 1000
        ctx.fillRect(-50, -50, 100, 100);
        ctx.restore();
        // ctx.save();+
        
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


document.addEventListener('keydown', (event) => {
    switch(event.keyCode) {
        case 87:
            camera.yMov = -camera.acceleration;
            break
        case 65:
            camera.xMov = -camera.acceleration;
            break
        case 83:
            camera.yMov = camera.acceleration;
            break;
        case 68:
            camera.xMov = camera.acceleration;
        break;
        default: break;
    }
})


document.addEventListener('keyup', (event) => {
    switch(event.keyCode) {
        case 87:
        case 83:
            camera.yMov = 0;
            break
        case 65:
        case 68:
            camera.xMov = 0;
            break
        default: break;
    }
})


document.addEventListener('mousemove', (event) => {
    let offset = 100
    if(event.clientX < offset){
        camera.xMov = camera.acceleration
    }else if(event.clientX > canvas.width - offset){
        camera.xMov = -camera.acceleration
    }else{
        camera.xMov = 0
    }


   if(event.clientY < offset){
        camera.yMov = camera.acceleration
   }else if(event.clientY > canvas.height - offset){
       camera.yMov = -camera.acceleration
   }else{
       camera.yMov = 0
   }

})  
