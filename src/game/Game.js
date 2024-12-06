// Update the Game class to handle fisherman expressions
import { CANVAS_WIDTH, CANVAS_HEIGHT, WATER_LEVEL, FISH_SPAWN_RATE, BOMB_SPAWN_RATE, FISHERMAN_X, FISHERMAN_Y } from './constants.js';
import { Fisherman } from './entities/Fisherman.js';
import { Boat } from './entities/Boat.js';
import { Hook } from './entities/Hook.js';
import { Goldfish } from './entities/fish/Goldfish.js';
import { Swordfish } from './entities/fish/Swordfish.js';
import { Shark } from './entities/fish/Shark.js';
import { Jellyfish } from './entities/fish/Jellyfish.js';
import { Clownfish } from './entities/fish/Clownfish.js';
import { Bomb } from './entities/Bomb.js';
import { Cloud } from './entities/Cloud.js';

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.score = 0;
    this.gameOver = false;
    this.boat = new Boat(FISHERMAN_X - 20, WATER_LEVEL);
    this.fisherman = new Fisherman(FISHERMAN_X, FISHERMAN_Y);
    const rodTip = this.fisherman.getRodTipPosition();
    this.hook = new Hook(rodTip.x, rodTip.y);
    this.fishes = [];
    this.bombs = [];
    this.waveOffset = 0;
    
    // Create clouds with different heights and spacing
    this.clouds = Array(6).fill().map(() => new Cloud(
      Math.random() * CANVAS_WIDTH,
      Math.random() * (WATER_LEVEL * 0.7)
    ));
    
    this.setupEventListeners();
    this.startSpawning();
  }

  setupEventListeners() {
    this.canvas.addEventListener('click', () => {
      if (!this.gameOver) {
        this.hook.cast();
        this.fisherman.setExpression('surprised');
      } else {
        this.restart();
      }
    });
  }

  startSpawning() {
    setInterval(() => {
      if (!this.gameOver) {
        const fishTypes = [Goldfish, Swordfish, Shark, Jellyfish, Clownfish];
        const FishType = fishTypes[Math.floor(Math.random() * fishTypes.length)];
        this.fishes.push(new FishType(CANVAS_WIDTH, WATER_LEVEL));
      }
    }, FISH_SPAWN_RATE);

    setInterval(() => {
      if (!this.gameOver) {
        this.bombs.push(new Bomb(CANVAS_WIDTH, WATER_LEVEL));
      }
    }, BOMB_SPAWN_RATE);
  }

  update() {
    if (this.gameOver) return;

    const rodTip = this.fisherman.getRodTipPosition();
    this.hook.baseX = rodTip.x;
    this.hook.baseY = rodTip.y;
    
    this.hook.update();
    this.waveOffset += 0.05;

    // Update clouds
    this.clouds.forEach(cloud => cloud.update());
    
    // Update fish
    this.fishes.forEach((fish, index) => {
      fish.update();
      if (fish.isOffScreen()) {
        this.fishes.splice(index, 1);
      }
      if (fish.collidesWith(this.hook)) {
        this.score += fish.points;
        this.fishes.splice(index, 1);
        this.hook.reset();
        this.fisherman.setExpression('happy');
      }
    });

    // Update bombs
    this.bombs.forEach((bomb, index) => {
      bomb.update();
      if (bomb.isOffScreen()) {
        this.bombs.splice(index, 1);
      }
      if (bomb.collidesWith(this.hook)) {
        this.gameOver = true;
        this.fisherman.setExpression('surprised');
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw sky gradient that extends below water level
    const skyGradient = this.ctx.createLinearGradient(0, 0, 0, WATER_LEVEL + 50);
    skyGradient.addColorStop(0, '#87CEEB');    // Sky blue at top
    skyGradient.addColorStop(0.7, '#ADD8E6');  // Lighter blue
    skyGradient.addColorStop(1, '#B0E0E6');    // Powder blue near water
    
    this.ctx.fillStyle = skyGradient;
    this.ctx.fillRect(0, 0, CANVAS_WIDTH, WATER_LEVEL + 50);

    // Draw clouds
    this.clouds.forEach(cloud => cloud.draw(this.ctx));

    // Draw water with gradient
    const waterGradient = this.ctx.createLinearGradient(0, WATER_LEVEL, 0, CANVAS_HEIGHT);
    waterGradient.addColorStop(0, '#1E90FF');   // Dodger blue at top
    waterGradient.addColorStop(1, '#00008B');   // Dark blue at bottom
    
    this.ctx.fillStyle = waterGradient;
    this.ctx.beginPath();
    this.ctx.moveTo(0, WATER_LEVEL);

    // Draw waves
    for (let i = 0; i <= CANVAS_WIDTH; i += 30) {
      const offset = Math.sin(i * 0.02 + this.waveOffset) * 5;
      if (i === 0) {
        this.ctx.lineTo(0, WATER_LEVEL + offset);
      } else {
        this.ctx.quadraticCurveTo(
          i - 15,
          WATER_LEVEL + offset - 5,
          i,
          WATER_LEVEL + offset
        );
      }
    }

    this.ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT);
    this.ctx.lineTo(0, CANVAS_HEIGHT);
    this.ctx.closePath();
    this.ctx.fill();

    this.boat.draw(this.ctx);
    this.fisherman.draw(this.ctx);
    this.hook.draw(this.ctx);
    this.fishes.forEach(fish => fish.draw(this.ctx));
    this.bombs.forEach(bomb => bomb.draw(this.ctx));

    // Draw score
    this.ctx.fillStyle = '#000';
    this.ctx.font = '24px Arial';
    this.ctx.textAlign = 'left';
    this.ctx.fillText(`Score: ${this.score}`, 20, 40);

    if (this.gameOver) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      this.ctx.fillStyle = '#FFF';
      this.ctx.font = '48px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Game Over!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
      this.ctx.font = '24px Arial';
      this.ctx.fillText('Click to restart', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 50);
    }
  }

  restart() {
    this.score = 0;
    this.gameOver = false;
    this.fishes = [];
    this.bombs = [];
    this.hook.reset();
    this.fisherman.setExpression('normal');
  }
}