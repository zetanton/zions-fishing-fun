import { BaseFish } from './BaseFish.js';

export class Tuna extends BaseFish {
  constructor(canvasWidth, waterLevel) {
    super(canvasWidth, waterLevel, {
      width: 50,
      height: 25,
      speed: 1.5,
      points: 15,
      color: '#4169E1',
      finColor: '#1E90FF'
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
    ctx.moveTo(this.x + this.width / 2, this.y - this.height / 2);
    ctx.lineTo(this.x + this.width, this.y);
    ctx.lineTo(this.x + this.width / 2, this.y + this.height / 2);
    ctx.closePath();
    ctx.fill();

    // Stripes
    ctx.strokeStyle = '#000080';
    ctx.lineWidth = 2;
    for (let i = 1; i <= 3; i++) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.width / 3 * i / 2, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Eye
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(this.x - this.width / 4, this.y - this.height / 4, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}