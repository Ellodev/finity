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

const betterListener = (event) => {
  let target = event.target;

  if (target.hasAttribute("completed")) return;

  if (openCards.find((openCardId) => openCardId === target.id)) return;

  target.textContent = selectedItems[target.id];

  if (openCards.length > 1) {
    let openCardA = document.getElementById(openCards[0]);
    let openCardB = document.getElementById(openCards[1]);

    tries++;

    if (openCardA.textContent === openCardB.textContent) {
      openCardA.setAttribute("completed", "");
      openCardB.setAttribute("completed", "");
      completedSets++;
    } else {
      openCardA.textContent = "";
      openCardB.textContent = "";
    }

    openCards = [];
  }

  openCards.push(target.id);

  console.log({ completedSets, tries });

  if (completedSets > 7) {
    alert(`You completed the game in ${tries} and in `);
    // TODO add timer
    // TODO add reset function
  }
};

document.getElementById("game-table").addEventListener("click", betterListener);

// original code:

// document
//   .getElementById("game-table")
//   .addEventListener("click", function (event) {
//     let target = event.target; // Get the element that was clicked

//     // Check if the clicked element is a table cell (td)
//     if (
//       target.tagName === "TD" &&
//       !target.hasAttribute("completed") &&
//       openCards[0] !== target.id &&
//       openCards[1] !== target.id
//     ) {
//       //Make the textContent of the clicked Item the emoji from selectedItems array
//       if (openCards.length > 1) {
//         // two cards are open, we compare

//         let openCardA = document.getElementById(openCards[0]);
//         let openCardB = document.getElementById(openCards[1]);

//         if (openCardA.textContent === openCardB.textContent) {
//           openCardA.setAttribute("completed", "");
//           openCardB.setAttribute("completed", "");

//           openCards.length = 0;
//           completedSets = completedSets + 1;
//         } else {
//           openCardA.textContent = "";
//           openCardB.textContent = "";
//           openCards.length = 0;
//         }
//       }

//       openCards.push(target.id);
//       target.textContent = selectedItems[target.id];

//       if (completedSets > 6) {
//         alert("You won!");
//       }
//     }
//   });
