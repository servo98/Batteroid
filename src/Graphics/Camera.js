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

    update(input) {
        if(input.controls[0]){
            this.moveUp()
            // this.ctx.translate(0 , this.camera.speed)
        }
        if(input.controls[1]){
            this.moveLeft()
            // this.ctx.translate(this.camera.speed , 0)
        }
        if(input.controls[2]){
            this.moveDown()
            // this.ctx.translate(0 , -this.camera.speed)
        }
        if(input.controls[3]){
            this.moveRight()
            // this.ctx.translate(-this.camera.speed , 0)
        }
    }

    draw(ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.translate(-this.x, -this.y)
    }
}