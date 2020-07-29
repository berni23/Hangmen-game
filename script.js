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
var guessedWordLetters = document.querySelector(".word");

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
  let newScoreName = document.createElement("dt");
  let newScoreCurrent = document.createElement("dd");
  newScoreName.innerHTML = name;
  newScoreCurrent.innerHTML = "Currently playing";
  scorePanel.insertAdjacentElement("afterbegin", newScoreCurrent);
  scorePanel.insertAdjacentElement("afterbegin", newScoreName);
}

//Playing Game
/*
let letters = document.querySelectorAll(".game-letters > li");
letters.forEach(el => {
  el.addEventListener("click");
});*/

let arrayWords = [["Hola", "Mesa", "Boli", "Sapo"], ["Libro", "Plato"]];

// addEventListener(click, handleLetter)

// function to handel when user clicks a letter
function handleLetter(event) {
  event.target.classList.add("hide");

  let letter = event.target.innerHTML;

  /*cHangmen.
    
  cHangmen.addLetter(letter);
  
  if(cHangmen.checkEnd){
    
  }
  
  */
}

//returns an object to manage the actual game
function newHangMen(user) {
  const MAX_MISTAKES = 6;
  let mistakes = 0;

  let currentWord = randWord(user.matchesPlayed % arrayWords.length).split("");
  //let guessedWord;
  let counterLetters = 0;

  currentWord.forEach(el => {
    let newSpace = document.createElement("li");
    guessedWordLetters.appendChild(newSpace);
    //guessedWord.push("");
  });

  //get created spaces
  let displayedGuessedLetters = document.querySelectorAll(".word > li");

  // check if a letter belongs to the word to be guessed, if so display the guessed letter
  function tryLetter(letter) {
    if (currentWord.indexOf(letter) !== -1) {
      currentWord.forEach((el, index) => {
        if (el === letter) {
          //guessedWord[index] = el;
          displayedGuessedLetters[index].textContent = letter;
          counterLetters++;
        }
      });
    } else {
      mistakes++;
    }
  }

  // function

  return {
    userWins() {
      return mistakes < MAX_MISTAKES && (counterLetters>=currentWord.length) 
    },

    userLoses() {
      return mistakes >= MAX_MISTAKES;
    },
    addLetter(letter) {
      tryLetter(letter);
    }
  };
}

//Returns a random word from the arrayWords array
function randWord(arrNum) {
  // get a random word according to the difficulty of the match
  let Arrlength = arrayWords[arrNum].length;

  let randPos = Math.floor(Math.random() * Arrlength);

  return arrayWords[arrNum][randPos];
}
