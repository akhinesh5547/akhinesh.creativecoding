function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  // Body
  fill(255, 182, 193); // Change to pink
  ellipse(200, 220, 100, 140); // Adjust position and size
  
  // Head
  fill(255, 228, 196); // Change to a peach color
  ellipse(200, 120, 90, 90); // Adjust size to be more circular
  
  // Eyes
  fill(255);
  ellipse(185, 110, 15, 15); // Adjust position and size
  ellipse(215, 110, 15, 15); // Adjust position and size
  
  // Pupils
  fill(0);
  ellipse(185, 110, 7, 7); // Adjust size
  ellipse(215, 110, 7, 7); // Adjust size
  
  // Mouth
  noFill();
  stroke(0);
  strokeWeight(2); // Thinner mouth line
  arc(200, 140, 30, 15, 0, PI); // Adjust size and position
  
  // Arms
  strokeWeight(6); // Thinner arms
  line(150, 220, 100, 180); // Adjust position and angle
  line(250, 220, 300, 180); // Adjust position and angle
}