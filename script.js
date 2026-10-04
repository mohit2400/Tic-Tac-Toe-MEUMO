
var boxes = document.querySelectorAll(".box");
var statusText = document.getElementById("status");
var restartBtn = document.getElementById("restartBtn");
var scoreXText = document.getElementById("scoreX");
var scoreOText = document.getElementById("scoreO");
var scoreDrawText = document.getElementById("scoreDraw");


var board = ["", "", "", "", "", "", "", "", ""];
var currentPlayer = "X";
var gameOver = false;


var scoreX = 0;
var scoreO = 0;
var scoreDraw = 0;


var winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


function handleClick(event) {
  var box = event.target;
  var index = box.getAttribute("data-index");


  if (board[index] !== "" || gameOver) {
    return;
  }


  board[index] = currentPlayer;
  box.textContent = currentPlayer;
  box.classList.add(currentPlayer.toLowerCase());

  checkResult();
}

function checkResult() {

  for (var i = 0; i < winPatterns.length; i++) {
    var a = winPatterns[i][0];
    var b = winPatterns[i][1];
    var c = winPatterns[i][2];

    if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {

      boxes[a].classList.add("win");
      boxes[b].classList.add("win");
      boxes[c].classList.add("win");

      statusText.textContent = "Player " + currentPlayer + " wins! 🎉";
      gameOver = true;

      if (currentPlayer === "X") {
        scoreX++;
        scoreXText.textContent = scoreX;
      } else {
        scoreO++;
        scoreOText.textContent = scoreO;
      }
      return;
    }
  }


  if (board.indexOf("") === -1) {
    statusText.textContent = "It's a draw! 🤝";
    gameOver = true;
    scoreDraw++;
    scoreDrawText.textContent = scoreDraw;
    return;
  }


  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  statusText.textContent = "Player " + currentPlayer + "'s turn";
}


function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  statusText.textContent = "Player X's turn";

  for (var i = 0; i < boxes.length; i++) {
    boxes[i].textContent = "";
    boxes[i].classList.remove("x", "o", "win");
  }
}


for (var i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", handleClick);
}
restartBtn.addEventListener("click", restartGame);
