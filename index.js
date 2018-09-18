let Words = require("./word.js");
let inquirer = require("inquirer");
let randomWord = require("random-words");
let phraseAmount = 1;
let gameWord;
let newGame = true;
let guessLeft = 10;
let streak = 0;
let unguessedLength = 0;
let guessedLetters = [];

game();
/**
* Sets the difficulty of the game, easy-hard -> 1-3 phrases
*/
function difficultySetting(){
  inquirer.prompt({
    message: "Choose your difficulty!",
    type: "list",
    name: "choice",
    choices: ["Easy","Medium","Hard"]
  }).then(function(response){
    switch(response.choice){
      case "Easy":
        phraseAmount = 1;
        break;
      case "Medium":
        phraseAmount = 2;
        break;
      default:
        phraseAmount = 3;
    }
    gameWord = new Words(randomWord({exactly: phraseAmount, join: " "}));
    unguessedLength = gameWord.wordDis().replace(/\s/g,"").length;
    newGame = false;
    game();
  });
}
/**
* Runs the actualy game. If new game is true, it'll trigger difficultySetting() and makes a new word
*/
function game(){
  if(newGame === true){
    difficultySetting();
  }
  else{
    inquirer.prompt({
      message:"Time to play the game of games, the WORD GUESS game! Guess this word! \n"+
      gameWord.wordDis(),
      type: "input",
      name: "input"
    }).then(function(response){
      if(validate(response.input) === true){
        gameWord.wordCheck(response.input);
        if(gameWord.wordDis().indexOf("_") !== -1){
          if(guessLeft > 0){
            let unguessedLengthNew = gameWord.wordDis().length-gameWord.wordDis().replace(/_/g,"").length;
            if (guessedLetters.indexOf(response.input.toLowerCase()) !== -1){ //you guessed the letter before
              console.log("You guessed that already! Try again~");
            }
            else if( unguessedLengthNew === unguessedLength){
              guessedLetters.push(response.input.toLowerCase());
              guessLeft--;
              console.log("You have "+guessLeft+" guesses left!");
            }
            else{
              guessedLetters.push(response.input.toLowerCase());
              unguessedLength = unguessedLengthNew;
              console.log("Woot you got one!");
            }
            game();
          }
          else {
            gameReset(false);
          }
        }
        else{
          //you win
          gameReset(true);
        }
    }
    else{
      game();
    }
    });
  }
}
/**
* Makes sure the input of the user has to a single char
*/
function validate(q){
  if(/^[a-zA-Z]/.test(q) && q.length === 1){
    return true;
  }
  else {
    console.log("\n Gotta put in a letter, bud.");
    return false;
  }
}
/**
* Resets the game stat or ends the game based on win state
* @param {Boolean} win - Whether or not you won the game.
*/
function gameReset(win){
  let message;
  guessedLetters = [];
  if (win === true){
    streak++;
    if(streak > 2){
      console.log("You're on a streak! Keep it up! Streak:"+streak);
    }
    else {
      console.log("Nice~ Streak:"+streak);
    }
    message = "The word was "+gameWord.trueWord+"! You win, have an imaginary cookie! Have another go?";
  }
  else {
    streak = 0; //ends your streak
    message = "The word was "+gameWord.trueWord+"! You lose! Try again?";
  }
  inquirer.prompt({
    message: message,
    type: "confirm",
    name: "input"
  }).then(function(response){
    if(response.input === true){
      //resets the game
      guessLeft = 10;
      newGame = true;
      game();
    }
    else {
      console.log("Hope to see you next time!");
    }
  });
}
