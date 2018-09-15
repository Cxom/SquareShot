const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
// const bodyParser = require("body-parser");

const port = 8081;

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/audio', express.static(__dirname + '/audio'));
app.use('/data', express.static(__dirname + '/data'));
app.use('/images', express.static(__dirname + '/images'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + "/index.html");
})

server.listen(port, () => {
	console.log('Listening on ' + server.address().port);
})
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}))

// var squares = {};

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
