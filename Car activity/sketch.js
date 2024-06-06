function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(220);
  
  // Car body
  fill(255, 0, 0);
  rectMode(CENTER);
  rect(width / 2, height / 2, 150, 50);
  
  // Car roof
  rect(width / 2, height / 2 - 30, 100, 40);
  
  // Wheels
  fill(0);
  ellipse(width / 2 - 50, height / 2 + 25, 30, 30);
  ellipse(width / 2 + 50, height / 2 + 25, 30, 30);
}
