import { BaseFish } from './BaseFish.js';

export class Pufferfish extends BaseFish {
  constructor(canvasWidth, waterLevel) {
    super(canvasWidth, waterLevel, {
      width: 45,
      height: 45,
      speed: 1.2,
      points: 30,
      color: '#FFD700',
      finColor: '#FFA500'
    });
  }

  draw(ctx) {
    // Spikes
    ctx.strokeStyle = '#B8860B';
    ctx.lineWidth = 2;
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 8) {
      const spikeLength = this.width / 3;
      ctx.beginPath();
      ctx.moveTo(
        this.x + Math.cos(angle) * this.width / 2,
        this.y + Math.sin(angle) * this.height / 2
      );
      ctx.lineTo(
        this.x + Math.cos(angle) * (this.width / 2 + spikeLength),
        this.y + Math.sin(angle) * (this.height / 2 + spikeLength)
      );
      ctx.stroke();
    }

    // Body
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2);
    ctx.fill();

    // Patterns
    ctx.strokeStyle = '#DAA520';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(
        this.x,
        this.y,
        this.width / 3 + (i * 5),
        Math.PI / 4,
        Math.PI * 3/4
      );
      ctx.stroke();
    }

    // Eyes
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(this.x - this.width / 4, this.y - this.height / 4, 3, 0, Math.PI * 2);
    ctx.fill();

    // Fins
    ctx.fillStyle = this.finColor;
    // Top fin
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.height / 2);
    ctx.quadraticCurveTo(
      this.x,
      this.y - this.height,
      this.x + this.width / 4,
      this.y - this.height / 2
    );
    ctx.fill();
    // Bottom fin
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.height / 2);
    ctx.quadraticCurveTo(
      this.x,
      this.y + this.height,
      this.x + this.width / 4,
      this.y + this.height / 2
    );
    ctx.fill();
  }
}