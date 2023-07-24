const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");
const spanLives = document.querySelector("#lives");

window.addEventListener("load", renderCanvas);
window.addEventListener("resize", setCanvasSize);

// global variables
let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;
const playerPosition = {
  x: undefined,
  y: undefined,
};
const giftPosition = {
  x: undefined,
  y: undefined,
};
let enemiesPositions = [];

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10;

  startGame();
}

function startGame() {
  game.font = elementsSize + "px Verdana";
  game.textAlign = "end";

  const map = maps[level];
  if (!map) {
    gameWin();
    return;
  }
  showLives();
  // el metodo split basicamente separa los elementos segun lo que le indiquemos
  //   y devuelve un array con los elementos separados
  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map((row) => row.trim().split(""));

  // THIS WAS A TOUGH ONE
  //   for (let row = 1; row <= 10; row++) {
  //     // game.fillText(emojis["X"], elementsSize * i, elementsSize * i);
  //     for (let col = 1; col <= 10; col++) {
  //       game.fillText(
  //         emojis[mapRowCols[row - 1][col - 1]],
  //         elementsSize * col,
  //         elementsSize * row
  //       );
  //     }
  //   }

  game.clearRect(0, 0, canvasSize, canvasSize);

  // limpiando el array de posiciones de enemigos
  enemiesPositions = [];

  // chupeting the code
  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);

      if (col == "O") {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
        }
      } else if (col == "I") {
        giftPosition.x = posX;
        giftPosition.y = posY;
        // console.log(giftPosition, playerPosition);
      } else if (col == "X") {
        enemiesPositions.push({ x: posX, y: posY });
      }

      game.fillText(emoji, posX, posY);
    });
  });

  movePlayer();
}

function movePlayer() {
  if (
    Math.floor(playerPosition.x) == Math.floor(giftPosition.x) &&
    Math.floor(playerPosition.y) == Math.floor(giftPosition.y)
  ) {
    levelWin();
    console.log("you win");
    // game.fillText(emojis["WIN"], giftPosition.x, giftPosition.y);
  }

  // THIS IS THE TEACHER'S METHOD
  const enemyCollision = enemiesPositions.find((enemy) => {
    if (
      Math.floor(enemy.x) == Math.floor(playerPosition.x) &&
      Math.floor(enemy.y) == Math.floor(playerPosition.y)
    ) {
      return true;
    } else {
      return false;
    }
  });

  if (enemyCollision) {
    // console.log("you lose");
    levelFail();
  }

  // THIS IS MY METHOD
  // enemiesPositions.forEach((enemy) => {
  //   if (
  //     Math.floor(playerPosition.x) == Math.floor(enemy.x) &&
  //     Math.floor(playerPosition.y) == Math.floor(enemy.y)
  //   ) {
  //     console.log("you lose");
  //     // game.fillText(emojis["GAME_OVER"], enemy.x, enemy.y);
  //   }
  // });

  game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

function levelWin() {
  level++;
  startGame();
}

function levelFail() {
  lives--;
  if (lives <= 0) {
    level = 0;
    lives = 3;
  }
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function showLives() {
  // TEACHER'S METHOD
  // const heartArray = Array(lives).fill(emojis.HEART); // crea un array con la cantidad de elementos que le indiquemos
  // spanLives.innerHTML = "";
  // heartArray.forEach((heart) => spanLives.append(heart));

  // MY METHOD
  spanLives.innerText = emojis.HEART.repeat(lives);
}

function gameWin() {
  console.log("you win the game, now go get a life");
}

function renderCanvas() {
  setCanvasSize();
  startGame();
}

window.addEventListener("keydown", moveByKeys);

btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

function moveByKeys(event) {
  if (event.key == "ArrowUp") moveUp();
  else if (event.key == "ArrowLeft") moveLeft();
  else if (event.key == "ArrowRight") moveRight();
  else if (event.key == "ArrowDown") moveDown();
}

function moveUp() {
  console.log("up");
  // THIS DOES NOT WORK
  // if (Math.floor(playerPosition.y) - elementsSize < elementsSize) {
  //   console.log(playerPosition.y - elementsSize);
  //   console.log("no se puede");
  // } else {
  //   playerPosition.y -= elementsSize;
  // }

  // THIS WORKS FINE AS HELL
  if (Math.floor(playerPosition.y) > elementsSize) {
    playerPosition.y -= elementsSize;
  }
  startGame();
}
function moveLeft() {
  console.log("left");
  // if (playerPosition.x - elementsSize < elementsSize) {
  //   console.log("no se puede");
  // } else {
  //   playerPosition.x -= elementsSize;
  // }
  if (Math.floor(playerPosition.x) > elementsSize) {
    playerPosition.x -= elementsSize;
  }
  startGame();
}
function moveRight() {
  console.log("right");
  // if (playerPosition.x + elementsSize > canvasSize - elementsSize) {
  //   console.log("no se puede");
  // } else {
  //   playerPosition.x += elementsSize;
  // }
  if (Math.ceil(playerPosition.x) < 10 * elementsSize) {
    playerPosition.x += elementsSize;
  }
  startGame();
}
function moveDown() {
  console.log("down");
  // playerPosition.y += elementsSize;
  if (Math.ceil(playerPosition.y) < 10 * elementsSize) {
    playerPosition.y += elementsSize;
  }
  startGame();
}
