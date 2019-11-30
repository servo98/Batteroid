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
            let player1 = new Player('Jugador 1')
            let player2 = new Player('Jugador 2')
            player2.isTurn = true
            let players = [player1, player2]
            let numberOfCharacters = 10
            let temp = 9
            let color = 0
            let characterId = 0

            let typesOfMoves = [
                //1 around
                [
                    {x:1, y:1},
                    {x:1, y:0},
                    {x:1, y:-1},
                    {x:0, y:1},
                    {x:0, y:-1},
                    {x:-1, y:1},
                    {x:-1, y:0},
                    {x:-1, y:-1},
                ],
                [
                    {x:1, y:1},
                    {x:2, y:2},
                    {x:-1, y:-1},
                    {x:-2, y:-2},
                    {x:-1, y:1},
                    {x:-2, y:2},
                    {x:1, y:-1},
                    {x:2, y:-2},
                ],
                [
                    {x:1, y:2},
                    {x:2, y:1},
                    {x:2, y:-1},
                    {x:1, y:-2},
                    {x:-1, y:-2},
                    {x:-2, y:-1},
                    {x:-2, y:1},
                    {x:-1, y:2},
                ],
                [
                    {y:1, x:0},
                    {y:2, x:0},
                    {y:3, x:0},
                    {y:-1, x:0},
                    {y:-2, x:0},
                    {y:-3, x:0},

                ]
            ]
            menuMap.characters[9][0] = new Character(0, 9, 0, characterId++, player1.name, typesOfMoves[0])
            menuMap.characters[9][1] = new Character(1, 9, 0, characterId++, player1.name, typesOfMoves[0])
            menuMap.characters[9][2] = new Character(2, 9, 0, characterId++, player1.name, typesOfMoves[0])
            menuMap.characters[9][3] = new Character(3, 9, 0, characterId++, player1.name, typesOfMoves[0])
            menuMap.characters[9][4] = new Character(4, 9, 1, characterId++, player1.name, typesOfMoves[1])
            menuMap.characters[9][5] = new Character(5, 9, 1, characterId++, player1.name, typesOfMoves[1])
            menuMap.characters[9][6] = new Character(6, 9, 2, characterId++, player1.name, typesOfMoves[2])
            menuMap.characters[9][7] = new Character(7, 9, 2, characterId++, player1.name, typesOfMoves[2])
            menuMap.characters[9][8] = new Character(8, 9, 3, characterId++, player1.name, typesOfMoves[3])
            menuMap.characters[9][9] = new Character(9, 9, 3, characterId++, player1.name, typesOfMoves[3])
            menuMap.characters[0][0] = new Character(0, 0, 4, characterId++, player2.name, typesOfMoves[0])
            menuMap.characters[0][1] = new Character(1, 0, 4, characterId++, player2.name, typesOfMoves[0])
            menuMap.characters[0][2] = new Character(2, 0, 4, characterId++, player2.name, typesOfMoves[0])
            menuMap.characters[0][3] = new Character(3, 0, 4, characterId++, player2.name, typesOfMoves[0])
            menuMap.characters[0][4] = new Character(4, 0, 5, characterId++, player2.name, typesOfMoves[1])
            menuMap.characters[0][5] = new Character(5, 0, 5, characterId++, player2.name, typesOfMoves[1])
            menuMap.characters[0][6] = new Character(6, 0, 6, characterId++, player2.name, typesOfMoves[2])
            menuMap.characters[0][7] = new Character(7, 0, 6, characterId++, player2.name, typesOfMoves[2])
            menuMap.characters[0][8] = new Character(8, 0, 7, characterId++, player2.name, typesOfMoves[3])
            menuMap.characters[0][9] = new Character(9, 0, 7, characterId++, player2.name, typesOfMoves[3])
        

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
                this.render.map.firstClick = true
                this.render.nextTurn()
            }
        }
    }
}