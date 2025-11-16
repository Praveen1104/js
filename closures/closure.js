//closures

//global scope
var name="praveen"


function local(){
    console.log(name)

}

local()

//closure is a bundle of fucntions arranged together where child function can access their parent's scope
//

//closure scope chain 
var e=10;
function sum(a){
    return function(b){
        return function(c){
            return function(d){
                return a+b+c+d+e
            }
        }
    }
}

console.log(sum(1)(2)(3)(4))


//shadowing

let count=0;
(function printCount(){
if(count==0){
    let count=1
    console.log(count)
}
console.log(count)
})()
//0 //1


//returning funtion

function createBase(num){
    return function(inner){
        console.log(num+inner)
    }
}

let add=createBase(6)

add(10)
add(5)

//time optimization
// timeOpti is a function that PRECOMPUTES some data once
// and then returns a function (a closure) that can use that data later.
function timeOpti() {
  // 'a' is an array that will store the squares of numbers 0–99.
  // This array is created ONLY ONCE when timeOpti() is called.
  let a = [];

  // Loop from 0 to 99
  for (let i = 0; i < 100; i++) {
    // Precompute and store the square of 'i' at position i
    // Example: a[6] = 36, a[50] = 2500, etc.
    a[i] = i * i;
  }

  // NOTE:
  // At this point, the expensive work (the loop and calculations) is done.
  // We now return a function that REUSES this precomputed array 'a'.
  // This returned function forms a CLOSURE over 'a':
  //   -> It "remembers" the variable 'a' even after timeOpti() has finished.
  return function (index) {
    // When this inner function is called, it can still access 'a',
    // because of closure: the function keeps a reference to 'a' in its
    // lexical environment.
    // It simply logs the already computed value at the given index.
    console.log(a[index]);
  };
}

// Here we CALL timeOpti() one time.
// This will:
//   1. Create the array 'a' and fill it with squares.
//   2. Return the inner function that uses 'a'.
// That inner function is stored in the variable 'closure'.
const closure = timeOpti();

// From now on, we can call closure(index) many times,
// and it will use the SAME precomputed 'a' without recalculating.

// Start measuring time for calling closure(6).
// console.time("6") starts a timer with the label "6".
console.time("6");

// Call the closure with index 6.
// Because 'a' was precomputed,
// a[6] is already 36, so this is just a fast array lookup + console.log.
closure(6);

// console.timeEnd("6") stops the timer labeled "6"
// and prints how long it took to run between time() and timeEnd().
console.timeEnd("6");

// Do the same timing for index 50.
// Start a timer labeled "50".
console.time("50");

// Call the closure with index 50.
// Again, this is just reading a[50] (2500) from the existing array,
// with no extra computation.
closure(50);

// Stop the "50" timer and log the time taken.
console.timeEnd("50");

/*
=========================== BIG PICTURE NOTES ===========================

1. What is a closure here?
   - The inner function `function (index) { console.log(a[index]); }`
     is a closure because it uses the variable `a` from its outer function
     `timeOpti`, even after `timeOpti` has finished executing.
   - JavaScript keeps `a` alive in memory as long as `closure` exists,
     because `closure` still needs it.

2. Why is this "time optimized"?
   - The heavy work (loop + i * i for 0–99) runs ONLY ONCE inside timeOpti().
   - Every time you call `closure(index)`, it does:
       - O(1) array access: a[index]
       - console.log(...)
   - There is NO recomputation of i * i inside closure().

3. Time vs Space trade-off:
   - TIME: Faster repeated lookups, because values are ready.
   - SPACE: Uses memory to store the entire array of precomputed squares.
   - This pattern is useful when:
       - The precomputation is expensive.
       - You need to use the results many times.

4. Non-closure / non-precompute version (for comparison):
   - A simple version without precomputation would be:
       function noOpti(index) {
         console.log(index * index);
       }
     This recomputes index * index every time.
   - For small operations like squaring, it's fine.
   - But if the work was heavy (complex math, big loops, API calls, etc.),
     precomputing once (like in timeOpti) would be a big win.

5. Why console.time + console.timeEnd?
   - They are used to measure how long some code took to run.
   - Here, they show that each closure() call is very fast,
     because it's just using precomputed data.

======================================================================
*/
function block(){
    for(let i=0;i<3;i++){
        setTimeout(()=>{
  console.log(i)
        },1000)
    }
}
block()

    for(let i=0;i<3;i++){

      function inner(i){
        setTimeout(()=>{
            console.log(i)
        },1000)
    }
      inner(i)
        
      }
    
      //run only once
      function likeTheVideo(){
        let called=0

        return function()
        {
            if(called>0){
                console.log("Already Subscribed")
            }else{
                console.log("Firrst Time")
                called++
            }
        }
      }
let subscribe=likeTheVideo()
console.log(subscribe())
console.log(subscribe())

//memoize  
function myMemoize(fn,context){
    const res={}
    return function (...args){
        var argsCache=JSON.stringify(args)
        if(!res[argsCache]){
            res[argsCache]=fn.call(context||this,...args)
        }
        return res[argsCache]
    }
}

const clumsyProduct=(num1,num2)=>{
    for (let i=0;i<10000000;i++){
        return num1 * num2
    }
}
const result=myMemoize(clumsyProduct)

console.time("first call")
console.log(result(13,23))//fucntion(...args)
console.timeEnd("first call")
console.time("second call")
console.log(result(13,23))
console.timeEnd("second call")