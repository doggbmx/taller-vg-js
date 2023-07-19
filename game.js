const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");

window.addEventListener("load", renderCanvas);
window.addEventListener("resize", setCanvasSize);

// global variables
let canvasSize;
let elementsSize;

function setCanvasSize() {
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.75;
  } else {
    canvasSize = window.innerHeight * 0.75;
  }

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10;

  startGame();
}

function startGame() {
  game.font = elementsSize + "px Verdana";
  game.textAlign = "end";

  // THIS WAS A TOUGH ONE
  for (let i = 1; i <= 10; i++) {
    // game.fillText(emojis["X"], elementsSize * i, elementsSize * i);
    for (let j = 1; j <= 10; j++) {
      game.fillText(emojis["X"], elementsSize * i + 5, elementsSize * j);
    }
  }
}

function renderCanvas() {
  setCanvasSize();
  startGame();
}
