const emojis = ['🔥', '🔥', '💧', '💧', '⚡', '⚡', '🌈', '🌈', '🍕', '🍕', '🚗', '🚗', '💎', '💎', '🍎', '🍎'];
let flippedCards = [];
let matchedCount = 0;
let moves = 0;
let timer = 0;
let interval;

const gameBoard = document.getElementById('gameBoard');
const moveDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const victoryModal = new bootstrap.Modal(document.getElementById('victoryModal'));

function initGame() {
    gameBoard.innerHTML = '';
    const shuffled = emojis.sort(() => Math.random() - 0.5);
    
    shuffled.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.emoji = emoji;
        card.innerHTML = `<span>${emoji}</span>`;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });

    startTimer();
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            moves++;
            moveDisplay.innerText = moves;
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.emoji === card2.dataset.emoji) {
        matchedCount += 2;
        flippedCards = [];
        if (matchedCount === emojis.length) endGame();
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function startTimer() {
    clearInterval(interval);
    timer = 0;
    interval = setInterval(() => {
        timer++;
        timerDisplay.innerText = timer;
    }, 1000);
}

function endGame() {
    clearInterval(interval);
    document.getElementById('finalStats').innerText = `You finished in ${timer} seconds with ${moves} moves!`;
    victoryModal.show();
}

function resetGame() {
    moves = 0;
    matchedCount = 0;
    moveDisplay.innerText = 0;
    initGame();
}

// Start on load
initGame();