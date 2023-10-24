function createDeck() {
  const deck = [];
  const suits = ["HEARTS", "SPADES", "DIAMONDS", "CLUBS"];

  // Iterera över suits värdena
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    // Iterera 13 kortvärdena
    for (let value = 1; value <= 13; value++) {
      const card = {
        suit: suits[suitIndex],
        value: value,
      };
      // Lägg till card i deck arrayn
      deck.push(card);
    }
  }
  return deck;
}

function prettyCard(card) {
  let valueStr, suitChar;

  // Hanterar J-A
  switch (card.value) {
    case 1:
      valueStr = "A";
      break;
    case 10:
      valueStr = "T";
      break;
    case 11:
      valueStr = "J";
      break;
    case 12:
      valueStr = "Q";
      break;
    case 13:
      valueStr = "K";
      break;
    default:
      valueStr = card.value.toString();
  }

  // Hanterar unicode for suits
  switch (card.suit) {
    case "HEARTS":
      suitChar = "♥";
      break;
    case "SPADES":
      suitChar = "♠";
      break;
    case "DIAMONDS":
      suitChar = "♦";
      break;
    case "CLUBS":
      suitChar = "♣";
      break;
    default:
      suitChar = "?";
  }

  return valueStr + suitChar;
}

function draw(deck) {
  if (deck.length === 0) {
    console.log("Kortleken är tom.");
    return null;
  }
  const drawnCard = deck.pop();

  console.log("Det dragna kortet är:", prettyCard(drawnCard));

  return drawnCard;
}

function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[randomIndex]] = [deck[randomIndex], deck[i]];
  }
}
function score(cards) {
  let totalScore = 0;
  let numAces = 0;

  for (const card of cards) {
    if (card.value >= 11 && card.value <= 13) {
      totalScore += 10;
    } else if (card.value === 1) {
      totalScore += 11;
      numAces++;
    } else {
      totalScore += card.value;
    }
  }

  // Adjust the value of aces to prevent busting
  while (numAces > 0 && totalScore > 21) {
    totalScore -= 10;
    numAces--;
  }

  return totalScore;
}

const myDeck = createDeck();

shuffle(myDeck);

console.log(
  score([
    { suit: "HEARTS", value: 10 },
    { suit: "SPADES", value: 1 },
  ])
);
