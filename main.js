const score = document.querySelector('.score'),
  start = document.querySelector('.start'),
  gameArea = document.querySelector('.game-area'),
  car = document.createElement('div');
car.classList.add('car');

const randomEnemy = [
  'url(./image/aquarius.png)',
  'url(./image/player.png)',
  'url(./image/purple.png)',
  'url(./image/enemy2.png)',
  'url(./image/green.png)',
];

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};

const setting = {
  start: false,
  score: 0,
  speed: 4,
  traffic: 6,
};

function getQuantityElements(heightElement) {
  return document.documentElement.clientHeight / heightElement + 1;
}

function startGame() {
  start.classList.add('hide');

  for (let i = 0; i < getQuantityElements(125); i++) {
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.top = `${i * 125}px`;
    line.y = i * 125;
    gameArea.appendChild(line);
  }

  for (let i = 0; i < getQuantityElements(50 * setting.traffic); i++) {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.y = -50 * setting.traffic * (i + 1);
    enemy.style.left = `${Math.floor(
      Math.random() * (gameArea.offsetWidth - 50)
    )}px`;
    enemy.style.top = `${enemy.y}px`;
    enemy.style.background = `transparent ${getRandomEnemyBackground()} center / cover no-repeat`;
    gameArea.appendChild(enemy);
  }

  setting.start = true;
  gameArea.appendChild(car);
  setting.x = car.offsetLeft;
  setting.y = car.offsetTop;
  requestAnimationFrame(playGame);
}

function playGame() {
  if (setting.start) {
    moveRoad();
    moveEnemy();
    if (keys.ArrowLeft && setting.x > 0) {
      setting.x -= setting.speed;
    }

    if (keys.ArrowRight && setting.x < gameArea.offsetWidth - car.offsetWidth) {
      setting.x += setting.speed;
    }

    if (keys.ArrowUp && setting.y > 0) {
      setting.y -= setting.speed;
    }

    if (
      keys.ArrowDown &&
      setting.y < gameArea.offsetHeight - car.offsetHeight
    ) {
      setting.y += setting.speed;
    }

    car.style.left = `${setting.x}px`;
    car.style.top = `${setting.y}px`;

    requestAnimationFrame(playGame);
  }
}

function startRun(e) {
  e.preventDefault();
  keys[e.key] = true;
}

function stopRun(e) {
  e.preventDefault();
  keys[e.key] = false;
}

function moveRoad() {
  let lines = document.querySelectorAll('.line');
  lines.forEach((line) => {
    line.y += setting.speed;
    line.style.top = `${line.y}px`;

    if (line.y > document.documentElement.clientHeight) {
      line.y = -100;
    }
  });
}

function moveEnemy() {
  const enemies = document.querySelectorAll('.enemy');
  enemies.forEach((enemy) => {
    enemy.y += setting.speed / 2;
    enemy.style.top = `${enemy.y}px`;
    if (enemy.y > document.documentElement.clientHeight) {
      enemy.y = -100 * setting.traffic;
      enemy.style.left = `${Math.floor(
        Math.random() * (gameArea.offsetWidth - 50)
      )}px`;
    }
  });
}

function getRandomEnemyBackground() {
  return randomEnemy[Math.floor(Math.random() * randomEnemy.length)];
}
