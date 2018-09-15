var curx = 0;
var cury = 0;
document.addEventListener("keydown", function() {
    var x = event.key;
    draw("#FFFFFF");
    if(x == "ArrowRight" && curx <= 735) {
        curx += 15;
    }
    if(x == "ArrowLeft" && curx >= 15) {
        curx -= 15;
    }
    if(x == "ArrowUp" && cury >= 15) {
        cury -= 15;
    }
    if(x == "ArrowDown" && cury <= 545) {
        cury += 15;
    }
    draw("#FF0000");
})
function draw(colour) {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = colour;  
    ctx.fillRect(curx, cury, 50, 50);
}
