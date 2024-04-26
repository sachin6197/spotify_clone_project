// var createCounter = function(n) {
//     for (let i = 1; i <= 3; i++) {
//         console.log("sr1 = " + i)
//         n += 1; // Fixed the typo error here to increment n by 1
//         console.log("sr2 = " + i)
//         console.log("n1 = " + n)
//     }
    
//     return function() {
//         console.log("sr3 = " + n)
//         return n++; // Increment n and return its current value
//         console.log("sr4 = " + n)
//     };  
// };

// const sachin = createCounter(6);
// console.log(sachin());
// console.log(sachin()); 
// // console.log(sachin()); 


// var compose = function(function) {
//     console.log(x + 1)
//     return function(x) {
//      function() {
//         x * x
        
//         function(){
//             2 * x
            
//         }
//     }
// }
// };


function functionComposition(functions) {
    return function(x) {
        if (functions.length === 0) {
            return x; // Identity function
        } else {
            let result = x;
            for (let i = functions.length - 1; i >= 0; i--) {
                result = functions[i](result);
            }
            console.log(result)
            console.log(x)
            return result;
        }
    };
}

function bbc (){
    x = 4
    return x
}
const sr = functionComposition(bbc(4))
console.log(result)
