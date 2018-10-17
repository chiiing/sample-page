const ballSpeed = 5;
const BALL_RADIUS = 15;

const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;

var player1Position, player2Position;
var player1Velocity, player2Velocity;
var player1Score, player2Score;
var ball, ballVelocity;


function setup() {

  createCanvas(600, 400);

  player1Position = player2Position = height / 2 - 50; 

  player1Velocity = player2Velocity = 0;
  player1Score = player2Score = 0;

  ball = createVector(width / 2, height / 2); 
  ballVelocity = createVector(random(-1, 1), random(-1, 1)); 
  ballVelocity.setMag(ballSpeed); 
  
  textAlign(CENTER);
  
}

function draw() {
	
//background stipes

	background(170,189,140);
  noStroke();
  for (var i = 0; i < height; i += 20) {
  fill(62,105,144);
  rect(0, i, width, 10);
  }
  
//Game Indication

  textSize(8);
  textStyle(BOLD);
  text('Player 1 : UPKEY and DOWNKEY', 450, 39);
  text('Player 2 : W and S', 150, 39);
   
  noStroke();
  rect(PADDLE_WIDTH * 2, player1Position, PADDLE_WIDTH, PADDLE_HEIGHT);
  rect(width - (PADDLE_WIDTH * 3), player2Position, PADDLE_WIDTH, PADDLE_HEIGHT);
  ellipse(ball.x, ball.y, BALL_RADIUS);
  fill(240, 236, 235);
  textFont('Helvetica');
  textSize(40);
  text(player1Score + "  :  " + player2Score, width / 2, 40);
  handlePaddles();
  handleBall();
  gameOver();
}


function handlePaddles() {

  if (keyIsDown(87)) {
    player1Velocity -= 5;
  } else if (keyIsDown(83)) {
    player1Velocity += 5;
  }

  if (keyIsDown(UP_ARROW)) {
    player2Velocity -= 5;
  } else if (keyIsDown(DOWN_ARROW)) {
    player2Velocity += 5;
  }

  player1Position += player1Velocity;
  player2Position += player2Velocity;

  player1Velocity *= 0.6;
  player2Velocity *= 0.6;

  player1Position = constrain(player1Position, 0, height - PADDLE_HEIGHT);
  player2Position = constrain(player2Position, 0, height - PADDLE_HEIGHT);
}


function handleBall() {

  ball.x += ballVelocity.x;
  ball.y += ballVelocity.y;

  if (ball.y > height || ball.y < 0)
    ballVelocity.y *= -1; 

  if (ball.x <= PADDLE_WIDTH * 3) { 
    if (ball.x <= PADDLE_WIDTH) {

      player2Score++;
      reset();
      return;
    }

    if (ball.y > player1Position && ball.y < player1Position + PADDLE_HEIGHT) {
      if (ballVelocity.x < 0) { 
        ballVelocity.x *= -1;
        ballVelocity.mult(random(1, 1.1));
      }
    }

  } else if (ball.x >= width - (PADDLE_WIDTH * 3)) { 
    if (ball.x >= width - PADDLE_WIDTH) { 
      player1Score++;
      reset();
      return;
    }
    if (ball.y > player2Position && ball.y < player2Position + PADDLE_HEIGHT) {
      if (ballVelocity.x > 0) {
        ballVelocity.x *= -1;
        ballVelocity.mult(random(1, 1.1));
      }
    }

  }

}

function reset() {
  ballVelocity.setMag(ballSpeed);
  ball = createVector(width / 2, height / 2); 
}
function gameOver() {
  if (player1Score == 5) {
    noLoop();
    text('You Win !', 450, height /2)
    fill(255)
    }
    else if (player2Score == 5) {
    noLoop();
    text('You Win !', 150, height /2)
    fill(255)
    }
 }
