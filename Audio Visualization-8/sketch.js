// Declare microphone input and Fast Fourier Transform (FFT) analyzer objects
let mic, fft;

// Set number of bars to visualize
let numBars = 64;

// Declare variables for bar width, height, and spacing between bars
let barWidth, barHeight;
let barSpacing = 2;

// Create an array to hold the particles
let particles = [];

function setup() {
  // Create canvas sized to the window dimensions
  createCanvas(windowWidth, windowHeight);

  // Create the microphone input object and start it
  mic = new p5.AudioIn();
  mic.start();

  // Create the FFT object and set its input to the microphone input object
  fft = new p5.FFT();
  fft.setInput(mic);

  // Calculate the width of each bar
  barWidth = width / numBars - barSpacing;

  // Create the particle array
  for (let i = 0; i < 200; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  // Set background color to green
  background(74, 674, 25);

  // Draw the background particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].display();
    particles[i].move();
  }

  // Draw the sound visualizer
  let spectrum = fft.analyze();
  for (let i = 0; i < numBars; i++) {
    barHeight = map(spectrum[i], 0, 255, 0, height);
    fill(lerpColor(color('#7D26CD'), color('#BB8FCE'), i / numBars)); // Changed color to shades of purple
    rect(i * (barWidth + barSpacing), height - barHeight, barWidth, barHeight);
  }
}

// Define a particle class with a constructor, display method, and move method
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.size = random(5, 15);
    this.color = color(random(100, 200), random(50, 100), random(150, 255), random(50, 200)); // Changed color to shades of purple
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) {
      this.vx *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.vy *= -1;
    }
  }
}
