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

  const map = maps[0];
  // el metodo split basicamente separa los elementos segun lo que le indiquemos
  //   y devuelve un array con los elementos separados
  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map((row) => row.trim().split(""));

  // THIS WAS A TOUGH ONE
  for (let row = 1; row <= 10; row++) {
    // game.fillText(emojis["X"], elementsSize * i, elementsSize * i);
    for (let col = 1; col <= 10; col++) {
      game.fillText(
        emojis[mapRowCols[row - 1][col - 1]],
        elementsSize * col,
        elementsSize * row
      );
    }
  }
}

function renderCanvas() {
  setCanvasSize();
  startGame();
}
