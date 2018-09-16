var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var Client = {};
Client.socket = io.connect();

Client.askNewPlayer = function(){
	Client.socket.emit('newplayer', me);
};

Client.socket.on('remove', (id) => {

})

const me = {
	x: 20,
	y: 20,
	color: `rgb(${randomInt(60, 220)}, ${randomInt(60, 220)}, ${randomInt(60, 220)})`
}

window.addEventListener("load", (event) => {
	console.log("Page loaded - 'ME' added?");
	drawSquare(me);
	Client.askNewPlayer();
});

document.addEventListener("keydown", function(event) {
    var x = event.key;
    // clearCanvas();
    if(x == "ArrowRight" && me.x <= 735) {
        me.x += 15;
    }
    if(x == "ArrowLeft" && me.x >= 15) {
        me.x -= 15;
    }
    if(x == "ArrowUp" && me.y >= 15) {
        me.y -= 15;
    }
    if(x == "ArrowDown" && me.y <= 545) {
        me.y += 15;
	}
	
	Client.socket.emit('clientMovement', me);
    // drawSquare(me);
});

function drawSquare(square) {
    ctx.fillStyle = square.color;  
	ctx.fillRect(square.x, square.y, 50, 50);
}

Client.socket.on('newplayer', (player) => {
    drawSquare(player.square);
});

Client.socket.on('movement', (players) => {
	clearCanvas();
	for(var i = 0; i < players.length; i++){
		drawSquare(players[i].square);
    }
})

Client.socket.on('allplayers', (players) => {
	console.log(players);
	clearCanvas();
    for(var i = 0; i < players.length; i++){
        drawSquare(players[i].square);
    }
});

function clearCanvas(){
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}