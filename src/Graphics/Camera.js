export default class Camera {
    constructor(x, y, width = 0, height = 0, id = 0) {
        this.x = x
        this.y = y
        this.id = id
        this.width = width
        this.height = height
        this.offset = 100
        this.speed = 20
        this.backGroundColor = 'rgba(61, 61, 61,1.0)'
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

    isInside(entity) {
        return (entity.x >= this.x - this.offset &&
            entity.x <= this.x + this.width + this.offset &&
            entity.y >= this.y - this.offset&&
            entity.y <= this.y + this.height + this.offset)
    }
}