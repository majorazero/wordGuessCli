let Letters = function(char){
  this.thisLetter = char;
  if(char === " "){
    this.guessed = true; //we'll make it ignore spaces
  }
  else {
    this.guessed = false;
  }
  this.whatLetter = function(){
    if(this.guessed === true){
      return this.thisLetter;
    }
    else {
      return "_";
    }
  };
  this.guessCheck = function(newLet){
    if(this.thisLetter.toLowerCase() === newLet.toLowerCase()){
      this.guessed = true;
    }
  }
};

module.exports = Letters;
