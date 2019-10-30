

const resources = []

resources.push(loadImage('resources/purple.png'))
resources.push(loadImage('resources/yellow.png'))
resources.push(loadImage('resources/red.png'))
resources.push(loadImage('resources/green.png'))
const images = []

Promise.all(resources).then(function (values) {
    images.push(...values)
    console.log('cargado')
})



function processInput() {
    // console.log('input')
}

function update() {
    // console.log('udpate')
}

function render() {
    // console.log('render')
}