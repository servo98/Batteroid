import Render from './Graphics/Render.js'
import Interface from './Elements/Interface.js'
import Map from './Elements/Map.js'
import Player from './Player.js'
import Character from './Elements/Character.js'

export default class Game {
    constructor(){
        this.render = new Render(60, 'main')
        this.numOfUnits = []
    }
    
    play(){
        
        let menuMap = new Map(10, 10)

        
        let mainMenuInterface = new Interface()
        //TITE
        mainMenuInterface.addElement(this.render.camera.width-500, 0, 500, 200, 3, '', null)
        //Play
        mainMenuInterface.addElement(50, 300, 128*3, 32*3, 1, '👉play', () => {
            this.render.playSound('resources/sounds/intro.mp3')
            this.render.playSound('resources/sounds/click.wav')
            this.render.camera.canMove = true
            let player1 = new Player('Fernando')
            let player2 = new Player('Jugador 2')
            player2.isTurn = true
            let players = [player1, player2]
            let numberOfCharacters = 10
            let temp = 9
            let color = 0
            let characterId = 0
            players.forEach((player) => {
                for(let i = 0; i < numberOfCharacters; i++){
                    let tmpCharacter = new Character(i, temp, color, characterId++, color == 0 ? player1.name : player2.name)
                    menuMap.characters[temp][i] = tmpCharacter
                    // player.characters.push(tmpCharacter)
                }
                temp -= 9
                color++
            })
            menuMap.players.push(...players)

            let inGameInterface = new Interface()
            inGameInterface.addElement(10, 10, 200, 80, 1, player1.name, null)
            inGameInterface.addElement(this.render.camera.width-10-200, 10, 200, 80, 1, player2.name, null)

            inGameInterface.addElement((this.render.camera.width/2) - 200, this.render.camera.height - 100, 400, 80, 1, 'Turno de...', null)
            this.render.setCurrentInterface(inGameInterface)
            this.render.camera.y += 160
            this.render.nextTurn()
        })
        this.render.setCurrentInterface(mainMenuInterface)
        
        
        
        let wTemp = (Math.random()*10)+1
        this.render.setMap(menuMap)
        this.render.render()

        document.onkeydown = (event) => {
            if(event.keyCode == 70){
                // this.render.map.players[0].characters[0].health -= 10
                console.log(this.render.map.characters)
                this.render.nextTurn()
            }
        }
    }
}