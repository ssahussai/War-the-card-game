/*----- constants -----*/
const lookUpObject = {
    '1': 'Player One',
    '-1': 'Player Two'
};
var suits = ['s', 'c', 'd', 'h'];
var ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

/*----- app's state (variables) -----*/
let turn, 
    p1Hand, 
    p2Hand,
    allCardsDelt, 
    p1CardInPlay, 
    p1Score, 
    p2CardInPlay, 
    p2Score,
    result, 
    winner, 
    cards, 
    cardsInPlay; 

/*----- cached element references -----*/
const p1container = document.querySelector('.container1');
const p2container = document.querySelector('.container2');
const message = document.getElementById('message');
const resultEl = document.getElementById('result');
const p1ScoreEl = document.getElementById('p1');
const p2ScoreEl = document.getElementById('p2');

/*----- event listeners -----*/
document.getElementById('resetButton').addEventListener('click', init);
document.querySelector('.player1Hand').addEventListener('click', flipCard);
document.querySelector('.player2Hand').addEventListener('click', flipCard);

/*----- functions -----*/
init();

function init() {
    turn = 1
    winner = false; 
    cards = buildMasterDeck();
    cards = shuffleDeck();
    cardsInPlay = [];
    p1Hand = [];
    p2Hand = [];
    result = null;
    allCardsDelt = false;
    p1CardInPlay = 0;
    p2CardInPlay = 0;
    p1Score = 0;
    p2Score = 0;
    dealCards();
    render();
}

function buildMasterDeck() {
    const deck = [];
    suits.forEach(function(suit) {
        ranks.forEach(function(rank) {
            deck.push({
                face: `${suit}${rank}`,
                value: Number(rank) || (rank === 'A' ? 11 : 10),
                flipped: false
            });
        });
    });
    return deck;
}

function shuffleDeck() {
    const tempDeck = cards.slice();
    const shuffledDeck = [];
    while(tempDeck.length) {
        let randomIndex = Math.floor(Math.random() * tempDeck.length);
        shuffledDeck.push(tempDeck.splice(randomIndex, 1)[0]);
    }
    return shuffledDeck;
}

function dealCards() {
    let sequence = 1;
    let dealtCard;
    for(let i = 0; i < 52; i++) {
        if(sequence === 1) {
            dealtCard = cards.shift();
            dealtCard.player = 'p1'
            p1Hand.push(dealtCard);
            sequence *= -1
        } else if(sequence === -1) {
            dealtCard = cards.shift();
            dealtCard.player = 'p2'
            p2Hand.push(dealtCard);
            sequence *= -1
        }
    }
}

function flipCard(evt) {
    const selectedCard = parseInt(evt.target.dataset.idx);
    if(isNaN(selectedCard)) return;
    if(evt.target.dataset.player === 'p1') {
        const card = p1Hand[selectedCard];
        card.flipped = true;
        cardsInPlay.push(p1Hand[selectedCard])
        checkScore();
    } else if(evt.target.dataset.player === 'p2') {
        const card = p2Hand[selectedCard];
        card.flipped = true;
        cardsInPlay.push(p2Hand[selectedCard])
        checkScore();
    } 
    turn *= -1
}

function buildCardUi(card, i) {
    return `
        <div 
        data-player="${card.player}" 
        data-idx="${i}" 
        class="card ${card.flipped ? card.face : card.player === 'p1' ? 'back-red': 'back-blue'}">
        </div>
    `;
}

 function checkScore() {
    render();
    if(cardsInPlay.length < 2) return;
    let points = 0;
    cardsInPlay.forEach(elem => {
        if(elem.player === 'p1') {
            p1CardInPlay += elem.value;
            points += elem.value;
        } else if(elem.player === 'p2') {
            p2CardInPlay += elem.value;
            points += elem.value;
        }
    });
    if(p1CardInPlay > p2CardInPlay) {
        result = 1;
        p1Score += points;
        p1CardInPlay = 0
        clearCardsFromHand();
    } else if (p1CardInPlay < p2CardInPlay) {
        result = 2;
        p2Score += points;
        p2CardInPlay = 0;
        clearCardsFromHand();
    } else if(p1CardInPlay === p2CardInPlay) {
        result = 0;
        clearCardsFromHand();
    };
}

function clearCardsFromHand() {
    for(let i = 0; i < cardsInPlay.length; i++) {
        if(cardsInPlay[i].player === 'p1') {
            p1Hand = p1Hand.filter(elem => elem.face !== cardsInPlay[i].face)
        } else {
            p2Hand = p2Hand.filter(elem => elem.face !== cardsInPlay[i].face)
        }
    }
    cardsInPlay = [];
    if(p1Hand.length === 0 && p2Hand.length === 0) allCardsDelt = true;
    setTimeout(render, 500);
}

function render() {
    p1container.innerHTML = p1Hand.map((card, idx) => buildCardUi(card, idx)).join("");
    p2container.innerHTML = p2Hand.map((card, idx) => buildCardUi(card, idx)).join("");
    p1ScoreEl.textContent = p1Score;
    p2ScoreEl.textContent = p2Score;
    winner = checkWinner();
    if(winner) {
        winner === 'p1'
        ? message.textContent = `Congratulations! ${lookUpObject['1']} won!`
        : message.textContent = `Congratulations! ${lookUpObject['-1']} won!`;
        resultEl.textContent = '';
    } else if(result === 1) {
        resultEl.textContent = 'Player One Gets The Point!';
    } else if(result === 2) {
        resultEl.textContent = 'Player Two Gets The Point!';
    } else if (result === 0) {
        resultEl.textContent = 'It\'s a TIE!';
    } else {
        message.textContent = `Now it's ${lookUpObject[turn]}'s turn`;                         
        resultEl.textContent = '';
    };
}

function checkWinner() {
    if(allCardsDelt) {
        return p1Score > p2Score ? 'p1' : 'p2'
    } else {
        return false;
    }
}




