// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Simple Particle System

class Particle {

  constructor(x, y) {
    this.acceleration = createVector(0, 0.05);
    this.velocity = createVector(random(-1, 1), random(-2, 0));
    this.position = createVector(x, y);
    this.lifespan = 1.0;
  }

  run() {
    this.update();
    this.display();
  }

  // Method to update position
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 0.05;
  }

  // Method to display
  display() {
    // blendMode(SCREEN);
    let hueMap = 0;
    hueMap = map(this.position.x, 0, width, 0, 360);
    // stroke(hueMap, 80, 80, this.lifespan);
    // strokeWeight(2);
    noStroke();
    fill(hueMap, 80, 80, this.lifespan);
    ellipse(this.position.x, this.position.y, 12, 12);
  }

  // Is the particle still useful?
  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}
