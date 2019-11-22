export default class MapObject {
    constructor( x, y, imageId = 0, width = 64, height = 64){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.imageId = imageId
        this.hide = false
    }

    draw(ctx, image) {
        if(!this.hide)
            ctx.drawImage(image, this.x, this.y, this.width, this.height);
    }

}