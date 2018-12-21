/*
Blackjack
by Marat Hakimov
*/

//card variables
let suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
let values = ["Ace", "King", "Queen", "Jack",
  "Ten", "Nine", "Eight", "Seven", "Six",
  "Five", "Four", "Three", "Two"];

//DOM Variables
let tekst = document.getElementById('bj');
let start = document.getElementById('start');
let hit = document.getElementById('hit');
let stay = document.getElementById('stay');

//Game variables
let gameStarted = false,
  gameOver = false,
  playerWon = false,
  dealerCards = [],
  playerCards = [],
  dealerScore = 0,
  playerScore = 0,
  deck = [];

hit.style.display = 'none';
stay.style.display = 'none';
showStatus();

start.addEventListener('click', function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;
  
  deck = populateDeck();
  shuffleDeck(deck);
   dealerCards = [getNextCard(), getNextCard()];
   playerCards = [getNextCard(), getNextCard()];

  start.style.display = 'none';
  hit.style.display = 'inline';
  stay.style.display = 'inline';
  showStatus();
});

hit.addEventListener('click', function() {
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

stay.addEventListener('click', function() {
  gameOver = true;
  checkForEndOfGame();
  showStatus();
})


function populateDeck() {
  let deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (valueI = 0; valueI < values.length; valueI++) {
      let card = {
        value: values[valueI],
        suit: suits[i]
      };
      deck.push(card)
    }
  }
  return deck;
}

function shuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    let swpI = Math.trunc(Math.random() * 52);
    let temp = deck[swpI]
    deck[swpI] = deck[i];
    deck[i] = temp;
  }
}

function getCardString(card) {
  return card.value + " of " + card.suit;
}

function getNextCard() {
  return deck.shift();
}

function getCardNumericValue(card) {
  switch(card.value) {
    case "Ace":
      return 1;
      case "Two":
        return 2;
        case "Three":
        return 3;
        case "Four":
        return 4;
        case "Five":
        return 5;
        case "Six":
        return 6;
        case "Seven":
        return 7;
        case "Eight":
        return 8;
        case "Nine":
        return 9;
        default:
        return 10;
  }
}

function getScore(cardArray) {
  let score = 0;
  let hasAce = false;
  for (let i = 0; i < cardArray.length; i++) {
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if (card.value === "Ace") {
      hasAce = true;
    }
  }
  if (hasAce && score + 10 <= 21) {
    return score + 10;
  }
  return score;
}

function updateScores() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function checkForEndOfGame() {
  
  updateScores();
  
  if(gameOver) {
    //let dealer take cards
    while(dealerScore < playerScore
    && dealerScore <= 21
    && playerScore <= 21) {
     dealerCards.push(getNextCard());
     updateScores();
    }
  }
  
  if (playerScore > 21) {
    playerWon = false;
    gameOver = true;
  }
  else if(dealerScore > 21) {
    playerWon = true;
    gameOver = true;
  }
  else if(gameOver) {
    
    if(playerScore > dealerScore) {
      playerWon = true;
    }
    else if(playerScore < dealerScore){
      playerWon = false;
    }
    else {
      tekst.innerText = "IT'S A DRAW!";
    }
  }
}

function showStatus() {
  if (!gameStarted) {
    tekst.innerText = "Blackjack'ke rexim itegez!";
    return;
  }

  let dealerCardString = '';
  for (let i = 0; i < dealerCards.length; i++) {
    dealerCardString += getCardString(dealerCards[i]) + "\n";
  }
  
  let playerCardString = '';
  for (let i = 0; i < playerCards.length; i++) {
    playerCardString += getCardString(playerCards[i]) + "\n";
  }

  updateScores();

  tekst.innerText =
  "Dealer has:\n" 
  + dealerCardString
  + "(score: " + dealerScore + ")\n\n"

  + "Player has:\n" 
  + playerCardString
    + "(score: " + playerScore + ")\n\n"

  if (gameOver) {
    if (playerWon) {
      tekst.innerText += "YOU WIN!"
    } 
    else {
      tekst.innerText += "DEALER WINS"
    }
    start.style.display = 'inline';
    hit.style.display = 'none';
    stay.style.display = 'none';
  }
  
}

shuffleDeck(deck);

console.log("Welcome to Blackjack!");

 playerCards = [getNextCard(), getNextCard()];

console.log("You are dealt: ");

//console.log(" " + getCardString(playerCards[0]));
//console.log(" " + getCardString(playerCards[1]));