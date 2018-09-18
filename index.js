let Words = require("./word.js");
let inquirer = require("inquirer");
let randomWord = function(){
  return "blueDials";
};//require("random-words");
let phraseAmount = 1;
let gameWord;
let newGame = true;
let guessLeft = 10;
let streak = 0;
let unguessedLength = 0;

//console.log(randomWord({exactly: phraseAmount, join: " "}));
game();
function game(){
  if(newGame === true){
    gameWord = new Words(randomWord());
    unguessedLength = gameWord.wordDis().length;
    newGame = false;
  }
  inquirer.prompt({
    message:"Time to play the game of games, the WORD GUESS game! Guess this word! \n"+
    gameWord.wordDis(),
    type: "input",
    name: "input",
    validate: function(q) {
      if(typeof q === "string" && q.length === 1){
        return true;
      }
      else {
        console.log("\n Gotta put in a letter, bud.");
        return false;
      }
    }
  }).then(function(response){
    gameWord.wordCheck(response.input);
    if(gameWord.wordDis().indexOf("_") !== -1){
      if(guessLeft > 1){
        let unguessedLengthNew = gameWord.wordDis().length-gameWord.wordDis().replace(/_/g,"").length;
        if( unguessedLengthNew === unguessedLength){
          guessLeft--;
          console.log("You have "+guessLeft+" guesses left!");
        }
        else{
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
  });
}

function gameReset(win){
  let message;
  if (win === true){
    streak++;
    message = "The word was "+gameWord.wordDis()+"! You win, have an imaginary cookie! Have another go?";
  }
  else {
    streak = 0; //ends your streak
    message = "You lose! Try again?";
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
