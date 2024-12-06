export class BaseFish {
  constructor(canvasWidth, waterLevel, config) {
    this.x = canvasWidth;
    this.y = waterLevel + Math.random() * 200;
    this.width = config.width;
    this.height = config.height;
    this.speed = config.speed;
    this.points = config.points;
    this.color = config.color;
    this.finColor = config.finColor;
  }

  update() {
    this.x -= this.speed;
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

  drawFins(ctx) {
    // Top fin
    ctx.fillStyle = this.finColor;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.height / 2);
    ctx.lineTo(this.x + this.width / 4, this.y - this.height);
    ctx.lineTo(this.x + this.width / 2, this.y - this.height / 2);
    ctx.closePath();
    ctx.fill();

    // Bottom fin
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 4, this.y + this.height / 2);
    ctx.lineTo(this.x + this.width / 4, this.y + this.height);
    ctx.lineTo(this.x + this.width / 2, this.y + this.height / 2);
    ctx.closePath();
    ctx.fill();
  }
}