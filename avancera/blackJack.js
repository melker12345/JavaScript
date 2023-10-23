let deck = [];
let suits = ['HEARTS', 'SPADES', 'DIAMONDS', 'CLUBS'];

for (let suit of suits) {
  for (let value = 1; value <= 13; value++) {
    let cardValue;
    switch (value) {
      case 1:
        cardValue = 'A';
        break;
      case 10:
        cardValue = 'T';
        break;
      case 11:
        cardValue = 'J';
        break;
      case 12:
        cardValue = 'Q';
        break;
      case 13:
        cardValue = 'K';
        break;
      default:
        cardValue = value.toString();
    }
    
    deck.push({ suit: suit, value: cardValue });
  }
}
console.log(deck);