import Render from './Graphics/Render.js'
import Interface from './Elements/Interface.js'
import Map from './Elements/Map.js'


export default class Game {
    constructor(){
        this.render = new Render(60, 'main')
        this.players = []
        this.numOfUnits = []
    }
    
    play(){
        let mainMenuInterface = new Interface()
        mainMenuInterface.addElement(50, 100, 128, 32, 1)
        mainMenuInterface.addElement(50, 200, 128, 32, 1)
        mainMenuInterface.addElement(50, 300, 128, 32, 1)
        mainMenuInterface.addElement(50, 400, 128, 32, 1)
        this.render.setCurrentInterface(mainMenuInterface)
        let wTemp = (Math.random()*10)+1
        let menuMap = new Map(wTemp, wTemp)
        this.render.camera.y += wTemp*32/2
        this.render.setMap(menuMap)
        this.render.render()
        // this.players = prompt('Number of players')
        // this.numOfUnits = prompt('Units per player')

    }
}