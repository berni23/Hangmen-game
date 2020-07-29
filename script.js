// complete html

var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

var gameLetters = document.querySelector(".game-letters");

alphabet.forEach(letter => {
  var newLetter = document.createElement("li");
  newLetter.innerHTML = letter.toUpperCase();
  gameLetters.appendChild(newLetter);
});

// Start Game
var inputName = document.getElementById("user-name");
var btnStart = document.getElementById("button-start");
var screenUserName = document.getElementById("screen-username");
var screenGame = document.getElementById("screen-game");
var scorePanel = document.getElementById("user-score-list");

btnStart.addEventListener("click", start);

let users = {};

function start(event) {
  addUser();
  hideStart();

}

function addUser() {
  let name = inputName.value;
  users[name] = User();
  addScore(name);
 
}

function hideStart() {
  screenUserName.classList.add("hide");
  screenGame.classList.remove("hide");
}

function User() {
  return {
    playing: true,
    currentScore: undefined,
    elapsedTime: undefined,
    victories: undefined
  };
}

function addScore(name) {
  // dt , dd
  let newScoreName = document.createElement("dt");
  let newScoreCurrent = document.createElement("dd");
  newScoreName.innerHTML = name;
  newScoreCurrent.innerHTML = "Currently playing";
  scorePanel.insertAdjacentElement("afterbegin", newScoreCurrent);
  scorePanel.insertAdjacentElement("afterbegin", newScoreName);
}

//Playing Game

let letters =document.querySelectorAll(".game-letters > li");



let arraywords  = {
  
  fourLetters 
  
  
}
    
    
    

/*function startGame(name){
  
  const maxMistakes = 6;
  let mistakes = 0;
  
  
  
  
  while(!lose&&!win)



*/