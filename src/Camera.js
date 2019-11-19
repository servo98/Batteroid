export class Camera {
    constructor(x, y, width = 0, height = 0, id = 0) {
        this.x = x
        this.y = y
        this.id = id
        this.width = width
        this.height = height
        this.offset = 64
        this.speed = 4
    }

    moveUp() {
        this.y -= this.speed
    }

    moveDown() {
        this.y += this.speed
    }

    moveLeft() {
        this.x -= this.speed
    }

    moveRight() {
        this.x += this.speed
    }
}