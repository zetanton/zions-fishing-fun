import { BaseFish } from './BaseFish.js';

export class Swordfish extends BaseFish {
  constructor(canvasWidth, waterLevel) {
    super(canvasWidth, waterLevel, {
      width: 70,
      height: 25,
      speed: 2,
      points: 15,
      color: '#4169E1',
      finColor: '#1E90FF'
    });
  }

  draw(ctx) {
    // Sword
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x - this.width / 2, this.y);
    ctx.lineTo(this.x - this.width, this.y);
    ctx.lineTo(this.x - this.width / 1.2, this.y + 2);
    ctx.closePath();
    ctx.fill();

    // Body
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.width / 2, this.height / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Dorsal fin
    ctx.fillStyle = this.finColor;
    ctx.beginPath();
    ctx.moveTo(this.x - this.width / 4, this.y - this.height / 2);
    ctx.lineTo(this.x + this.width / 4, this.y - this.height * 1.2);
    ctx.lineTo(this.x + this.width / 2, this.y - this.height / 2);
    ctx.closePath();
    ctx.fill();

    // Tail
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2, this.y - this.height / 2);
    ctx.lineTo(this.x + this.width, this.y - this.height);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.lineTo(this.x + this.width / 2, this.y + this.height / 2);
    ctx.closePath();
    ctx.fill();

    // Eye
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(this.x - this.width / 4, this.y - this.height / 6, 3, 0, Math.PI * 2);
    ctx.fill();

    // Gill detail
    ctx.strokeStyle = '#2B4F81';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(this.x - this.width / 6, this.y, this.height / 3, -Math.PI / 4, Math.PI / 4);
    ctx.stroke();
  }
}