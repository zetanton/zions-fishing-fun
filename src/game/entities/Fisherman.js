import { FishermanFace } from './FishermanFace.js';

export class Fisherman {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 80;
    this.rodTipX = this.x + 160;
    this.rodTipY = this.y - 80;
    this.reelAngle = 0;
    this.face = new FishermanFace();
  }

  draw(ctx) {
    // Draw back hair first (made wider and fuller)
    ctx.fillStyle = '#8B4513';
    ctx.beginPath();
    ctx.moveTo(this.x + 10, this.y - 35);
    ctx.bezierCurveTo(
      this.x + 5, this.y - 45,
      this.x + 55, this.y - 45,
      this.x + 50, this.y - 35
    );
    ctx.bezierCurveTo(
      this.x + 55, this.y - 25,
      this.x + 53, this.y - 15,
      this.x + 50, this.y - 5
    );
    ctx.bezierCurveTo(
      this.x + 45, this.y + 5,
      this.x + 15, this.y + 5,
      this.x + 10, this.y - 5
    );
    ctx.bezierCurveTo(
      this.x + 7, this.y - 15,
      this.x + 5, this.y - 25,
      this.x + 10, this.y - 35
    );
    ctx.fill();

    // Draw legs
    ctx.fillStyle = '#4A4A4A';
    ctx.fillRect(this.x + 15, this.y + 15, 12, 30);
    ctx.fillRect(this.x + 33, this.y + 15, 12, 30);

    // Draw boots
    ctx.fillStyle = '#000000';
    ctx.fillRect(this.x + 13, this.y + 40, 16, 8);
    ctx.fillRect(this.x + 31, this.y + 40, 16, 8);

    // Draw body (green shirt)
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(this.x + 10, this.y - 15, 40, 35);

    // Draw arms
    ctx.fillStyle = '#FFE4C4';
    ctx.fillRect(this.x + 5, this.y - 10, 10, 25);
    ctx.fillRect(this.x + 45, this.y - 10, 25, 10);

    // Draw head
    ctx.fillStyle = '#FFE4C4';
    ctx.beginPath();
    ctx.arc(this.x + 30, this.y - 25, 14, 0, Math.PI * 2);
    ctx.fill();

    // Draw front bangs
    ctx.fillStyle = '#8B4513';
    ctx.beginPath();
    ctx.moveTo(this.x + 12, this.y - 35);
    ctx.bezierCurveTo(
      this.x + 25, this.y - 45,  // Raised control point
      this.x + 35, this.y - 45,  // Raised control point
      this.x + 48, this.y - 35
    );
    ctx.bezierCurveTo(
      this.x + 46, this.y - 32,
      this.x + 45, this.y - 30,
      this.x + 43, this.y - 29
    );
    ctx.bezierCurveTo(
      this.x + 35, this.y - 30,
      this.x + 25, this.y - 30,
      this.x + 17, this.y - 29
    );
    ctx.bezierCurveTo(
      this.x + 15, this.y - 30,
      this.x + 14, this.y - 32,
      this.x + 12, this.y - 35
    );
    ctx.fill();

    // Draw face (eyes, mouth)
    this.face.update();
    this.face.draw(ctx, this.x, this.y);

    // Draw fishing rod (longer and angled up more)
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 4;
    
    // Main rod
    ctx.beginPath();
    ctx.moveTo(this.x + 65, this.y - 5); // Start at hand
    ctx.lineTo(this.rodTipX, this.rodTipY); // Extend up and right more
    ctx.stroke();

    // Rod handle
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#654321';
    ctx.beginPath();
    ctx.moveTo(this.x + 65, this.y - 5);
    ctx.lineTo(this.x + 55, this.y - 5);
    ctx.stroke();

    // Draw reel base
    ctx.fillStyle = '#4A4A4A';
    ctx.beginPath();
    ctx.ellipse(this.x + 75, this.y - 5, 10, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Draw reel spool
    ctx.fillStyle = '#666';
    ctx.beginPath();
    ctx.ellipse(this.x + 75, this.y - 5, 8, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Draw reel handle
    this.reelAngle += 0.1;
    const handleX = this.x + 75 + Math.cos(this.reelAngle) * 8;
    const handleY = this.y - 5 + Math.sin(this.reelAngle) * 8;
    
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x + 75, this.y - 5);
    ctx.lineTo(handleX, handleY);
    ctx.stroke();

    // Handle knob
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(handleX, handleY, 3, 0, Math.PI * 2);
    ctx.fill();

    // Rod guides (line holders)
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#4A3728';
    for (let i = 0; i < 6; i++) {
      const guideX = this.x + 85 + (i * 15);
      const guideY = this.y - 15 - (i * 12);
      
      // Guide base
      ctx.beginPath();
      ctx.moveTo(guideX - 3, guideY);
      ctx.lineTo(guideX + 3, guideY);
      ctx.stroke();
      
      // Guide loop
      ctx.beginPath();
      ctx.arc(guideX, guideY - 3, 2, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  getRodTipPosition() {
    return {
      x: this.rodTipX,
      y: this.rodTipY
    };
  }

  setExpression(expression) {
    this.face.setExpression(expression);
  }
}