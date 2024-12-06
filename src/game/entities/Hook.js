import { SWING_SPEED, SWING_AMPLITUDE, CANVAS_HEIGHT, WATER_LEVEL } from '../constants.js';

export class Hook {
  constructor(startX, startY) {
    this.baseX = startX;
    this.baseY = startY;
    this.x = startX;
    this.y = startY;
    this.angle = 0;
    this.swingAngle = 0;
    this.isDescending = false;
    this.isReturning = false;
    this.speed = 3;
    this.hookSize = 15;
    this.lineLength = 40;
    this.maxLineLength = CANVAS_HEIGHT - WATER_LEVEL;
    this.castAngle = 0;
    this.castVelocityX = 0;
    this.castVelocityY = 0;
  }

  update() {
    if (!this.isDescending && !this.isReturning) {
      // Swinging motion
      this.swingAngle += SWING_SPEED;
      const swingX = Math.sin(this.swingAngle) * SWING_AMPLITUDE;
      
      this.x = this.baseX + swingX;
      this.y = this.baseY + 40;
      this.lineLength = 40;
      
      // Store current angle for casting
      this.castAngle = Math.atan2(this.y - this.baseY, this.x - this.baseX);
    } else if (this.isDescending) {
      // Move in the direction of the cast
      this.castVelocityY += 0.2; // Gravity effect
      this.x += this.castVelocityX;
      this.y += this.castVelocityY;
      
      // Calculate line length
      this.lineLength = Math.sqrt(
        Math.pow(this.x - this.baseX, 2) + 
        Math.pow(this.y - this.baseY, 2)
      );
      
      // Check if hit bottom or max length
      if (this.y > CANVAS_HEIGHT - 20 || this.lineLength > this.maxLineLength) {
        this.isDescending = false;
        this.isReturning = true;
      }
    } else if (this.isReturning) {
      // Return to swinging position
      const targetX = this.baseX;
      const targetY = this.baseY + 40;
      
      const dx = targetX - this.x;
      const dy = targetY - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 5) {
        this.x = targetX;
        this.y = targetY;
        this.isReturning = false;
        this.castVelocityX = 0;
        this.castVelocityY = 0;
      } else {
        this.x += (dx / distance) * this.speed;
        this.y += (dy / distance) * this.speed;
      }
    }
  }

  cast() {
    if (!this.isDescending && !this.isReturning) {
      this.isDescending = true;
      
      // Calculate initial velocities based on current swing angle
      const castSpeed = 8;
      this.castVelocityX = Math.cos(this.castAngle) * castSpeed;
      this.castVelocityY = Math.sin(this.castAngle) * castSpeed;
    }
  }

  draw(ctx) {
    // Draw fishing line
    ctx.beginPath();
    ctx.moveTo(this.baseX, this.baseY);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw hook
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    // Vertical part of hook
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.hookSize);
    
    // Hook curve
    ctx.arc(
      this.x - (this.hookSize / 2),
      this.y + this.hookSize,
      this.hookSize / 2,
      0,
      Math.PI,
      false
    );
    
    // Sharp point
    ctx.lineTo(
      this.x - this.hookSize - 2,
      this.y + this.hookSize - (this.hookSize / 3)
    );
    ctx.stroke();

    // Add barb
    ctx.beginPath();
    ctx.moveTo(this.x - this.hookSize - 2, this.y + this.hookSize - (this.hookSize / 3));
    ctx.lineTo(this.x - this.hookSize + 3, this.y + this.hookSize - (this.hookSize / 2));
    ctx.stroke();
  }

  reset() {
    this.x = this.baseX;
    this.y = this.baseY + 40;
    this.lineLength = 40;
    this.isDescending = false;
    this.isReturning = false;
    this.castVelocityX = 0;
    this.castVelocityY = 0;
  }
}