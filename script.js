// Setting basic variables to later change

const playerIcons = document.querySelectorAll(".playerOptions > div > img");
const aiIcons = document.querySelectorAll(".aiOptions > div > img");
const playerScoreText = document.getElementById("playerScore");
const playerOptions = document.querySelector(".playerOptions");
const bottomMenu = document.querySelector(".bottom-menu");
const aiScoreText = document.getElementById("aiScore");
const drawText = document.getElementById("draw");
const gameLog = document.getElementById("log");
const list = ["rock", "paper", "scissors"];
const overlayContainer = document.getElementById('overlay-container')
const closePopUp = document.getElementById('close-pop-up')
const popUpText = document.getElementById("pop-up-text")
const popUp = document.getElementsByClassName('pop-up')
let gameMode = "unlimited";
let playerScore = 0;
let aiScore = 0;
let draw = 0;

// Initialize game clicking in one of the 3 icons
// call the function with the id of the icon as an argument
// id from event target id property from mouse click event
playerOptions.addEventListener("click", (e) => {playRound(e.target.id)});

// Game mode menu and reset buttons to default
// call the function with the id of the of the selected option
bottomMenu.addEventListener("click", (e) => {changeMode(e.target.id)});

// pressing the key R will trigger a random pick for the player and play a round automatically
window.addEventListener("keydown", (e) => { if (e.key == 'r') computerVscomputer()});

// close the overlay by clicking anywhere including the button
overlayContainer.addEventListener("click",() => {
  reset(' ');
  overlayContainer.classList.remove('show')
})

//main function
function playRound(playerChoice) {
  // randomize the list and give it to computer as a choice
  let aiChoice = list[Math.floor(Math.random() * list.length)];
  // before displaying the random computer choise in the html
  // the function will erase all classes from the computer icons
  // displaying the default style before every play
  eraseClass();
  // adding a class for the player and computer icons
  // same icon id as the generated of the list
  // had to concatenate ai- plus aiChoice to math the ids from index page
  // used timeout so user sees the animation if computer picks the same choice in the next game
  setTimeout(() => {
    document.getElementById(`${"ai-" + aiChoice}`).classList.add("aiChoice");
    document.getElementById(playerChoice).classList.add("playerChoice");
  }, 50);

  // win and loss validation
  // player and computer score will be incremented each Win
  // results will be updated in the page
  // a log also will be generated and show in the page
  if (
    (playerChoice === "rock" && aiChoice === "scissors") ||
    (playerChoice === "paper" && aiChoice === "rock") ||
    (playerChoice === "scissors" && aiChoice === "paper")
  ) {
    playerScore += 1;
    playerScoreText.innerText = `Wins: ${playerScore}`;
    gameLog.innerText = `You win this round! ${playerChoice} beats ${aiChoice}`;
    gameLog.classList.add("playerChoice");
  }
  if (
    (aiChoice === "rock" && playerChoice === "scissors") ||
    (aiChoice === "paper" && playerChoice === "rock") ||
    (aiChoice === "scissors" && playerChoice === "paper")
  ) {
    aiScore += 1;
    aiScoreText.innerText = `Wins: ${aiScore}`;
    gameLog.innerText = `You lose this round! ${playerChoice} loses to ${aiChoice}`;
    gameLog.classList.add("aiChoice");
  }
  if (playerChoice === aiChoice) {
    draw += 1;
    gameLog.innerText = "It's a draw!";
    drawText.innerText = `Draws ${draw}`;
  }
  // if gamemode is set to best of 5 this validation will be used.
  // after the validation is complete, it will pop an alert and reset the game.
  // timeout used so that the scoreboard result will be updated first before the alert, showing the correct values
  if (gameMode === "bestOf5") {
    if (playerScore >= 5) {
      overlayContainer.classList.add('show')
      popUpText.innerText ="You won!\nYou've got 5 points first!\n🎉 🎉 🎉"
      setTimeout(function () {eraseClass()}, 50);
      
    }
    if (aiScore >= 5) {
      overlayContainer.classList.add('show')
      popUpText.innerText ="You Lost!\nComputer got 5 points first!\n😅"
      setTimeout(function () {eraseClass()}, 50);
    }
  }
}

// function that reset the game
// receives an argument so it will change the log message based in a button pressed
function reset(msg) {
  playerScoreText.innerText = `Wins: 0`;
  aiScoreText.innerText = `Wins: 0`;
  drawText.innerText = "Draws 0";
  playerScore = 0;
  aiScore = 0;
  draw = 0;
  msg !== undefined
    ? (gameLog.innerText = `${msg}`)
    : (gameLog.innerText = "All clean boss!");

    setTimeout(() => (gameLog.innerText = ""), 1000);
    eraseClass();
}

// game mod change function
// by selecting the a button with the game mode described
// will pass trough a validation erasing and add classes
// aplying and removing the styles, also displaying the current set game mode
// last if is a validation so that the reset button won't keep the same style as the others options
function changeMode(mode) {
  let unlimited = document.getElementById("unlimited");
  let bestOf5 = document.getElementById("bestOf5");
  if (mode === "bestOf5") {
    unlimited.classList.remove("selected");
    bestOf5.classList.add("selected");
    gameMode = "bestOf5";
    reset("Game mode change. Cleaning scoreboard!");
  }
  if (mode === "unlimited") {
    bestOf5.classList.remove("selected");
    unlimited.classList.add("selected");
    gameMode = "unlimited";
  }
  if (mode === "reset") reset();
}

// function that erasse all the classes from the computer icons
function eraseClass() {
  aiIcons.forEach((e) => {
    e.removeAttribute("class");
  });
  playerIcons.forEach((e) => {
    e.removeAttribute("class");
  });
  gameLog.removeAttribute("class");
}

// pressing R will call this fucntion, it will give a the player a random choice
// to play against the computer
// 'if' stops the function to be called if the overlay is showing
function computerVscomputer() {
  let myAi = list[Math.floor(Math.random() * list.length)];
  if(!overlayContainer.classList.contains("show")) playRound(myAi)
}
