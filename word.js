let Letters = require("./letters.js");

let Words = function(word){
  this.trueWord = word;
  this.word = [];
  for(let i = 0; i < word.length; i++){
    this.word.push(new Letters(word[i]));
  }
  this.wordDis = function(){
    let display = "";
    for(let i = 0; i < this.word.length; i++){
      display += this.word[i].whatLetter()+" ";
    }
    return display;
  }
  this.wordCheck = function(letter){
    for(let i = 0; i <this.word.length; i++){
      this.word[i].guessCheck(letter);
    }
  }
};

module.exports = Words;
