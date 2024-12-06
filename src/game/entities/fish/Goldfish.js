import { BaseFish } from './BaseFish.js';

export class Goldfish extends BaseFish {
  constructor(canvasWidth, waterLevel) {
    super(canvasWidth, waterLevel, {
      width: 30,
      height: 15,
      speed: 2,
      points: 5,
      color: '#FFB347',
      finColor: '#FF8C00'
    });
  }

  draw(ctx) {
    this.drawFins(ctx);

    // Body
    ctx.fillStyle = this.color;
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

    // Eye
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(this.x - this.width / 4, this.y - this.height / 4, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}