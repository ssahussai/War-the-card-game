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

//this function shows who holds the higher card and player with higher card gets a point
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
    }
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
    setTimeout(render, 2000);
}

//tranfer the game from js to the DOM through render()
function render() {
    p1container.innerHTML = p1Hand.map((card, idx) => buildCardUi(card, idx)).join("");
    p2container.innerHTML = p2Hand.map((card, idx) => buildCardUi(card, idx)).join("");
    p1ScoreEl.textContent = p1Score;
    p2ScoreEl.textContent = p2Score;
    if(result === 1) {
        resultEl.textContent = 'Player One Gets the Point!';
    } else if(result === 2) {
        resultEl.textContent = 'Player Two Gets the Point!';
    } else if (result === 0) {
        resultEl.textContent = 'It\'s a WAR';
    } else {
        resultEl.textContent = '';
    }
    message.textContent = `Now it's ${lookUpObject[turn]}'s turn`;                                 
}


function winningScore() {
    let totalScore;
    let holdScoreArray = [];
}

/* 
   
    b.	If both cards have the same value, prompt a message saying “It’s a war. Please choose 3 more cards”.
        i.	After the 2nd player’s turn, the game should add the value of all 6 cards and compare card values of both players to see who played the higher cards. 
        ii.	If the card values different for both players,
            1.	The game should drag all 6 cards to the right side of the player who played the higher cards.
            2.	The cards that were clicked in the deck, should fadeout.
        iii.	If the card values are the same again and it’s a tie, repeat step (5.b.i ) until the both players get different value cards. 
            1.	If card values are different in war stage of the game, after the 2nd player’s turn, the game should add the value of all 6 cards and compare card values of both players to see who played the higher cards. 
6.	The game should repeat steps 2-5 until all 52 cards disappear from the deck. 
7.	The player with the most cards in the winning board should be calculated as winner.
8.	I should see the message change to show me who has won the game
*/


