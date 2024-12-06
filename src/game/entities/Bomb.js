export class Bomb {
  constructor(canvasWidth, waterLevel) {
    this.x = canvasWidth;
    this.y = waterLevel + Math.random() * 200;
    this.radius = 15;
    this.speed = 1 + Math.random();
  }

  update() {
    this.x -= this.speed;
  }

  draw(ctx) {
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Fuse
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.radius);
    ctx.lineTo(this.x, this.y - this.radius - 10);
    ctx.strokeStyle = '#FFA500';
    ctx.stroke();
  }

  isOffScreen() {
    return this.x < -this.radius;
  }

  collidesWith(hook) {
    const distance = Math.sqrt(
      Math.pow(this.x - hook.x, 2) + Math.pow(this.y - hook.y, 2)
    );
    return distance < this.radius;
  }
}