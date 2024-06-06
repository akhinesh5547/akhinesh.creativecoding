let font;
let textPoints;
let textInput = "Bath Spa University";
let baseFontSize = 50; // Further reduced the base font size

function preload() {
  font = loadFont('ShadowsIntoLightTwo-Regular.ttf'); // Correct the file extension
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateTextPoints();
}

function draw() {
  background(255);
  fill(0);
  noStroke();
  
  // Scale factor to adjust the text points to fit within the window dimensions
  let scaleX = windowWidth / 1000;
  let scaleY = windowHeight / 500;
  
  for (let i = 0; i < textPoints.length; i++) {
    let pt = textPoints[i];
    ellipse(pt.x * scaleX, pt.y * scaleY, 1.5 * scaleX, 1.5 * scaleY); // Further reduced dot size
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateTextPoints();
}

function calculateTextPoints() {
  let newFontSize = (windowHeight / 500) * baseFontSize;
  textPoints = font.textToPoints(textInput, 50, 300, newFontSize, {
    sampleFactor: 0.2 // Increased sample factor for more points
  });
}
