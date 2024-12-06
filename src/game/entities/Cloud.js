import { CANVAS_WIDTH } from '../constants.js';

export class Cloud {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 0.2 + Math.random() * 0.3;
    this.segments = [];
    
    // Create 3-5 cloud segments with varying sizes
    const numSegments = 3 + Math.floor(Math.random() * 3);
    const baseSize = 20 + Math.random() * 40;
    
    for (let i = 0; i < numSegments; i++) {
      this.segments.push({
        offsetX: i * (baseSize * 0.7),
        offsetY: (Math.random() - 0.5) * 10,
        radius: baseSize * (0.7 + Math.random() * 0.6),
        alpha: 0.6 + Math.random() * 0.3
      });
    }
  }

  update() {
    this.x += this.speed;
    if (this.x > CANVAS_WIDTH + 100) {
      this.x = -100;
    }
  }

  draw(ctx) {
    this.segments.forEach(segment => {
      // Create gradient for each cloud segment
      const gradient = ctx.createRadialGradient(
        this.x + segment.offsetX,
        this.y + segment.offsetY,
        0,
        this.x + segment.offsetX,
        this.y + segment.offsetY,
        segment.radius
      );
      
      gradient.addColorStop(0, `rgba(255, 255, 255, ${segment.alpha})`);
      gradient.addColorStop(0.4, `rgba(255, 255, 255, ${segment.alpha * 0.9})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(
        this.x + segment.offsetX,
        this.y + segment.offsetY,
        segment.radius,
        0,
        Math.PI * 2
      );
      ctx.fill();
    });
  }
}