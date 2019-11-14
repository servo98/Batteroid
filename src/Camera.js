export class Camera {
    constructor(x, y, width, height, id = 0) {
        this.x = x
        this.y = y
        this.id = id
        this.width = width
        this.height = height
        this.offset = 64
    }
}