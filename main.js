import './style.css';
import { Game } from './src/game/Game.js';
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './src/game/constants.js';

const canvas = document.createElement('canvas');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
document.querySelector('#app').innerHTML = '';
document.querySelector('#app').appendChild(canvas);

let game = new Game(canvas);

canvas.addEventListener('click', () => {
  if (game.gameOver) {
    game.restart();
  }
});

function gameLoop() {
  game.update();
  game.draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();