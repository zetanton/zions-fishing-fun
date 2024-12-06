export class FishermanFace {
  constructor() {
    this.blinkInterval = 3000 + Math.random() * 2000; // Random blink interval between 3-5 seconds
    this.lastBlinkTime = Date.now();
    this.isBlinking = false;
    this.blinkDuration = 150; // Duration of blink in milliseconds
    this.expression = 'normal'; // normal, happy, surprised
    this.expressionStartTime = Date.now();
    this.expressionDuration = 2000; // Duration to hold an expression
  }

  update() {
    const currentTime = Date.now();
    
    // Handle blinking
    if (!this.isBlinking && currentTime - this.lastBlinkTime > this.blinkInterval) {
      this.isBlinking = true;
      this.lastBlinkTime = currentTime;
    } else if (this.isBlinking && currentTime - this.lastBlinkTime > this.blinkDuration) {
      this.isBlinking = false;
      this.blinkInterval = 3000 + Math.random() * 2000; // Set new random interval
    }

    // Reset expression to normal after duration
    if (this.expression !== 'normal' && 
        currentTime - this.expressionStartTime > this.expressionDuration) {
      this.expression = 'normal';
    }
  }

  setExpression(expression) {
    this.expression = expression;
    this.expressionStartTime = Date.now();
  }

  draw(ctx, x, y, scale = 1) {
    // Eyes
    if (!this.isBlinking) {
      // Normal open eyes
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(x + 25 * scale, y - 25 * scale, 2 * scale, 0, Math.PI * 2);
      ctx.arc(x + 35 * scale, y - 25 * scale, 2 * scale, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Closed eyes
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x + 23 * scale, y - 25 * scale);
      ctx.lineTo(x + 27 * scale, y - 25 * scale);
      ctx.moveTo(x + 33 * scale, y - 25 * scale);
      ctx.lineTo(x + 37 * scale, y - 25 * scale);
      ctx.stroke();
    }

    // Draw mouth based on expression
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    switch (this.expression) {
      case 'happy':
        // Wide smile
        ctx.beginPath();
        ctx.arc(x + 30 * scale, y - 20 * scale, 5 * scale, 0, Math.PI);
        ctx.stroke();
        // Rosy cheeks
        ctx.fillStyle = 'rgba(255, 150, 150, 0.3)';
        ctx.beginPath();
        ctx.arc(x + 20 * scale, y - 20 * scale, 3 * scale, 0, Math.PI * 2);
        ctx.arc(x + 40 * scale, y - 20 * scale, 3 * scale, 0, Math.PI * 2);
        ctx.fill();
        break;
        
      case 'surprised':
        // Small O-shaped mouth
        ctx.beginPath();
        ctx.arc(x + 30 * scale, y - 20 * scale, 3 * scale, 0, Math.PI * 2);
        ctx.stroke();
        // Raised eyebrows
        if (!this.isBlinking) {
          ctx.beginPath();
          ctx.moveTo(x + 23 * scale, y - 29 * scale);
          ctx.lineTo(x + 27 * scale, y - 30 * scale);
          ctx.moveTo(x + 33 * scale, y - 30 * scale);
          ctx.lineTo(x + 37 * scale, y - 29 * scale);
          ctx.stroke();
        }
        break;
        
      default: // normal
        // Slight smile
        ctx.beginPath();
        ctx.arc(x + 30 * scale, y - 20 * scale, 5 * scale, 0.1 * Math.PI, 0.9 * Math.PI);
        ctx.stroke();
    }
  }
}