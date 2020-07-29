
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
var scorePanel = document.getElementById("user-score-list");


btnStart.addEventListener("click",addUser);


let users = {
 
}

function start(){
  addUser();
  
}

function addUser(event){
  let name = inputName.value;

  console.log(name);
  users[name] = User();
  
  console.log(users);
  
  hideStart();
  addScore();
  

  
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

function addScore(name){
  
  // dt , dd
  let newScoreName = document.createElement("dt");
  let newScoreCurrent = document.createElement("dd");
  newScoreName.innerHTML=name;
  newScoreCurrent.innerHTML = "Currently playing";
  scorePanel.insertAdjacentElement("afterbegin",newScoreCurrent);
  scorePanel.insertAdjacentElement("afterbegin",newScoreName);

  
  
  
}
  

//Playing Game


