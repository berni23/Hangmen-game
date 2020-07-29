
// complete html 

var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

var gameLetters = document.querySelector(".game-letters")

alphabet.forEach(letter => {
  var newLetter = document.createElement("li");
  newLetter.innerHTML = letter.toUpperCase();
  gameLetters.appendChild(newLetter);
});

// Start Game
var inputName = document.getElementById("user-name");
var btnStart =  document.getElementById("button-start");
var screenUserName = document.getElementById("screen-username");
var screenGame = document.getElementById("screen-game");
var 


btnStart.addEventListener("click",addUser);


let users = {
 
}


function addUser(event){
  let name = inputName.value;

  console.log(name);
  users[name] = User();
  
  console.log(users);
  
  hideStart()
  
  
  
}


function hideStart(){
  
  screenUserName.classList.add("hide");
  screenGame.classList.remove("hide");
}

function User(){
  
  return {
  playing:true,
  currentScore:undefined,
  elapsedTime:undefined,
  victories:undefined
  }
  
}
  

//Playing Game


