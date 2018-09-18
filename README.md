# wordGuessCli
Let's make a word guess game through Node.

# Using the App  
After you load it and run `npm install` you should be able to run the command `node index.js` to start playing the game.

# How the Game Works
Essentially it's hangman. The program will generate a random word or series of words and display them to the user with with underscores. A correct guess will reveal all placements of the letters within the hidden word, while an incorrect guess will deduct the number of guesses the user has per word.

You get 10 guesses per word, and same letters cannot be repeated. Only single string entries are accepted.

If your guesses run out, you lose the game and streak. If you win, you can continue playing with your streak.

# Built With
- JavaScript
- Node.js
- [Inquirer](https://github.com/SBoudrias/Inquirer.js/)
- [random-words](https://www.npmjs.com/package/random-words)

# Version
1.0.0

# Author
Daniel Hsu
