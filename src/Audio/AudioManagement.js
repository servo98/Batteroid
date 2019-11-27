import {loadSound} from '../Utils/Loader.js'
export default class AudioManagement {
    constructor(){
    }

    playAudio(fileName) {
        
        loadSound(fileName)
        .then((audio) => {
            audio.play()
        })
        .catch((err) => {
            console.log(err)
        })
    }

}