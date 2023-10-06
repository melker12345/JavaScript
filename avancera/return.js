// let greeting = function () {
//     return 'Hello World!'
// }
// let s = greeting()
// alert(s)


// let greeting = function (a) {
//     return `Hello ${a}!`
// }
// console.log(greeting('Alice'))
// console.log(greeting('Bob'))

// let successor = function(a){
//     return a + 1
// }

// console.log(successor(1))
// console.log(successor(10))

// function difference(a, b){
//     return a - b
// }

// console.log(difference(10, 5))
// console.log(difference(1, 2))


// calculate factorial of n recursevly  
let factorial = function (n) {
    
    return n != 1 ?  n * factorial(n - 1) : 1 
    
}
console.log(factorial(1));