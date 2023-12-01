const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const startButton = document.getElementById("explanation-button");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
let circleTurn;

restartButton.addEventListener("click", startGame);
startButton.addEventListener("click", startGame);

document.getElementById("explanation").style.visibility = "visible";

function startGame() {
  document.getElementById("explanation").style.visibility = "hidden";
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false); // Player wins
  } else if (isDraw()) {
    endGame(true); // Draw
  } else {
    swapTurns();
    setBoardHoverClass();
    setTimeout(makeAIMove, 500);
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "⚪️" : "❌"} Wins!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function makeAIMove() {
  const availableCells = Array.from(cellElements).filter(
    (cell) =>
      !cell.classList.contains(X_CLASS) &&
      !cell.classList.contains(CIRCLE_CLASS)
  );

  if (availableCells.length > 0) {
    const bestMove = minimax(boardState(), 0, !circleTurn);
    let chosenCell;

    if (bestMove.index !== undefined) {
      chosenCell = cellElements[bestMove.index];
    } else {
      chosenCell = null; 
    }

    if (chosenCell === null) {
      const randomIndex = Math.floor(Math.random() * availableCells.length);
      chosenCell = availableCells[randomIndex];
    }

    console.log(chosenCell);

    console.log(chosenCell);
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(chosenCell, currentClass);
    chosenCell.removeEventListener("click", handleClick);

    // Check for a win or draw after the AI move
    if (checkWin(currentClass)) {
      endGame(false); // AI wins
    } else if (isDraw()) {
      endGame(true); // Draw
    } else {
      swapTurns(); // Switch turns to the human player
      setBoardHoverClass();
    }
  }
}

// Function to calculate the minimax score for each possible move
function minimax(board, depth, isMaximizing) {
  const scores = {
    X: -1,
    O: 1,
    draw: 0,
  };

  if (checkWin(X_CLASS)) {
    return { score: scores.X - depth };
  }

  if (checkWin(CIRCLE_CLASS)) {
    return { score: scores.O + depth };
  }

  if (isDraw()) {
    return { score: scores.draw };
  }

  const availableMoves = getAvailableMoves(board);
  const moves = [];

  availableMoves.forEach((move) => {
    const newBoard = [...board];
    newBoard[move] = isMaximizing ? CIRCLE_CLASS : X_CLASS;

    const result = minimax(newBoard, depth + 1, !isMaximizing);
    moves.push({
      index: move,
      score: result.score,
    });
  });

  return isMaximizing
    ? moves.reduce((max, move) => (move.score > max.score ? move : max), {
        score: -Infinity,
      })
    : moves.reduce((min, move) => (move.score < min.score ? move : min), {
        score: Infinity,
      });
}

// Function to get the current state of the board
function boardState() {
  return Array.from(cellElements).map((cell) => {
    if (cell.classList.contains(X_CLASS)) {
      return "X";
    } else if (cell.classList.contains(CIRCLE_CLASS)) {
      return "O";
    } else {
      return "";
    }
  });
}

// Function to get available moves on the current board
function getAvailableMoves(board) {
  return board.reduce((moves, cell, index) => {
    if (cell === "") {
      moves.push(index);
    }
    return moves;
  }, []);
}
