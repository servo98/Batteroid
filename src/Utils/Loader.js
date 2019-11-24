export function loadImage(url){
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.addEventListener('load', () => resolve(img))
        img.addEventListener('error', err => reject(err))
        img.src = url
    });
}

export function loadSound(fileName) {
    return new Promise((resolve, reject) => {
        const audio = new Audio(fileName)
        audio.addEventListener('loadeddata', () => {
            resolve(audio)
        })
        audio.addEventListener('error', err => reject(err))
    })
}