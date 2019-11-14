const canvas = document.querySelector('#main')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
ctx.translate(window.innerWidth / 2 , window.innerHeight / 2)
window.onresize = function(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    ctx.translate(window.innerWidth / 2 , window.innerHeight / 2)
    // ctx.scale(3, 3);
}

