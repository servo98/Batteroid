import {loadSound} from '../Utils/Loader.js'
export default function playAudio(fileName) {
        
    loadSound(fileName)
    .then((audio) => {
        audio.volume = 0.4
        audio.play()
    })
    .catch((err) => {
        console.log(err)
    })
}