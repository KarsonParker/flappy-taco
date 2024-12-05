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
    taco.style.bottom = tacoBottom + 'px';
  }
}

// Key listener for jump
document.addEventListener('keydown', jump);

// Game loop
function startGame() {
  tacoBottom -= gravity;
  taco.style.bottom = tacoBottom + 'px';
  checkCollision();
}

let gameInterval = setInterval(startGame, 20);

// Generate pipes
function generatePipes() {
  const pipeTop = document.createElement('div');
  const pipeBottom = document.createElement('div');

  pipeTop.classList.add('pipe', 'pipe-top');
  pipeBottom.classList.add('pipe', 'pipe-bottom');

  const randomHeight = Math.random() * 200 + 100;
  pipeTop.style.height = randomHeight + 'px';
  pipeBottom.style.height = (600 - randomHeight - 150) + 'px';

  const pipeContainer = document.createElement('div');
  pipeContainer.appendChild(pipeTop);
  pipeContainer.appendChild(pipeBottom);
  gameContainer.appendChild(pipeContainer);

  let pipePosition = window.innerWidth;
  pipeContainer.style.position = 'absolute';
  pipeContainer.style.left = pipePosition + 'px';

  const movePipe = setInterval(() => {
    if (isGameOver) {
      clearInterval(movePipe);
      pipeContainer.remove();
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

    if (
      pipePosition < 150 &&
      pipePosition > 90 &&
      (tacoBottom < parseInt(pipeBottom.style.height) ||
        tacoBottom > 600 - parseInt(pipeTop.style.height))
    ) {
      endGame();
    }
  }, 20);

  setTimeout(generatePipes, 2000);
}

// Collision detection
function checkCollision() {
  if (tacoBottom <= 0) {
    endGame();
  }
}

// End game
function endGame() {
  clearInterval(gameInterval);
  isGameOver = true;
  alert(`Game Over! Your final score was ${score}`);
  location.reload(); // Reload the page to restart the game
}

// Start pipe generation
generatePipes();