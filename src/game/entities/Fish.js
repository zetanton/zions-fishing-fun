export class Fish {
  constructor(canvasWidth, waterLevel) {
    this.x = canvasWidth;
    this.y = waterLevel + Math.random() * 200;
    this.width = 40;
    this.height = 20;
    this.speed = 2 + Math.random() * 2;
    this.points = 10;
  }

  update() {
    this.x -= this.speed;
  }

  draw(ctx) {
    ctx.fillStyle = '#FF6B6B';
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.width / 2, this.height / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Tail
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2, this.y);
    ctx.lineTo(this.x + this.width, this.y - this.height / 2);
    ctx.lineTo(this.x + this.width, this.y + this.height / 2);
    ctx.closePath();
    ctx.fill();
  }

  isOffScreen() {
    return this.x < -this.width;
  }

  collidesWith(hook) {
    const distance = Math.sqrt(
      Math.pow(this.x - hook.x, 2) + Math.pow(this.y - hook.y, 2)
    );
    return distance < this.width / 2;
  }
}