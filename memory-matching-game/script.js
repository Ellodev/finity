// TODO u could generate this list with just a list of every emoji once
const emojis = [
  "🍌",
  "🍌",
  "🍇",
  "🍇",
  "🍎",
  "🍎",
  "🥭",
  "🥭",
  "🍉",
  "🍉",
  "🍈",
  "🍈",
  "🍊",
  "🍊",
  "🍐",
  "🍐",
];
const selectedItems = [];
let openCards = [];
let completedSets = 0;
let tries = 0;
let clickable = true;
let seconds = 0;

document.getElementById("win-div").style.visibility = "hidden";
document.getElementById("win-title").style.visibility = "hidden";
document.getElementById("win-text").style.visibility = "hidden";
document.getElementById("timer").style.visibility = "hidden";
document.getElementById("game-div").style.visibility = "hidden";
document.getElementById("title").style.visibility = "hidden";
document.getElementById("moves").style.visibility = "hidden";
document.getElementById("completedSets").style.visibility = "hidden";
document.getElementById("game-table").style.visibility = "hidden";

document
  .getElementById("explanation-button")
  .addEventListener("click", startGame);

function startGame() {
  document.getElementById("explanation").style.visibility = "hidden";
  document.getElementById("timer").style.visibility = "visible";
  document.getElementById("game-div").style.visibility = "visible";
  document.getElementById("title").style.visibility = "visible";
  document.getElementById("moves").style.visibility = "visible";
  document.getElementById("completedSets").style.visibility = "visible";
  document.getElementById("game-table").style.visibility = "visible";
  document
    .getElementById("game-table")
    .addEventListener("click", betterListener);
  startTimer();
}

// Loop until the original array is empty
while (emojis.length > 0) {
  // Generate a random index within the current range of the items array
  const randomIndex = Math.floor(Math.random() * emojis.length);

  // Get the item at the random index
  const selectedItem = emojis.splice(randomIndex, 1)[0];

  // Add the selected item to the selectedItems array
  selectedItems.push(selectedItem);
}

// check if there is clieck on item that isn'nt completed yet
// check if item is open yet => abort
// show item

// check if 2 ites are open
// check if they are the same => mark as comeplete

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const betterListener = (event) => {
  let target = event.target;

  if (target === "") return;

  if (clickable === false) return;
  console.log(clickable);

  if (target.hasAttribute("completed")) return;

  if (openCards.find((openCardId) => openCardId === target.id)) return;

  target.textContent = selectedItems[target.id];
  openCards.push(target.id);

  if (openCards.length > 1) {
    let openCardA = document.getElementById(openCards[0]);
    let openCardB = document.getElementById(openCards[1]);

    tries++;
    document.getElementById("moves").innerHTML = tries + " moves";

    if (openCardA.textContent === openCardB.textContent) {
      openCardA.setAttribute("completed", "");
      openCardB.setAttribute("completed", "");
      completedSets++;
      document.getElementById("completedSets").innerHTML =
        completedSets + " completed Sets";
    } else {
      clickable = false;
      console.log(clickable);
      sleep(1000).then(() => {
        openCardA.textContent = "";
        openCardB.textContent = "";
        clickable = true;
        console.log(clickable);
      });
    }

    openCards = [];
  }

  console.log({ completedSets, tries });

  if (completedSets > 7) {
    // TODO add reset function
    document.getElementById("win-div").style.visibility = "visible";
    document.getElementById("win-title").style.visibility = "visible";
    document.getElementById("win-text").style.visibility = "visible";
    document.getElementById("game-table").style.visibility = "hidden";
    document.getElementById("title").style.visibility = "hidden";
    document.getElementById("timer").style.visibility = "hidden";
    document.getElementById("moves").style.visibility = "hidden";
    document.getElementById("completedSets").style.visibility = "hidden";
    document.getElementById("restart-button").style.display = "inline-flex";
    document.getElementById("win-text").innerHTML =
      "You completed the game succesfully in " +
      seconds +
      " seconds and " +
      tries +
      " moves";
  }
};

function restartGame() {
  location.reload();
}

// Get the current time in milliseconds when the page is loaded
function startTimer() {
  startTime = new Date().getTime();
  // Pass the startTime variable to the setInterval function
  refreshIntervalId = setInterval(showSeconds, 1000, startTime);
}

// Define a function that updates the display every second
function showSeconds(startTime) {
  // Get the current time in milliseconds
  let currentTime = new Date().getTime();
  // Calculate the difference in milliseconds using the startTime argument
  let diff = currentTime - startTime;
  // Convert the difference to seconds
  seconds = Math.floor(diff / 1000);
  // Display the seconds in an element with id "timer"
  document.getElementById("timer").innerHTML = seconds + " seconds";
  console.log(seconds, diff, currentTime, startTime);
}
