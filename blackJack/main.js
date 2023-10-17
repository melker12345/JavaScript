
function createDeck(){
    let count = [] 

    let deck = {
        heart: count,
        diamond: count,
        clubs: count,
        spades: count,
    }

    for (let i = 1; i <= 13; i++) {
        count.push(i);
    }
    return deck 
}


function startGame() {
    
}

console.log(createDeck().clubs[0]);

