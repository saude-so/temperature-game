let number, maxAttempts, attempts, difficulty;

function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
}

function setDifficulty(level) {
    difficulty = level;

    if (level === 1) {
        maxAttempts = 10;
        number = Math.floor(Math.random() * 101) - 50; // Range: -50 to 50
    } else if (level === 2) {
        maxAttempts = 7;
        number = Math.floor(Math.random() * 201) - 100; // Range: -100 to 100
    } else if (level === 3) {
        maxAttempts = 5;
        number = Math.floor(Math.random() * 501) - 250; // Range: -250 to 250
    }

    attempts = 0;

    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('guess-screen').classList.remove('hidden');
    document.getElementById('prompt').textContent = `I've picked a temperature. You have ${maxAttempts} attempts to guess it!`;
    document.getElementById('feedback').textContent = '';
    updateAttempts();
}

function submitGuess() {
    const guessInput = document.getElementById('guess');
    const guess = parseInt(guessInput.value, 10);
    attempts++;

    if (isNaN(guess)) {
        document.getElementById('feedback').textContent = 'Please enter a valid number.';
        return;
    }

    if (guess < number) {
        document.getElementById('feedback').textContent = '❄️ Too cold! Try a warmer guess.';
    } else if (guess > number) {
        document.getElementById('feedback').textContent = '🔥 Too hot! Try a cooler guess.';
    } else {
        endGame(`🎉 Congratulations! You guessed the temperature in ${attempts} attempts.`);
        return;
    }

    if (attempts === maxAttempts && guess !== number) {
        endGame(`😢 Sorry! You've used all your attempts. The temperature was ${number}.`);
        return;
    }

    updateAttempts();
    guessInput.value = ''; // Clear input field for the next guess
}

function updateAttempts() {
    const attemptsLeft = maxAttempts - attempts;
    document.getElementById('prompt').textContent = `Attempts left: ${attemptsLeft}`;
}

function endGame(message) {
    document.getElementById('guess-screen').classList.add('hidden');
    document.getElementById('end-screen').classList.remove('hidden');
    document.getElementById('result').textContent = message;
}

function restartGame() {
    document.getElementById('end-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
}
