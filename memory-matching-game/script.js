const emojis = ['🍌', '🍌', '🍇', '🍇', '🍎', '🍎', '🥭', '🥭', '🍉', '🍉', '🍈', '🍈', '🍊', '🍊', '🍐', '🍐'];
const selectedItems = [];
const cellOne = document.getElementById("cell1");
const cellTwo = document.getElementById("cell2");
const cellThree = document.getElementById("cell3");
const cellFour = document.getElementById("cell4");
const cellFive = document.getElementById("cell5");
const cellSix = document.getElementById("cell6");
const cellSeven = document.getElementById("cell7");
const cellEight = document.getElementById("cell8");
const cellNine = document.getElementById("cell9");
const cellTen = document.getElementById("cell10");
const cellEleven = document.getElementById("cell11");
const cellTwelve = document.getElementById("cell12");
const cellThirteen = document.getElementById("cell13");
const cellFourteen = document.getElementById("cell14");
const cellFifteen = document.getElementById("cell15");
const cellSixteen = document.getElementById("cell16");


// Loop until the original array is empty
while (emojis.length > 0) {
  // Generate a random index within the current range of the items array
  const randomIndex = Math.floor(Math.random() * emojis.length);

  // Get the item at the random index
  const selectedItem = emojis.splice(randomIndex, 1)[0];

  // Add the selected item to the selectedItems array
  selectedItems.push(selectedItem);
}

console.log(selectedItems)

cellOne.addEventListener("click", function() {
    cellOne.textContent = selectedItems[1];
}); 
cellTwo.addEventListener("click", function() {
    cellTwo.textContent = selectedItems[2];
}); 
cellThree.addEventListener("click", function() {
    cellThree.textContent = selectedItems[3];
}); 
cellFour.addEventListener("click", function() {
    cellFour.textContent = selectedItems[4];
}); 
cellFive.addEventListener("click", function() {
    cellFive.textContent = selectedItems[5];
}); 