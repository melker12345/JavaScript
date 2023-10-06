// function sum(a){
//     return a.reduce((total, current) => total + current, 0);
// }

// console.log(sum([1, 2, 3]))
// console.log(sum([1, 2, 3, 4]))  

// function average(a){
//     return  isNaN(a) ? (a.reduce((total, current) => total + current, 0) / a.length): null;
// }


function reverse(a) {
    b = []
    // set i = a.length - 1 because a.length counts a[0] as 1  
    for (let i = a.length - 1; i >= 0; i--) {
        b.push(a[i])
    }
}
console.log(reverse([1, 2, 3]))
