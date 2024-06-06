let marble, paddle, character;
let bricks = [];
let powerUps = [];
let obstacles = [];
let life, score;
let gameState = 'title';

function setup() {
  createCanvas(windowWidth, windowHeight);
  marble = new Marble();
  paddle = new Paddle();
  character = new Character();
  life = 5;
  score = 0;
  setupBricks();
  setupPowerUps();
  setupObstacles();
}

function draw() {
  background(255);
  if (gameState === 'title') {
    titleScreen();
  } else if (gameState === 'gameplay') {
    gameplayScreen();
  } else if (gameState === 'gameover') {
    gameoverScreen();
  } else if (gameState === 'gamewin') {
    gamewinScreen();
  }
}

function titleScreen() {
  background(0, 0, 255);
  textSize(50);
  textAlign(CENTER, CENTER);
  fill(255);
  text('PINBALL PLATFORMER', width / 2, height / 3);
  textSize(30);
  text('Press ENTER to Start', width / 2, height / 2);
  if (keyIsPressed && keyCode === ENTER) {
    gameState = 'gameplay';
  }
}

function gameplayScreen() {
  background(0, 255, 0);
  displayScoreAndLife();
  marble.draw();
  marble.move();
  marble.checkCollisions();
  
  paddle.draw();
  paddle.move();
  
  character.draw();
  character.move();
  
  bricks.forEach(brick => brick.draw());
  powerUps.forEach(powerUp => powerUp.draw());
  obstacles.forEach(obstacle => obstacle.draw());

  if (life <= 0) {
    gameState = 'gameover';
  }

  if (score >= 100) { // Example win condition
    gameState = 'gamewin';
  }
}

function gameoverScreen() {
  background(255, 0, 0);
  textSize(50);
  textAlign(CENTER, CENTER);
  fill(0);
  text('GAME OVER', width / 2, height / 3);
  textSize(30);
  text('Press BACKSPACE to Return to Menu', width / 2, height / 2);
  if (keyIsPressed && keyCode === BACKSPACE) {
    resetGame();
    gameState = 'title';
  }
}

function gamewinScreen() {
  background(0, 255, 255);
  textSize(50);
  textAlign(CENTER, CENTER);
  fill(0);
  text('YOU WIN', width / 2, height / 3);
  textSize(30);
  text('Press BACKSPACE to Return to Menu', width / 2, height / 2);
  if (keyIsPressed && keyCode === BACKSPACE) {
    resetGame();
    gameState = 'title';
  }
}

function displayScoreAndLife() {
  textSize(20);
  fill(0);
  text('Score: ' + score, 50, 30);
  text('Lives: ' + life, 50, 60);
}

function resetGame() {
  marble.reset();
  paddle.reset();
  character.reset();
  life = 5;
  score = 0;
  setupBricks();
  setupPowerUps();
  setupObstacles();
}

function setupBricks() {
  bricks = [];
  // Initialize bricks at random positions
  for (let i = 0; i < 10; i++) {
    bricks.push(new Brick(random(width), random(height / 2)));
  }
}

function setupPowerUps() {
  powerUps = [];
  // Initialize power-ups at random positions
  for (let i = 0; i < 5; i++) {
    powerUps.push(new PowerUp(random(width), random(height / 2)));
  }
}

function setupObstacles() {
  obstacles = [];
  // Initialize obstacles at random positions
  for (let i = 0; i < 5; i++) {
    obstacles.push(new Obstacle(random(width), random(height / 2)));
  }
}

class Marble {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.dx = random(3, 6);
    this.dy = random(3, 6);
    this.radius = 20;
  }

  draw() {
    fill(200);
    ellipse(this.x, this.y, this.radius * 2);
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x < 0 || this.x > width) {
      this.dx *= -1;
    }
    if (this.y < 0) {
      this.dy *= -1;
    }
    if (this.y > height) {
      life--;
      this.reset();
    }
  }

  checkCollisions() {
    if (this.y + this.radius > paddle.y && this.x > paddle.x && this.x < paddle.x + paddle.width) {
      this.dy *= -1;
      this.y = paddle.y - this.radius;
    }
    bricks.forEach((brick, index) => {
      if (this.x > brick.x && this.x < brick.x + brick.width && this.y - this.radius < brick.y + brick.height && this.y + this.radius > brick.y) {
        score += 10;
        this.dy *= -1;
        bricks.splice(index, 1);
      }
    });
    powerUps.forEach((powerUp, index) => {
      if (dist(this.x, this.y, powerUp.x, powerUp.y) < this.radius + powerUp.radius) {
        score += 20;
        powerUps.splice(index, 1);
      }
    });
    obstacles.forEach((obstacle, index) => {
      if (dist(this.x, this.y, obstacle.x, obstacle.y) < this.radius + obstacle.radius) {
        life--;
        obstacles.splice(index, 1);
      }
    });
  }
}

class Paddle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = width / 2 - 75;
    this.y = height - 30;
    this.width = 150;
    this.height = 20;
  }

  draw() {
    fill(100);
    rect(this.x, this.y, this.width, this.height);
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 10;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 10;
    }
    this.x = constrain(this.x, 0, width - this.width);
  }
}

class Character {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = width / 2;
    this.y = height - 60;
    this.size = 40;
    this.dx = 5;
    this.dy = 0;
    this.gravity = 1;
    this.jumpStrength = -15;
    this.onGround = false;
  }

  draw() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.size, this.size);
  }

  move() {
    if (keyIsDown(65)) { // 'A' key
      this.x -= this.dx;
    }
    if (keyIsDown(68)) { // 'D' key
      this.x += this.dx;
    }
    if (keyIsDown(87) && this.onGround) { // 'W' key
      this.dy = this.jumpStrength;
      this.onGround = false;
    }
    this.dy += this.gravity;
    this.y += this.dy;
    if (this.y + this.size >= height) {
      this.y = height - this.size;
      this.dy = 0;
      this.onGround = true;
    }
    this.x = constrain(this.x, 0, width - this.size);
  }
}

class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 20;
  }

  draw() {
    fill(150);
    rect(this.x, this.y, this.width, this.height);
  }
}

class PowerUp {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 15;
  }

  draw() {
    fill(0, 255, 0);
    ellipse(this.x, this.y, this.radius * 2);
  }
}

class Obstacle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 20;
  }

  draw() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.radius * 2);
  }
}
