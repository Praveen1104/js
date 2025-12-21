
//var hoisting
console.log(host)
var host="prr"


test()
//let hoisting
console.log(lethost) // reference error
let lethost=2



function test(){
    console.log("function hoisted")
    console.log(ftest)
    var ftest=  10
}