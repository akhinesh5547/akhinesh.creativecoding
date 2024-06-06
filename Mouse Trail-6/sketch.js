let trail = [];
let maxTrailLength = 50; // Adjust this to change the length of the trail

function setup() {
  createCanvas(800, 400);
  noStroke();
}

function draw() {
  background(0); // Clear the background
  
  // Add current mouse position to the trail
  trail.push({ x: mouseX, y: mouseY });

  // Limit the trail length
  if (trail.length > maxTrailLength) {
    trail.shift();
  }

  // Draw the trail
  for (let i = 0; i < trail.length; i++) {
    let pos = trail[i];
    fill(255, 255 - (i * 255 / trail.length)); // Fade the trail
    ellipse(pos.x, pos.y, 10, 10);
  }
}
