let circles = [];

function setup() {
  createCanvas(800, 600);
  noStroke();
  for (let i = 0; i < 20; i++) {
    circles.push(new Circle(random(width), random(height), random(20, 50)));
  }
}

function draw() {
  background(0);

  for (let circle of circles) {
    circle.update();
    circle.display();
  }
}

function mousePressed() {
  for (let circle of circles) {
    circle.clicked();
  }
}

class Circle {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.originalSize = size;
    this.color = color(random(255), random(255), random(255));
  }

  update() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 100) {
      this.size = this.originalSize + (100 - d) / 2;
    } else {
      this.size = this.originalSize;
    }
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }

  clicked() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < this.size / 2) {
      this.color = color(random(255), random(255), random(255));
    }
  }
}
