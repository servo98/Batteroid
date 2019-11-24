import MapObject from './MapObject.js'
export default class InterfaceObject extends MapObject{
    constructor( x, y, imageId = 0, width = 64, height = 64, text){
        super( x, y, imageId, width, height)
        this.originalX = x
        this.originalY = y
        this.handler = () => {
            console.log('element')
        }
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
        return (console.log())
    }


}