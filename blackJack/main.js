let count = [] 

let deck = {
    heart: [count],
    diamond: [count],
    clubs: [count],
    spades: [count],
}

for (let i = 1; i <= 13; i++) {
    count.push(i);
}


// how do i pick a random value ?
let randomSuit = Object.keys(deck)[Math.floor(Math.random() * 4)];
let randomCardIndex = Math.floor(Math.random() * deck[randomSuit].length);
let randomCard = deck[randomSuit][randomCardIndex];
console.log(`${randomCard} of ${randomSuit}`);

// How to pick a random key from the deck
let suits = Object.keys(deck);
let randomSuitIndex = Math.floor(Math.random() * suits.length);
let randomSuitKey = suits[randomSuitIndex];
console.log(randomSuitKey)