export class MapObject {
    constructor(id, name, x, y, imageId){
        this.id = id
        this.name = name
        this.x = x
        this.y = y
        this.imageId = imageId
    }

    draw(ctx, image) {
        // console.log(ctx)
        // console.log(image, this.x, this.y, 64, 64)
        if(this.imageId != -1)
            ctx.drawImage(image, this.x, this.y, 64, 64);
    }

}