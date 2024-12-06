import { BaseFish } from './BaseFish.js';

export class Jellyfish extends BaseFish {
  constructor(canvasWidth, waterLevel) {
    super(canvasWidth, waterLevel, {
      width: 40,
      height: 50,
      speed: 0.5,
      points: 20,
      color: 'rgba(255, 255, 255, 0.7)',  // Translucent white
      finColor: 'rgba(255, 182, 193, 0.6)' // Light pink, semi-transparent
    });
    this.tentacleOffset = 0;
  }

  update() {
    super.update();
    this.tentacleOffset += 0.1;
  }

  draw(ctx) {
    // Save context for transparency
    ctx.save();
    ctx.globalAlpha = 0.7;

    // Bell (upside-down dome shape)
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.width / 2, Math.PI, Math.PI * 2, false); // Upside down half circle
    ctx.fill();

    // Inner bell details with gradient
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.width / 2
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 182, 193, 0.2)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.width / 2 * 0.8, Math.PI, Math.PI * 2, false);
    ctx.fill();

    // Tentacles
    ctx.strokeStyle = this.finColor;
    ctx.lineWidth = 2;
    const tentacleCount = 7;
    const spacing = this.width / (tentacleCount - 1);
    
    for (let i = 0; i < tentacleCount; i++) {
      const startX = this.x - this.width / 2 + (i * spacing);
      const startY = this.y;  // Start from the bell bottom
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      
      // Create flowing tentacle
      let currentY = startY;
      for (let j = 0; j < 4; j++) {
        const waveX = Math.sin(this.tentacleOffset + i + j) * 5;
        currentY += this.height / 6;
        
        ctx.quadraticCurveTo(
          startX + waveX,
          currentY - this.height / 12,
          startX,
          currentY
        );
      }
      ctx.stroke();
    }

    ctx.restore();
  }
}