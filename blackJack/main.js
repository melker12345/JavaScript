count = []

let deck  = {
    heart: count,
    diamond: count,
    clubs:  count,
    spades:  count,
    
}

for (let i = 0; i < 14; i++) {
    count.push(i)    
}
// [random index]
console.log(deck.heart[13])
