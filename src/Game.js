import Render from './Graphics/Render.js'
import Interface from './Elements/Interface.js'
import Map from './Elements/Map.js'
import Player from './Player.js'
import Character from './Elements/Character.js'

export default class Game {
    constructor(){
        this.render = new Render(60, 'main')
        this.numOfUnits = []
        // this.STATE = 'MAIN_MENU'
    }
    
    play(){
        
        let menuMap = new Map(10, 10)

        
        let mainMenuInterface = new Interface()
        //TITE
        mainMenuInterface.addElement(this.render.camera.width-500, 0, 500, 200, 3, '', null)
        //Play
        mainMenuInterface.addElement(50, 300, 128*3, 32*3, 1, '👉play', () => {
            this.render.camera.canMove = true
            let player1 = new Player('Fernando')
            player1.isTurn = true
            let player2 = new Player('Jugador 2')
            let players = [player1, player2]
            let numberOfCharacters = 10
            let temp = 0
            let color = 0
            players.forEach((player) => {
                for(let i = 0; i < numberOfCharacters; i++){
                    let tmpCharacter = new Character(i, temp, color)
                    player.characters.push(tmpCharacter)
                    // menuMap.characters.push(tmpCharacter)
                }
                temp += 9
                color++
            })
            menuMap.players.push(...players)

            // console.log(this.players)
            let inGameInterface = new Interface()
            inGameInterface.addElement(10, 10, 200, 80, 1, player1.name, null)
            inGameInterface.addElement(this.render.camera.width-10-200, 10, 200, 80, 1, player2.name, null)

            inGameInterface.addElement((this.render.camera.width/2) - 200, this.render.camera.height - 100, 400, 80, 1, 'Turno de...', null)
            this.render.setCurrentInterface(inGameInterface)
            this.render.camera.y += 160
            // this.render.setMap(menuMap)
        })
        this.render.setCurrentInterface(mainMenuInterface)
        
        
        
        
        
        
        
        //E
        // mainMenuInterface.addElement(50, 100+64*1, 128, 32, 1)
        // mainMenuInterface.addElement(50, 100+64*2, 128, 32, 1)
        // mainMenuInterface.addElement(50, 100+64*3, 128, 32, 1)
        
        //ADD
        // mainMenuInterface.addElement(50+64-16, 100+64*4, 32, 32, 2)
        
        
        
        let wTemp = (Math.random()*10)+1
        this.render.setMap(menuMap)
        this.render.render()


        document.onclick = () => {
            this.render.audioManager.playAudio('resources/sounds/intro.mp3')
        }

        document.onkeydown = (event) => {
            if(event.keyCode == 70){
                this.render.map.players[0].characters[0].health -= 10
                this.render.map.players[0].isTurn = !this.render.map.players[0].isTurn
                this.render.map.players[1].isTurn = !this.render.map.players[0].isTurn
            }
        }



        // if(this.input.leftClick) {
        //     if(this.firstClick) {
        //         this.firstClick = false
        //         this.audioManager.playAudio('resources/sounds/intro.mp3')
        //     }
        // }

    }
    
    // addPlayer() {
    //     let playerName = prompt('Insert new player\'s nane')
    //     this.players.push(new Player(playerName))
    // }
}