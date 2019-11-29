export const KEYS = {
    W: 0,
    A: 1,
    S: 2,
    D: 3,
    SPACE: 4,
    ESC: 5
}
export default class Input {
    constructor() {
        this.mouseX = 0
        this.mouseY = 0 
        this.keys = []
        this.leftClick = false
        this.rightClick = false
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
                case 27:
                    this.keys[KEYS.ESC] = true
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
                case 27:
                    this.keys[KEYS.ESC] = false
                default: break
            }
        })
        document.addEventListener('mousemove', event => {
            this.mouseX = event.clientX
            this.mouseY = event.clientY
            
        })
        document.addEventListener('mousedown', event => {
            this.leftClick  = true
        })
        document.addEventListener('mouseup', event => {
            this.leftClick = false
        })
        console.log('Input initiated')
    }
    
}
