import { BaseFish } from './BaseFish.js';

export class Clownfish extends BaseFish {
  constructor(canvasWidth, waterLevel) {
    super(canvasWidth, waterLevel, {
      width: 40,
      height: 25,
      speed: 1.5,
      points: 30,
      color: '#FF6633', // Bright orange
      finColor: '#FF4500' // Darker orange for fins
    });
  }

  draw(ctx) {
    // Save the context state
    ctx.save();
    
    // Create clipping region for the body
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.width / 2, this.height / 2, 0, 0, Math.PI * 2);
    ctx.clip();

    // Main body shape
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.width / 2, this.height / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // White curved stripes (will be clipped to body shape)
    const stripePositions = [-0.3, 0, 0.3]; // Relative positions for stripes
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 6; // Thicker stripes
    
    stripePositions.forEach(pos => {
      const stripeX = this.x + (this.width * pos);
      ctx.beginPath();
      ctx.moveTo(stripeX, this.y - this.height / 2);
      
      // Create curved stripe using bezier curve
      ctx.bezierCurveTo(
        stripeX - this.width / 8, this.y, // First control point
        stripeX + this.width / 8, this.y, // Second control point
        stripeX, this.y + this.height / 2 // End point
      );
      
      ctx.stroke();
    });

    // Restore context for drawing outside elements
    ctx.restore();

    // Dark outline for body
    ctx.strokeStyle = '#993300';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.width / 2, this.height / 2, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Fins
    ctx.fillStyle = this.finColor;
    
    // Top fin
    ctx.beginPath();
    ctx.moveTo(this.x - this.width / 6, this.y - this.height / 2);
    ctx.quadraticCurveTo(
      this.x,
      this.y - this.height * 1.2,
      this.x + this.width / 6,
      this.y - this.height / 2
    );
    ctx.fill();
    ctx.strokeStyle = '#993300';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Bottom fin
    ctx.beginPath();
    ctx.moveTo(this.x - this.width / 6, this.y + this.height / 2);
    ctx.quadraticCurveTo(
      this.x,
      this.y + this.height * 1.2,
      this.x + this.width / 6,
      this.y + this.height / 2
    );
    ctx.fill();
    ctx.stroke();

    // Tail
    ctx.fillStyle = this.finColor;
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2, this.y - this.height / 3);
    ctx.quadraticCurveTo(
      this.x + this.width,
      this.y,
      this.x + this.width / 2,
      this.y + this.height / 3
    );
    ctx.fill();
    ctx.strokeStyle = '#993300';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Eye white outline
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(this.x - this.width / 3, this.y - this.height / 6, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Eye black center
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(this.x - this.width / 3, this.y - this.height / 6, 2.5, 0, Math.PI * 2);
    ctx.fill();
    
    // Eye highlight
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(this.x - this.width / 3 - 1, this.y - this.height / 6 - 1, 1, 0, Math.PI * 2);
    ctx.fill();
  }
}