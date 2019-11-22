import {KEYS} from '../Utils/Input.js'
export default class Camera {
    constructor(x, y, width = 0, height = 0, id = 0) {
        this.x = x
        this.y = y
        this.id = id
        this.width = width
        this.height = height
        this.safeOffset = 100
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
        return (entity.x >= this.x - this.safeOffset &&
            entity.x <= this.x + this.width + this.safeOffset &&
            entity.y >= this.y - this.safeOffset&&
            entity.y <= this.y + this.height + this.safeOffset)
    }

    update(input) {
        if(input.keys[KEYS.W]){
            this.moveUp()
        }
        if(input.keys[KEYS.A]){
            this.moveLeft()
        }
        if(input.keys[KEYS.S]){
            this.moveDown()
        }
        if(input.keys[KEYS.D]){
            this.moveRight()
        }
    }

    draw(ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.translate(-this.x, -this.y)
    }
}