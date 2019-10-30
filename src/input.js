
/**
 * 87 => w
 * 65 => a
 * 83 => s
 * 68 => d
 */

 document.addEventListener('mousemove', (event) => {
     let offset = 40
     if(event.clientX < offset)
        console.log('izquierda')

    if(event.clientX > canvas.width - offset)
        console.log('derecha')

    if(event.clientY < offset)
        console.log('arriba')

    if(event.clientY > canvas.height - offset)
        console.log('abajo')
 })