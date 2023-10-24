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

const myDeck = createDeck();

for (let i = 0; i < 52; i++) {
    console.log("Antal kort i kortleken innan drag:", myDeck.length);

    const drawnCard = draw(myDeck); // Dra ett kort från kortleken
    if (drawnCard !== null) {
        console.log("Antal kort i kortleken efter drag:", myDeck.length); // Visa antalet kort i kortleken
    }
}
