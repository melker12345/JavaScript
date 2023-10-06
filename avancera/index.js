function sum(a){
    return a.reduce((total, current) => total + current, 0);
}

console.log(sum([1, 2, 3]))
console.log(sum([1, 2, 3, 4]))  