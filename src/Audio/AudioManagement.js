import {loadSound} from '../Utils/Loader.js'
export default class AudioManagement {
    constructor(){
        // let sounds = []
        this.ready = false
    }

    load() {
        // let audioRoutes = []
        // audioRoutes.push(loadSound('resources/sounds/intro.mp3'))
        // Promise.all(audioRoutes).then( (values) => {
        //     this.sounds.push(...values)
        //     this.ready = true
        //     console.log('All sounds were loaded')
        // })
    }

    update() {
        // this.sounds.forEach((audioObj) => {
        //     if()
        // })
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

    // playSound(index) {
    //     this.sounds[index].play()
    // }

    // pauseSound(index) {
    //     this.sounds[index].pause()
    // }

    // stopSound(index) {
    //     this.sounds[index].pause()
    //     this.sounds[index].currentTimne = 0
    // }
}