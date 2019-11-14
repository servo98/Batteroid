

const resources = []
function loadImage(url){
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.addEventListener('load', () => resolve(img))
        img.addEventListener('error', err => reject(err))
        img.src = url
    });
}


resources.push(loadImage('resources/purple.png'))
resources.push(loadImage('resources/yellow.png'))
resources.push(loadImage('resources/red.png'))
resources.push(loadImage('resources/green.png'))
const images = []

Promise.all(resources).then(function (values) {
    images.push(...values)
    console.log('cargado')
})

function mainLoop(){
    processInput()
    update()
    render()
}

function processInput() {
    // console.log('input')
}

function update() {
    // console.log('udpate')
}

function render() {
    // console.log('render')
}


startAnimating(60);

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = window.performance.now();
    startTime = then;
    animate();
}
let stop = false;
let frameCount = 0;
let fps, fpsInterval, startTime, now, then, elapsed;

let currentSecond = 0
let pastSecond = 0

function animate(newtime) {

    // pause
    if (stop) {
        return;
    }
    now = newtime;
    elapsed = now - then;
    requestAnimationFrame(animate);




    processInput()
    update()

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        //render
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