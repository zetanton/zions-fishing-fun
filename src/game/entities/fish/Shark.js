import { BaseFish } from './BaseFish.js';

export class Shark extends BaseFish {
  constructor(canvasWidth, waterLevel) {
    super(canvasWidth, waterLevel, {
      width: 70,
      height: 35,
      speed: 1,
      points: 25,
      color: '#708090',
      finColor: '#2F4F4F'
    });
  }

  draw(ctx) {
    // Dorsal fin
    ctx.fillStyle = this.finColor;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.height / 2);
    ctx.lineTo(this.x, this.y - this.height * 1.2);
    ctx.lineTo(this.x + this.width / 3, this.y - this.height / 2);
    ctx.closePath();
    ctx.fill();

    // Body
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.width / 2, this.height / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Tail
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2, this.y - this.height / 2);
    ctx.lineTo(this.x + this.width, this.y - this.height);
    ctx.lineTo(this.x + this.width, this.y);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.lineTo(this.x + this.width / 2, this.y + this.height / 2);
    ctx.closePath();
    ctx.fill();

    // Gills
    ctx.strokeStyle = '#4A4A4A';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(this.x - this.width / 4 + i * 10, this.y - this.height / 4);
      ctx.lineTo(this.x - this.width / 4 + i * 10, this.y + this.height / 4);
      ctx.stroke();
    }

    // Eye
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(this.x - this.width / 4, this.y - this.height / 4, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}