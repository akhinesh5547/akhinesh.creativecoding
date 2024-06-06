function setup() {
  createCanvas(400, 400);
  background(255);
  noLoop();
}

function draw() {
  background(255);
  let spacing = 50;
  
  for (let x = spacing / 2; x < width; x += spacing) {
    for (let y = spacing / 2; y < height; y += spacing) {
      drawPattern(x, y, spacing / 2);
    }
  }
}

function drawPattern(x, y, size) {
  stroke(0);
  noFill();
  
  // Draw circle
  ellipse(x, y, size * 2, size * 2);
  
  // Draw cross
  line(x - size, y, x + size, y);
  line(x, y - size, x, y + size);
}
