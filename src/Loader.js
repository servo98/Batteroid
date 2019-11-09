export class Loader {
    constructor() {

    }
    loadImage(url){
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.addEventListener('load', () => resolve(img))
            img.addEventListener('error', err => reject(err))
            img.src = url
        });
    }
}