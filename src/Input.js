const controles = [false, false, false, false]


export class Input {
    constructor() {
        this.init()
    }

    init() {
        console.log('Input initiated')
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
            console.log('ay we')
            // calCameraMov()
        })
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