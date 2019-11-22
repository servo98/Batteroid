
import Render  from './Graphics/Render.js';


const render = new Render(60, 'main')


render.render()

document.onkeydown =  event => {
    if(event.keyCode == 32){
        render.pause = !render.pause
        console.log(render.pause ? 'Pausa' : 'Reanudando')
        

    }
}









// // console.log(render.map)
// let peer = new Peer();
// peer.on('open', function(id) {
//     console.log('My peer ID is: ' + id);
// });

// //start coneccion
// var conn = peer.connect('dest-peer-id');
// conn.on('open', function() {
//     // Receive messages
//     conn.on('data', function(data) {
//       console.log('Received', data);
//     });
  
//     // Send messages
//     conn.send('Hello!');
// });

// //recieve conection
// peer.on('connection', function(conn) { 

// });

