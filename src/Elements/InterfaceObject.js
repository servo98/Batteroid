import MapObject from './MapObject.js'
export default class InterfaceObject extends MapObject{
    constructor( x, y, imageId = 0, width = 64, height = 64, text, handler){
        super( x, y, imageId, width, height)
        this.originalX = x
        this.originalY = y
        this.handler = handler
        this.text = text
    }

    update(input, camera) {
        this.x = camera.x+this.originalX
        this.y = camera.y+this.originalY
    }

    draw(ctx, img) {
        super.draw(ctx, img)
        ctx.save()
        ctx.font = '48px Computer'
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        ctx.fillText(this.text, this.x+this.width/2, this.y+this.height/2)
        ctx.restore()
    }

    isClicked(input) {
        // console.log(this.originalX, this.originalY)
        // console.log(input.mouseX, input.mouseY)
        // console.log(this.originalX < input.mouseX, this.originalX+this.width > input.mouseX, this.originalY <input.mouseY, this.originalY+this.height > input.mouseY)
        return (
            this.originalX < input.mouseX &&
            this.originalX+this.width > input.mouseX &&
            this.originalY <input.mouseY &&
            this.originalY+this.height > input.mouseY
        )
    }


}