
// complete html 

var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

let gameLetters = document.querySelector(".game-letters")

alphabet.forEach(letter => {
  var newLetter = document.createElement("li");
  newLetter.innerHTML = letter.toUpperCase();
  gameLetters.appendChild(newLetter);
});

// Start Game
var inputName = document.getElementById("user-name");
var btnStart =  document.getElementById("button-start");

btnStart.addEventListener("click",nextFrame(event));


let users = {
 
}

function addUser(event){
  let name = inputName.value;

  console.log(name);
  users[name] = User();
  
  console.log(users);
  
  
  
  
}



function User(){
  
  return {
  playing:true,
  currentScore:undefined,
  elapsedTime:undefined,
  victories:undefined
  }
  
}
  

  
 
//

