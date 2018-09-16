const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require("body-parser");

// Allow passing plain JSON objects
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

const PORT = process.env.PORT || 5000;

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + "/index.html");
})

server.listen(PORT, () => {
	console.log('Listening on ' + server.address().port);
})







// function updateSquare(square){
// 	squares[square.id] = square.pos;
// 	io.emit("square-move")
// }

// io.on("square-move", (square) => );

// app.post('/messages', (req, res) => {
//      messages.push(req.body);
//      io.emit('message', req.body);
//      res.sendStatus(200);
// })

// var squares = {};

server.lastPlayderID = 0; // Keep track of the last id assigned to a new player

io.on('connection', (socket) => {
    socket.on('newplayer', (square) => {
        socket.player = {
            id: server.lastPlayderID++,
            square: square
        };
        socket.emit('allplayers', getAllPlayers());
		socket.broadcast.emit('newplayer', socket.player);
		
		socket.on('clientMovement', (square) => {
			socket.player.square = square;
            io.emit('movement', getAllPlayers());
        });

		socket.on('disconnect',function(){
            io.emit('remove',socket.player.id);
        });
    });
});

function getAllPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    });
    return players;
}
