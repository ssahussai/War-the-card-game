/*----- constants -----*/
const lookUpObject = {
    '1': 'Player One',
    '-1': 'Player Two'
};
/*----- app's state (variables) -----*/
let turn, p1Score, p2Score, gameboard, cardsInPlay, winner; 

/*----- cached element references -----*/


/*----- event listeners -----*/
document.getElementById('resetButton').addEventListener('click', init);

/*----- functions -----*/
init();

function init() {

}































/* Pseudocode for the game:
1.	As a player I should land on the homepage and see a gameboard with the title heading "War – the card game",  all my 26 cards upside down on the deck, the scoreboard /winning card board is cleared to zero and the gameboard is ready for me to begin the game.
2.	I should be able to see a message that tells me who's turn it is.
3.	I should be able to start the game immediately by clicking on a card and see my card flipped over. 
4.	Once the card flips over, the game should automatically switch turns and shows a message of whose turn it is. 
5.	After the 2nd player’s turn, the game should compare card values of both players 
    a.	If both cards have different values, drag both cards to the right side of the player who played the higher card. 
        i.	The cards that were clicked in the deck, should fadeout.
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
9.	I should see a button that allows me to click to reset the game
*/


