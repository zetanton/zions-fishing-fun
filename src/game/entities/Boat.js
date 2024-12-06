export class Boat {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 160;
    this.height = 40;
  }

  draw(ctx) {
    // Draw sail first (behind everything)
    // Draw mast (on the left side)
    ctx.fillStyle = '#654321';
    ctx.fillRect(this.x + 20, this.y - 120, 8, 120);

    // Draw sail (red triangular sail)
    ctx.fillStyle = '#FF4444';
    ctx.beginPath();
    ctx.moveTo(this.x + 28, this.y - 115); // Top right of sail
    ctx.lineTo(this.x - 40, this.y - 70); // Left point of sail
    ctx.lineTo(this.x + 28, this.y - 25); // Bottom right of sail
    ctx.closePath();
    ctx.fill();

    // Draw sail details
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x + 28, this.y - 115);
    ctx.lineTo(this.x - 40, this.y - 70);
    ctx.lineTo(this.x + 28, this.y - 25);
    ctx.stroke();

    // Draw rope details
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.x - 40, this.y - 70); // From sail point
    ctx.lineTo(this.x + 60, this.y - 5); // To raft
    ctx.stroke();

    // Draw logs (tighter together)
    const logHeight = 20;
    const logSpacing = 22; // Reduced spacing
    const numLogs = 7; // More logs
    
    for (let i = 0; i < numLogs; i++) {
      // Log body
      ctx.fillStyle = '#8B4513';
      ctx.beginPath();
      ctx.roundRect(
        this.x + (i * logSpacing),
        this.y - 5,
        20, // Slightly narrower logs
        logHeight,
        5
      );
      ctx.fill();

      // Log grain details
      ctx.strokeStyle = '#654321';
      ctx.lineWidth = 1;
      for (let j = 0; j < 3; j++) {
        ctx.beginPath();
        ctx.moveTo(this.x + (i * logSpacing), this.y + (j * 6));
        ctx.lineTo(this.x + (i * logSpacing) + 20, this.y + (j * 6));
        ctx.stroke();
      }
    }

    // Draw rope bindings
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 2;
    for (let i = 0; i < 2; i++) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y + (i * 10));
      ctx.lineTo(this.x + (numLogs * logSpacing), this.y + (i * 10));
      ctx.stroke();
    }
  }
}