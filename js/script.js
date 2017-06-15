var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var ut = new Util();
var space = new Space(canvas, ctx);
var game = "false";

ctx.lineCap = "round";
ctx.lineJoin = "round";

canvas.onmousemove = function(e){	
	space.cursor = ut.getMousePos(canvas, e);

	if(space.mouseDown){
		//set angle and power of arrow
		var angle = ut.getAngle(space.cursor, space.mouseDownPos);

		space.arrow.power = ut.getDistance(space.cursor, space.mouseDownPos);
		if(space.arrow.power > 100) space.arrow.power = 100;
		if(space.arrow.power < 10) space.arrow.power = 10;
		
		space.arrow.velocity.x = (space.arrow.power/4) * Math.cos(angle);
		space.arrow.velocity.y = (space.arrow.power/4) * Math.sin(angle);

	}
}

canvas.onmousedown = function(e){
	space.mouseDown = true;
	space.mouseDownPos = ut.getMousePos(canvas, e);

	var arr = space.target.ellipses;
	if(ut.checkInEllipse(space.mouseDownPos.x, space.mouseDownPos.y, arr[0].h, arr[0].k, arr[0].rx, arr[0].ry)){
		console.log("white");
		if(ut.checkInEllipse(space.mouseDownPos.x, space.mouseDownPos.y, arr[1].h, arr[1].k, arr[1].rx, arr[1].ry)){
			console.log("blue");
			if(ut.checkInEllipse(space.mouseDownPos.x, space.mouseDownPos.y, arr[2].h, arr[2].k, arr[2].rx, arr[2].ry)){
				console.log("red");
				if(ut.checkInEllipse(space.mouseDownPos.x, space.mouseDownPos.y, arr[3].h, arr[3].k, arr[3].rx, arr[3].ry)){
					console.log("yellow");
				}
			}
		}

	}
}

canvas.onmouseup = function(e){	
	space.cursor = ut.getMousePos(canvas, e);
	

	if(space.mouseDown){
		if(space.arrow.state === "rest"){
			space.arrow.launch(ut.getAngle(space.cursor, space.mouseDownPos), 20);
		}		
		space.mouseDown = false;
	}
}

function init(){
	//set canvas width and height
	canvas.setAttribute("width", window.innerWidth - 50);
	canvas.setAttribute("height", window.innerHeight - 50);
	document.getElementById("game").style.width = ("width", canvas.width + 10) + "px";
	document.getElementById("game").style.height = ("height", canvas.height + 10)+ "px";
	space.init();
}

function startGame(){
	game = true;
	ctx.clearRect(0,0,canvas.width, canvas.height);	
	space.init();	
	update();
}

function stop(){

}

function update(){
	if(game){
		//clear
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		//draw
		space.draw();

		//update loop
		requestAnimationFrame(update);
	}	
}

function home(mode, score){
	game = false;
	ctx.clearRect(0,0,canvas.width, canvas.height);	

	var title = "Archery Master";
	var subTitle = "Press SPACEBAR to start";

	ctx.fillStyle = "white";	
	ctx.shadowBlur = 1;
	ctx.shadowColor = "black";
	ctx.font = "100px sans-serif";
	ctx.fillText(title, canvas.width/2 - ctx.measureText(title).width/2, 150);

	if(mode === "restart"){
		var s = "Score : " + space.score;
		ctx.shadowBlur = 0;
		ctx.font = "40px sans-serif";
		ctx.fillText(s, canvas.width/2 - ctx.measureText(s).width/2, 300);
	}

	ctx.shadowBlur = 0;
	ctx.font = "30px sans-serif";
	ctx.fillText(subTitle, canvas.width/2 - ctx.measureText(subTitle).width/2, 400);



}

document.onkeydown = function(e){
	if(e.keyCode === 32){
		startGame();
	}	
}



init();
// startGame();

home();





