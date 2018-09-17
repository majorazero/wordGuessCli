let Letters = function() = {
  this.thisLetter = char;
  this.guessed = false;
  this.whatLetter = function(){
    if(this.guessed === true){
      return this.thisLetter;
    }
    else {
      return "_";
    }
  };
  this.guessCheck = function(newLet){
    if(this.thisLetter === newLet){
      this.guessed = true;
    }
  }
};
