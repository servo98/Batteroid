export const KEYS = {
    W: 0,
    A: 1,
    S: 2,
    D: 3,
    SPACE: 4
}
export default class Input {
    constructor() {
        this.mouseX = 0
        this.mouseY = 0 
        this.keys = [false, false, false, false]
        this.spaceBar = false
        this.init()
    }

    init() {

        document.addEventListener('keydown', (event) => {
            switch (event.keyCode) {
                case 87:
                    this.keys[KEYS.W] = true
                    break
                case 65:
                    this.keys[KEYS.A] = true
                    break
                case 83:
                    this.keys[KEYS.S] = true
                    break;
                case 68:
                    this.keys[KEYS.D] = true
                    break
                case 32:
                    this.keys[KEYS.SPACE] = true
                default: break
            }
        })
        document.addEventListener('keyup', (event) => {
            switch (event.keyCode) {
                case 87:
                    this.keys[KEYS.W] = false
                    break
                case 65:
                    this.keys[KEYS.A] = false
                    break
                case 83:
                    this.keys[KEYS.S] = false
                    break;
                case 68:
                    this.keys[KEYS.D] = false
                    break
                case 32:
                    this.keys[KEYS.SPACE] = false
                default: break
            }
        })
        document.addEventListener('mousemove', event => {
            this.mouseX = event.clientX
            this.mouseY = event.clientY
            
        })
        console.log('Input initiated')
    }
    
}




// document.addEventListener('keyup', (event) => {
    //     switch (event.keyCode) {
//         case 87:
//             controles[0] = false
//             break
//         case 65:
//             controles[1] = false
//             break
//         case 83:
//             controles[2] = false
//             break;
//         case 68:
//             controles[3] = false
//             break;
//         default: break;
//     }
//     calCameraMov()
// })


// document.addEventListener('mousemove', (event) => {
//     //     let offset = 100
//     //     if(event.clientX < offset){
//     //         camera.xMov = camera.acceleration
//     //     }else if(event.clientX > canvas.width - offset){
//     //         camera.xMov = -camera.acceleration
//     //     }else{
//     //         camera.xMov = 0
//     //     }


//     //    if(event.clientY < offset){
//     //         camera.yMov = camera.acceleration
//     //    }else if(event.clientY > canvas.height - offset){
//     //        camera.yMov = -camera.acceleration
//     //    }else{
//     //        camera.yMov = 0
//     //    }
//     //    calCameraMov()

// })