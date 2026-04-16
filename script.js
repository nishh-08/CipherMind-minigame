let targetNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 10;

const introPage = document.getElementById('intro-page');
const gamePage = document.getElementById('game-page');
const startBtn = document.getElementById('start-btn');
const guessBtn = document.getElementById('guess-btn');
const resetBtn = document.getElementById('reset-btn');
const input = document.getElementById('user-input');
const feedback = document.getElementById('feedback');
const chancesDisplay = document.getElementById('chances');
const prevGuessDisplay = document.getElementById('prev-guess');

// Transition to Game
startBtn.addEventListener('click', () => {
    introPage.classList.remove('active');
    setTimeout(() => {
        introPage.style.display = 'none';
        gamePage.style.display = 'flex';
        setTimeout(() => gamePage.classList.add('active'), 50);
    }, 800);
});

// Game Logic
function checkGuess() {
    const userGuess = parseInt(input.value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        feedback.innerText = "Please enter a valid number (1-100)";
        return;
    }

    attempts--;
    chancesDisplay.innerText = attempts;
    prevGuessDisplay.innerText = userGuess;
    input.value = "";

    if (userGuess === targetNumber) {
        endGame(`🎉 Incredible! The number was ${targetNumber}.`, "#4ade80");
    } else if (attempts === 0) {
        endGame(`Game Over! It was ${targetNumber}.`, "#f87171");
    } else {
        feedback.innerText = userGuess > targetNumber ? "Too high! Try lower." : "Too low! Try higher.";
        feedback.style.color = "#a855f7";
    }
}

function endGame(msg, color) {
    feedback.innerText = msg;
    feedback.style.color = color;
    input.classList.add('hidden');
    guessBtn.classList.add('hidden');
    resetBtn.classList.remove('hidden');
}

function resetGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 10;
    chancesDisplay.innerText = attempts;
    prevGuessDisplay.innerText = "-";
    feedback.innerText = "Waiting for your move...";
    feedback.style.color = "#a855f7";
    input.classList.remove('hidden');
    guessBtn.classList.remove('hidden');
    resetBtn.classList.add('hidden');
}

guessBtn.addEventListener('click', checkGuess);
resetBtn.addEventListener('click', resetGame);

// Allow "Enter" key to submit
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkGuess();
});