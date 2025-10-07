let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const statusText = document.getElementById("status");
const boardDiv = document.getElementById("game-board");

function createBoard() {
  boardDiv.innerHTML = "";
  board.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.dataset.index = index;
    cellDiv.innerText = cell;
    cellDiv.addEventListener("click", handleClick);
    boardDiv.appendChild(cellDiv);
  });
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || board[index] !== "") return;
 board[index] = currentPlayer;
  createBoard();
  if (checkWinner()) {
    statusText.innerText = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  } else if (board.every(cell => cell !== "")) {
    statusText.innerText = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "Y" : "X";
  statusText.innerText = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return winCombos.some(combo => {
    const [a, b, c] = combo;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.innerText = `Player ${currentPlayer}'s turn`;
  createBoard();
}

createBoard();