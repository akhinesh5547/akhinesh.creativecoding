var values = [30, 10, 45, 35, 60, 38, 75, 67];

function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100, 100);
  background(0, 0, 95);
  noStroke();
  var pieDiameter = 300;
  var currentAngle = 0;
  
  for (var i = 0; i < values.length; i++) {
    var value = values[i];
    var hueValue = map(value, 0, max(values), 0, 360);
    fill(hueValue, 80, 90); // Vibrant colors with high saturation and brightness
    arc(width / 2, height / 2, pieDiameter, pieDiameter, currentAngle, currentAngle + radians(value));
    currentAngle += radians(value);
  }
}
