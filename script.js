var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

console.log(alphabet);

let gameLetters = document.querySelector(".game-letters")

alphabet.forEach(letter => {
  var newLetter = document.createElement("li");
  console.log(letter);
  newLetter.innerHTML = letter.toUpperCase();
  gameLetters.appendChild(newLetter);
});

