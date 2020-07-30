var alphabet = "abcdefghijklmnopqrstuvwxyzñ".split("");
var gameLetters = document.querySelector(".game-letters");

//create containers with the letters and add them in the html

function resetLetters() {
  gameLetters.innerHTML = "";
  alphabet.forEach(letter => {
    var newLetter = document.createElement("li");
    newLetter.innerHTML = letter.toUpperCase();
    gameLetters.appendChild(newLetter);
  });

  let letters = document.querySelectorAll(".game-letters > li");
  letters.forEach(el => {
    el.addEventListener("click", handleLetter);
  });
}

// Start Game
var inputName = document.getElementById("user-name");
var btnStart = document.getElementById("button-start");
var screenUserName = document.getElementById("screen-username");
var screenGame = document.getElementById("screen-game");
var scorePanel = document.getElementById("user-score-list");
var screenEnd = document.getElementById("screen-end");
var screenWin = document.getElementById("win-wrapper");
var screenLose = document.getElementById("lose-wrapper");
var guessedWordLetters = document.querySelector(".word");
var winTime = document.getElementById("win-time");
var loseTime = document.getElementById("lose-time");
var hangmanImg = document.getElementById("hangman-img");
var btnPlayAgain = document.getElementById("btn-play-again");
var btnNewUser = document.getElementById("btn-new-user");

btnStart.addEventListener("click", start);
btnPlayAgain.addEventListener("click", playAgain);
btnNewUser.addEventListener("click", restart);

let users = {};
let currentUser;
let currentHangMen;
let timerIni;
let canLose = true;

function start(event) {
  if (inputName.value != "") {
    addUser();
    hideStart();
    resetLetters();

    let currentTimer = new Date();
    timerIni = currentTimer.getTime();
  }
}

//new match with the same user
function playAgain(event) {
  currentHangMen = newHangMen(currentUser);
  screenEnd.classList.add("hide");
  screenGame.classList.remove("hide");
  updateScore("Currently playing...");
  reset();
}

//new match asking for a new user
function restart(event) {
  screenEnd.classList.add("hide");
  screenWin.classList.add("hide");
  screenLose.classList.add("hide");
  screenUserName.classList.remove("hide");
  if (currentUser.currentScore === undefined) {
    // remove user to the score table if he/she lost ( only users who won)
    scorePanel.firstChild.remove();
    scorePanel.firstChild.remove();
  }
  reset();
}

function addUser() {
  let name = inputName.value;
  users[name] = User(name);
  addScore(name, "Currently playing...");
  currentHangMen = newHangMen(users[name]);
  currentUser = users[name];
}

function hideStart() {
  screenUserName.classList.add("hide");
  screenGame.classList.remove("hide");
}

function showWin(timerEnd) {
  screenGame.classList.add("hide");
  screenEnd.classList.remove("hide");
  screenWin.classList.remove("hide");
  winTime.textContent = "You won in " + timerEnd + " seconds!";
  resetWord();
}

function showLose(timerEnd) {
  screenGame.classList.add("hide");
  screenEnd.classList.remove("hide");
  screenLose.classList.remove("hide");
  loseTime.textContent = "You lost in " + timerEnd + " seconds!";
  resetWord();
  canLose = true;
}

// function for displaying the last image in the hangmen

function showLast(timerEnd) {
  hangmanImg.src = "frames_hangmen/mistake7/frame_last.png";
  let timeShowLose = setTimeout(() => {
    showLose(timerEnd);
  }, 1200);
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

function addScore(name, score) {
  let newScoreName = document.createElement("dt");
  let newScoreCurrent = document.createElement("dd");
  newScoreName.innerHTML = name;
  newScoreCurrent.innerHTML = score;
  scorePanel.insertAdjacentElement("afterbegin", newScoreCurrent);
  scorePanel.insertAdjacentElement("afterbegin", newScoreName);
}

function updateScore(score) {
  scorePanel.children[1].innerHTML = score;
}

//Playing Game

// function  connected to each letter ( line 14 ) to update the currenthangMen at each event and hide the letter

function handleLetter(event) {
  event.target.classList.add("hide");
  let letter = event.target.innerHTML;
  let timerEnd;
  currentHangMen.addLetter(letter);
  if (currentHangMen.userWins()) {
    let currentTimer = new Date();
    timerEnd = tEnd();
    currentHangMen.updateTime(timerEnd);
    showWin(timerEnd);
    currentHangMen.addMatchesPlayed();
    currentHangMen.addVictories();

    updateScore(timerEnd + " seconds");
  } else if (currentHangMen.userLoses() && canLose) {
    canLose = false;
    timerEnd = tEnd();
    let time = setTimeout(() => {
      showLast(timerEnd);
    }, 4000);
    currentHangMen.addMatchesPlayed();
  }
}

//returns an object to manage the actual game

function newHangMen(user) {
  const MAX_MISTAKES = 6;
  let mistakes = 0;
  let currentWord = randWord(user.matchesPlayed % arrayWords.length).split("");
  let counterLetters = 0;
  let currentFrame = 0;
  let intervalFrame;
  let frames = true;
  currentWord.forEach(el => {
    let newSpace = document.createElement("li");
    guessedWordLetters.appendChild(newSpace);
  });
  let displayedGuessedLetters = document.querySelectorAll(".word > li");

  function tryLetter(letter) {
    if (currentWord.indexOf(letter) !== -1) {
      currentWord.forEach((el, index) => {
        if (el === letter) {
          displayedGuessedLetters[index].textContent = letter;
          counterLetters++;
        }
      });
    } else {
      mistakes++;
      if (frames) {
        intervalFrame = setInterval(displayFrames, 200);
        frames = false;
      }
    }
  }

  function displayFrames() {
    hangmanImg.src =
      "frames_hangmen/mistake" + mistakes + "/frame000" + currentFrame + ".png";
    currentFrame++;
    if (currentFrame >= 5) {
      clearInterval(intervalFrame);
      currentFrame = 0;
      frames = true;
    }
  }

  return {
    userWins() {
      return mistakes <= MAX_MISTAKES && counterLetters >= currentWord.length;
    },
    userLoses() {
      return mistakes > MAX_MISTAKES;
    },
    addLetter(letter) {
      tryLetter(letter);
    },
    updateTime(time) {
      user.currentScore = time;
    },
    addMatchesPlayed() {
      user.matchesPlayed++;
    },

    addVictories() {
      user.victories;
    }
  };
}

// UTILS functions

// array of words

let arrayWords = [
  ["hola", "mesa", "boli", "sapo", "agua"],
  ["libro", "plato", "gorra"],
  ["guante", "piedra", "digito"],
  ["gigante,", "guadaña,"]
];

// get a random word from the nth array of the bidimensional array

function randWord(arrNum) {
  let Arrlength = arrayWords[arrNum].length;
  let randPos = Math.floor(Math.random() * Arrlength);
  return arrayWords[arrNum][randPos].toUpperCase();
}

function tEnd() {
  let currentTimer = new Date();
  let timerEnd = ((currentTimer.getTime() - timerIni) / 1000).toFixed(0);
  return timerEnd;
}

// reset functions

function resetWord() {
  guessedWordLetters.innerHTML = "";
}

function resetImg() {
  hangmanImg.src = "frames_hangmen/hangmenBlank.png";
}

function resetInput() {
  inputName.value = "";
}

function reset() {
  resetLetters();
  resetImg();
  resetInput();
}