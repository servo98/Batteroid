export class MapObject {
    constructor( x, y, imageId){
        this.x = x
        this.y = y
        this.imageId = imageId
        this.hide = false
    }

    draw(ctx, image) {
        if(!this.hide)
            ctx.drawImage(image, this.x, this.y, 64, 64);
    }

}