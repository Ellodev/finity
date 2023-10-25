const emojis = ['🍌', '🍌', '🍇', '🍇', '🍎', '🍎', '🥭', '🥭', '🍉', '🍉', '🍈', '🍈', '🍊', '🍊', '🍐', '🍐'];
    let adjustableEmojis = [...emojis];
    const numberOfTiles = 16;

    for (let i = 0; i < numberOfTiles; i++) {
        
        let chosenEmoji = adjustableEmojis[Math.floor(Math.random()*adjustableEmojis.length)];
        let arrayWithoutChosenEmoji = adjustableEmojis.filter(function (letter) {
            return letter !== chosenEmoji;
        });
        adjustableEmojis = arrayWithoutChosenEmoji;
      }