import Render from './Graphics/Render.js'
import Interface from './Elements/Interface.js'
import Map from './Elements/Map.js'
import Player from './Player.js'


export default class Game {
    constructor(){
        this.render = new Render(60, 'main')
        this.players = []
        this.numOfUnits = []
        this.maxPlayers = 4
    }
    
    play(){
        let mainMenuInterface = new Interface()
        //TITE
        mainMenuInterface.addElement(this.render.camera.width-500, 0, 500, 200, 3)

        //Play
        mainMenuInterface.addElement(50, 300, 128*3, 32*3, 1, 'play')

        //E
        // mainMenuInterface.addElement(50, 100+64*1, 128, 32, 1)
        // mainMenuInterface.addElement(50, 100+64*2, 128, 32, 1)
        // mainMenuInterface.addElement(50, 100+64*3, 128, 32, 1)

        //ADD
        // mainMenuInterface.addElement(50+64-16, 100+64*4, 32, 32, 2)



        this.render.setCurrentInterface(mainMenuInterface)
        let wTemp = (Math.random()*10)+1
        let menuMap = new Map(wTemp, wTemp)
        // let menuMap = new Map(0, 0)
        this.render.camera.y +=  wTemp*32/2 - 200
        this.render.setMap(menuMap)
        this.render.render()
        // this.players = prompt('Number of players')
        // this.numOfUnits = prompt('Units per player')

    }
    
    addPlayer() {
        let playerName = prompt('Insert new player\'s nane')
        this.players.push(new Player(playerName))
    }
}