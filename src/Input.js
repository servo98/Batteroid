import {Map} from './Map.js'
const controles = [false, false, false, false]


export class Input {
    constructor() {
        this.init()
        this.mouseX = 0
        this.mouseY = 0 
    }

    init() {
        document.addEventListener('keydown', (event) => {
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
                    break
                default: break
            }
        })
        document.addEventListener('mousemove', (event) => {
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