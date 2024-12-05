const taco = document.getElementById('taco');
const gameContainer = document.getElementById('game-container');
const scoreElement = document.getElementById('score');

let tacoBottom = 300; // Starting position
let gravity = 2;
let isGameOver = false;
let score = 0;

// Function to make taco jump
function jump() {
  if (!isGameOver) {
    tacoBottom += 50;
  }
}

// Key listener for jump
document.addEventListener('keydown', () => {
  jump();
});

// Game loop
function startGame() {
  tacoBottom -= gravity;
  taco.style.bottom = tacoBottom + 'px';
  checkCollision();
}

let gameInterval = setInterval(startGame, 20);

// Generate pipes
function generatePipes() {
  const pipeContainer = document.createElement('div');
  const pipeTop = document.createElement('div');
  const pipeBottom = document.createElement('div');

  pipeContainer.classList.add('pipe-container');
  pipeTop.classList.add('pipe', 'pipe-top');
  pipeBottom.classList.add('pipe', 'pipe-bottom');

  const randomHeight = Math.random() * 200 + 100;
  pipeTop.style.height = randomHeight + 'px';
  pipeBottom.style.height = (600 - randomHeight - 150) + 'px';

  pipeContainer.appendChild(pipeTop);
  pipeContainer.appendChild(pipeBottom);
  gameContainer.appendChild(pipeContainer);

  let pipePosition = window.innerWidth;
  pipeContainer.style.left = pipePosition + 'px';

  const movePipe = setInterval(() => {
    if (isGameOver) {
      clearInterval(movePipe);
      return;
    }

    pipePosition -= 5;
    pipeContainer.style.left = pipePosition + 'px';

    if (pipePosition < -60) {
      pipeContainer.remove();
      clearInterval(movePipe);
      score++;
      scoreElement.textContent = `Score: ${score}`;
    }

    if (pipePosition