console.log("Hello World");
var canvas = document.getElementById('gameCanvas');
var canvasContext = canvas.getContext('2d');
var ballX = 50;
var ballY = 150;
var ballSpeedX = 10;
var ballSpeedY = 4; 

var showingWindScreen = false;

var mouseX;
var mouseY;

player1Score = 0;
computerScore = 0;
const WINNING_SCORE = 3;


var paddleY = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;

setInterval(function() {
	moveEverything();
	drawEverything();
	}, 30);

canvas.addEventListener('mousemove', 
	function(evt) {
		var mousePos = calculateMousePosition(evt);
		paddleY = mousePos.y - PADDLE_HEIGHT / 2;
	});

canvas.addEventListener('mousedown', handleMouseClick);

function handleMouseClick(evt) {
	if (showingWindScreen) {
		player1Score = 0;
		computerScore = 0;
		showingWindScreen = false;
	}
}


function calculateMousePosition(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
}

function drawNet(){
	for (i=0; i < canvas.height; i+=40) {

		canvasContext.fillStyle = "white";
        canvasContext.fillRect(canvas.width/2-1,i,2,20);

	}
}

function drawEverything() {

	canvasContext.font="30px Arial";
	
	canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0,0,canvas.width,canvas.height);

    if (showingWindScreen) {
    	canvasContext.fillStyle = "white";
    	canvasContext.fillText("click to continue" , 300, 500);
    	if (player1Score >= WINNING_SCORE) {
    		canvasContext.fillText ("YOU WIN", 350, 200)

    	}else if (computerScore >= WINNING_SCORE) {
    		canvasContext.fillText ("Nice Try!", 350, 200)

    	}

    	return;
    }

    drawNet();
    
    //draw the paddle
    colorPaddle(0,paddleY,10, PADDLE_HEIGHT, 'white');

    //draw the computer paddle
    colorPaddle(canvas.width - 10, paddle2Y,10,PADDLE_HEIGHT, 'white');
    
    //next line draws the ball
    colorCircle(ballX, ballY, 10, 'white');

    canvasContext.fillText(player1Score , 100, 100);
    canvasContext.fillText(computerScore, 650, 100);

}

function colorCircle(centerX, centerY, radius, drawColor){
	canvasContext.fillStyle=drawColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
	canvasContext.fill();

}

function colorPaddle (x, y, width, height, color){
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x,y,width,height);	

}

function computerMovement() {
	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
	if (paddle2YCenter < ballY - 35) {
		paddle2Y = paddle2Y + 6;
	} else if (paddle2YCenter > ballY + 35){
		paddle2Y = paddle2Y - 6;
	}
	
}

function moveEverything() {

	if(showingWindScreen){
		return;
	}

	computerMovement();

	ballX = ballX +ballSpeedX;
	ballY = ballY +ballSpeedY;

	if (ballX > canvas.width ){
		if (ballY > paddle2Y && 
		    ballY < paddle2Y + PADDLE_HEIGHT) {
			ballSpeedX = -ballSpeedX;
		var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.35;

		}else {
			
			player1Score++;
			ballReset();

		}
		
	}

	if (ballX < 10){
		if (ballY > paddleY && 
		    ballY < paddleY + PADDLE_HEIGHT) {
			ballSpeedX = -ballSpeedX;

			var deltaY = ballY - (paddleY + PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.35;

		}else {
			
			computerScore++;
			ballReset();
		}

	}

	
	if (ballY > canvas.height - 10){
		ballSpeedY = -ballSpeedY;
	}

	if (ballY < 10){
		ballSpeedY = -ballSpeedY;
	}

	function ballReset() {
		if (player1Score >= WINNING_SCORE || 
			computerScore >= WINNING_SCORE){
				showingWindScreen = "true";
		}

		ballX = canvas.width/2;
		ballY = canvas.height/2;
		ballSpeedX = - ballSpeedX
	}

}


