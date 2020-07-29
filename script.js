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
    victories: undefined,
    matchesPlayed:
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

let letters = document.querySelectorAll(".game-letters > li");
letters.forEach(el => {
  el.addEventListener("click");
});

let arrayWords = [["Hola", "Mesa", "Boli", "Sapo"], ["Libro", "Plato"]];
  
  
//
function newHangMen(user) {
  const maxMistakes = 6;
  let mistakes = 0;

  let numGames = 0; // to be substituted by rand function

  let currentWord = randWord(numGames);
  
  
  return ()
  
    
    function
  }
}


function start() {
  
  
  
}
  

function randWord(arrNum) {
  let Arrlength = arrayWords[arrNum].length;

  let randPos = Math.floor(Math.random() * Arrlength);
}
