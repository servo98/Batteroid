document.addEventListener('keydown', (event) => {
    switch(event.keyCode) {
        case 87:
            console.log('up')
            
            break
        case 65:
            console.log('left')
            break
        case 83:
            console.log('down')
            break;
        case 68:
            console.log('right')
        break;
        default: break;
    }
})

document.addEventListener('keyup', (event) => {
    // console.log(event.keyCode)
})

/**
 * 87 => w
 * 65 => a
 * 83 => s
 * 68 => d
 */