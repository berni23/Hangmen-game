
// complete html 

var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

let gameLetters = document.querySelector(".game-letters")

alphabet.forEach(letter => {
  var newLetter = document.createElement("li");
  console.log(letter);
  newLetter.innerHTML = letter.toUpperCase();
  gameLetters.appendChild(newLetter);
});

// Start Game

var btnStart =  document.getElementById("button-start");

btnStart.addEventListener("click",addUser);


let users = {
 
}

function addUser(name){
  
  users[name] = User();
  
  console.log(users);
  
}

function User(){
  
  return {
  currentScore:undefined,
  elapsedTime:undefined,
  victories:undefined
  }
  
}
  

  
 
//

