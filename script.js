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
let currentUser;
let cHangmen;


function start(event) {
  addUser();
  hideStart();
  
}

function addUser() {
  let name = inputName.value;
  users[name] = User(name);
  addScore(name);
  cHangmen = newHangMen(users[name]);
  
}

function hideStart() {
  screenUserName.classList.add("hide");
  screenGame.classList.remove("hide");
}

function User(username) {
  return {
    name: username,
    playing: true,
    currentScore: undefined,
    elapsedTime: undefined,
    victories: 0,
    matchesPlayed: 0
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

// addEventListener(click, handleLetter)


function handleLetter(event) {
  event.target.classList.add("hide");
  
  let letter = event.target.innerHTML;
  
  // addLetter
  // printLetter
  //checkEND
  
}




//returns an object to manage the actual game
function newHangMen(user) {
  const MAX_MISTAKES = 6;
  let mistakes = 0;
  // get a random word according to the difficulty of the match
  let currentWord = randWord(user.matchesPlayed % arrayWords.length).split("");
  
  let guessed = currentWord.map(el=>{ return ""});
  
  function tryLetter(letter){
    return currentWord.indexOf(letter);
      
  }
  
  // function

  return {
    userWins() {
      return; // bool
    },

    userLoses() {
      return mistakes > MAX_MISTAKES;
    },

    addMistakes() {
      mistakes++;
    },
    
    getCurrentWord(){
      
      return currentWord
      
    },
    
     updateGuessed(letter){
   
       
     }
      
    }
    
  };


//
function start1(user) {
  
  
  const game = newHangMen(user);

  while (!game.wins() && !game.loses()) {}
}

//Returns a random word from the arrayWords array
function randWord(arrNum) {
  let Arrlength = arrayWords[arrNum].length;

  let randPos = Math.floor(Math.random() * Arrlength);

  return arrayWords[arrNum][randPos];
}
