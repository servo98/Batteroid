import Render from './Graphics/Render.js'
import Interface from './Elements/Interface.js'
import Map from './Elements/Map.js'


export default class Game {
    constructor(){
        this.render = new Render(60, 'main')
        this.interface = new Interface()
        this.map = new Map(10,10)

        // document.onkeydown =  event => {
        //     if(event.keyCode == 32){
        //         this.render.pause = !this.render.pause
        //         console.log(this.render.pause ? 'Pausa' : 'Reanudando')
                

        //     }
        // }
    }

    play(){
        this.render.addElement(this.map)
        this.render.addElement(this.interface)
        this.render.load()
        this.render.render()
    }
}