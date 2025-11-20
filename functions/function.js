//function declarion or definition or statement

function dec(test) {
  return test;
}

// funtion expression
//when you store a function in a variable is called function expression

let expression = function (test) {
  return test;
};

//funtion(test){} this is called as anonymous function  , function without name

//IIFE
(function (a) {
  console.log(a);
})(5);

(function (x) {
  return (function (y) {
    console.log(x);
  })(2);
})("f");

function timevarlet() {
  for (let i = 1; i < 5; i++) {
    setTimeout(() => {
      console.log(i);
    }, i * 1000);
  }
}
timevarlet();

console.log(n);
//funtion hoisting
hoisting();
function hoisting() {
  console.log("hoisted");
}
var n = 10;

const promise = new Promise((res, rej) => {
  if (n === 5) {
    res("passed");
  } else {
    rej("failed");
  }
});

promise.then((res) => console.log(res)).catch((err) => console.log(err));

const promise1 = new Promise((res, rej) => {
  res("result");
});

function f1() {
  promise1.then((res) => console.log(res));
  console.log("f1 printed");
}

async function f2() {
  const res = await promise1;
  console.log("awaitaysnc",res);
  console.log("f2 printed");
}
f1();
f2();
// Step-by-step execution
// 1️⃣ Calling f1()

// Inside f1:

// promise1.then(...) is registered.
// → This schedules the callback (res) => console.log(res) as a microtask that runs after the current synchronous code finishes.

// Then console.log("f1 printed") runs immediately.

// ✅ So, “f1 printed” appears right away.
// The then() callback is not executed yet, because microtasks always run after the current synchronous phase finishes.

// 2️⃣ Calling f2()

// f2 is async, so it starts synchronously until it hits await.

// Execution hits:

// const res = await promise1;

// Here’s what happens:

// await tells JS: “Pause f2 right here, and let the event loop continue. Resume this function only after the promise is settled (resolved or rejected).”

// So the rest of f2 (console.log(res) and console.log("f2 printed")) is suspended and queued as a microtask that will run after the promise resolves.

// ✅ That means control returns immediately to the outer (main) thread.

// 3️⃣ Event loop & microtasks

// Now the synchronous code is done — the call stack is empty.
// The JS engine now runs microtasks in order:

// The microtask from promise1.then(...) (inside f1).

// The resumed continuation of the async function f2 (its await resolution).

// But both depend on the same promise1.
// If promise1 was already resolved (or resolves very soon), both callbacks (then() and await) will be queued in the microtask queue.

// 🧠 The difference explained
// Concept	promise.then()	await
// When runs	Registers callback → executes later as microtask	Pauses the async function, resumes later as microtask
// Flow control	Doesn’t pause the function — code continues after .then() immediately	Pauses the async function at await until promise settles
// Effect	The rest of the code in the same function keeps running immediately	The rest of the async function waits for the promise




//params vs arguments

function paramsarguments(p,q){ //params

}

paramsarguments(1,2) //arguments

//spread
const arr=[1,2,3,4]
const arr1=[5,6,7,8]


const spread=[...arr,...arr1,90,99,100]

console.log(spread)


//function calls expands a iteratable value into i9ndividual

function  iteratable(a,b,c){
    console.log(a,b,c)
}

const a1=[1,2,3]
iteratable(...a1)


//rest operator pack the values

function pack(...pack){
    console.log(pack)
}
pack("8","test","data")

//callback function- function passed as an argument to another function is called as call back function

function cb1(num){
    console.log("hello" + "",num)
}

function main(cb1){
    cb1("praveen")
}

main(cb1)

//difference between normal function and arrow function


//syntax

function normal(){

}
const arrow=()=>{

}

//implicit return keyword

const implicit=()=> console.log("implicit")


//own arguments
function ownArguments(){
    console.log(arguments)
}
ownArguments(1,3,4)


const ownArrowArguments=()=>{
    console.log(arguments)
}

//ownArrowArguments(2,3,4,5)

const obj={
    name:"praveen",
    r1:()=>{
        console.log("hi"+"",this.name)
    },
    r2(){
console.log("hello"+"",this.name)
    }
}
obj.r1()
obj.r2()
