const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const startButton = document.getElementById("explanation-button")
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

restartButton.addEventListener('click', startGame);
startButton.addEventListener('click', startGame);

document.getElementById("explanation").style.visibility = "visible";

function startGame() {
  document.getElementById("explanation").style.visibility = "hidden";
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false); // Player wins
  } else if (isDraw()) {
    endGame(true);  // Draw
  } else {
    swapTurns();
    setBoardHoverClass();
    setTimeout(makeAIMove, 500);
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "⚪️" : "❌"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

// Function to make a move for the AI opponent
function makeAIMove() {
  const availableCells = Array.from(cellElements).filter(cell => !cell.classList.contains(X_CLASS) && !cell.classList.contains(CIRCLE_CLASS));

  if (availableCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const randomCell = availableCells[randomIndex];

    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(randomCell, currentClass);
    randomCell.removeEventListener('click', handleClick);

    // Check for a win or draw after the AI move
    if (checkWin(currentClass)) {
      endGame(false); // AI wins
    } else if (isDraw()) {
      endGame(true);  // Draw
    } else {
      swapTurns();    // Switch turns to the human player
      setBoardHoverClass();
    }
  }
}
