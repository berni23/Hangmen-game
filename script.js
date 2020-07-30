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

btnPlayAgain.addEventListener("click",restart);
btnNewUser.addEventListener("click",restart);

let users = {};
let currentUser;
let currentHangMen;
let timerIni;

function start(event) {
  addUser();
  hideStart();

  let currentTimer = new Date();
  timerIni = currentTimer.getTime();
}


function restart(event){
  
  screenEnd.classList.add("hide");
  screen

}

function addUser() {
  let name = inputName.value;
  users[name] = User(name);
  addScore(name, "Currently Playing");
  currentHangMen = newHangMen(users[name]);
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
}

function showLose(timerEnd) {
  screenGame.classList.add("hide");
  screenEnd.classList.remove("hide");
  screenLose.classList.remove("hide");
  loseTime.textContent = "You lost in " + timerEnd + " seconds!";
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
  scorePanel.children[1].innerHTML = score + " seconds";
}

//Playing Game

let letters = document.querySelectorAll(".game-letters > li");
letters.forEach(el => {
  el.addEventListener("click", handleLetter);
});

let arrayWords = [
  ["hola", "mesa", "boli", "sapo", "agua"],
  ["libro", "plato", "gorra"],
  ["guante", "piedra"]
];

function handleLetter(event) {
  event.target.classList.add("hide");
  let letter = event.target.innerHTML;
  let timerEnd;
  currentHangMen.addLetter(letter);
  if (currentHangMen.userWins()) {
    let currentTimer = new Date();
    timerEnd = ((currentTimer.getTime() - timerIni) / 1000).toFixed(0);
    currentHangMen.updateTime(timerEnd);
    showWin(timerEnd);
    currentHangMen.addMatchesPlayed();
  } else if (currentHangMen.userLoses()) {
    let time = setTimeout(showLast, 3000);
    currentHangMen.updateTime("user has lost");
  }
}

function showLast() {
  hangmanImg.src = "frames_hangmen/mistake7/frame_last.png";
  let timeShowLose = setTimeout(showLose, 2000);
}

//returns an object to manage the actual game
function newHangMen(user) {
  const MAX_MISTAKES = 6;
  let mistakes = 0;
  let currentWord = randWord(user.matchesPlayed % arrayWords.length).split("");
  let counterLetters = 0;
  let currentFrame = 0;
  let intervalFrame;
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
      intervalFrame = setInterval(displayFrames, 200);
    }
  }

  function displayFrames() {
    hangmanImg.src =
      "frames_hangmen/mistake" + mistakes + "/frame000" + currentFrame + ".png";
    console.log(hangmanImg.src);
    currentFrame++;
    if (currentFrame >= 5) {
      clearInterval(intervalFrame);
      currentFrame = 0;
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
      updateScore(time);
    },
    addMatchesPlayed() {
      user.matchesPLayed++;
    }
  };
}

function randWord(arrNum) {
  let Arrlength = arrayWords[arrNum].length;
  let randPos = Math.floor(Math.random() * Arrlength);
  return arrayWords[arrNum][randPos].toUpperCase();
}

/* TO DO LIST

0 - implement losing time
1 - Implement play again feature ( more difficult word each time);
2 - Display result in the right;


*/
