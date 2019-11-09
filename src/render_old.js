let stop = false;
let frameCount = 0;
let fps, fpsInterval, startTime, now, then, elapsed;
let eso = 0.003
const camera = {
    xPos: 0,
    yPos: 0,
    xMov: 0,
    yMov: 0,
    acceleration: 3,
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
        // ctx.rotate(eso)
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
//arriba, izq, abajo,  derch
const controles = [false, false, false, false]

document.addEventListener('keydown', (event) => {
    // console.log(event.keyCode)
    switch (event.keyCode) {
        case 87:
            controles[0] = true
            break
        case 65:
            controles[1] = true
            break
        case 83:
            controles[2] = true
            break;
        case 68:
            controles[3] = true
            break;
        default: break;
    }
    calCameraMov()
})


document.addEventListener('keyup', (event) => {
    switch (event.keyCode) {
        case 87:
            controles[0] = false
            break
        case 65:
            controles[1] = false
            break
        case 83:
            controles[2] = false
            break;
        case 68:
            controles[3] = false
            break;
        default: break;
    }
    calCameraMov()
})


document.addEventListener('mousemove', (event) => {
    //     let offset = 100
    //     if(event.clientX < offset){
    //         camera.xMov = camera.acceleration
    //     }else if(event.clientX > canvas.width - offset){
    //         camera.xMov = -camera.acceleration
    //     }else{
    //         camera.xMov = 0
    //     }


    //    if(event.clientY < offset){
    //         camera.yMov = camera.acceleration
    //    }else if(event.clientY > canvas.height - offset){
    //        camera.yMov = -camera.acceleration
    //    }else{
    //        camera.yMov = 0
    //    }
    //    calCameraMov()

})



function calCameraMov() {
    // console.log(controles)
    // camera.yMov = 0
    // camera.xMov = 0
    if(controles[0]){
        if(controles[2]){
            camera.yMov = 0
        }else{
            camera.yMov = -camera.acceleration
        }
    }else if(controles[2]){
        camera.yMov = camera.acceleration
    }else {
        camera.yMov = 0
    }

    if(controles[1]){
        if(controles[3]){
            camera.xMov = 0
        }else{
            camera.xMov = -camera.acceleration
        }
    }else if(controles[3]){
        camera.xMov = camera.acceleration
    }else {
        camera.xMov = 0
    }
    // camera.yMov = controles[0] ? (controles[2] ? 0 : -camera.acceleration) : (controles[0] ? camera.acceleration : 0)
    // camera.yMov = controles[1] ? (controles[3] ? 0 : -camera.acceleration) : (controles[3] ? camera.acceleration : 0)
}
