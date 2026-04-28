const STATES = {
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED",
};

function CustomPromise(executor) {
  // current state of promise
  let state = STATES.PENDING;

  // stores resolved value OR rejection error
  let value;

  // queues to store handlers until promise settles
  let resolutionHandlers = [];
  let rejectionHandlers = [];

  // run correct handlers based on state
  function runHandlers() {
    if (state === STATES.FULFILLED) {
      resolutionHandlers.forEach((handler) => handler(value));
      resolutionHandlers = []; // clear after execution
    }

    if (state === STATES.REJECTED) {
      rejectionHandlers.forEach((handler) => handler(value));
      rejectionHandlers = [];
    }
  }

  // resolve function (success)
  function resolve(val) {
    queueMicrotask(() => {
      // prevent multiple resolve/reject calls
      if (state !== STATES.PENDING) return;

      // if returned value is a promise → wait for it
      if (val instanceof CustomPromise) {
        return val.then(resolve, reject);
      }

      value = val; // store value
      state = STATES.FULFILLED; // update state

      runHandlers(); // execute queued .then()
    });
  }

  // reject function (failure)
  function reject(err) {
    queueMicrotask(() => {
      if (state !== STATES.PENDING) return;

      value = err;
      state = STATES.REJECTED;

      runHandlers(); // execute queued .catch()
    });
  }

  // THEN METHOD (core logic)
  this.then = function (onFulfilled, onRejected) {
    // each .then() returns a NEW promise (important)
    return new CustomPromise((resolveNext, rejectNext) => {
      // handles success case
      function handleFulfilled(val) {
        try {
          if (typeof onFulfilled !== "function") {
            // if no handler → pass value forward
            return resolveNext(val);
          }

          // run user function
          const result = onFulfilled(val);

          // if it returns a promise → wait for it
          if (result instanceof CustomPromise) {
            result.then(resolveNext, rejectNext);
          } else {
            resolveNext(result); // pass result to next then
          }
        } catch (err) {
          rejectNext(err); // errors go to next catch
        }
      }

      // handles rejection case
      function handleRejected(err) {
        try {
          if (typeof onRejected !== "function") {
            return rejectNext(err); // pass error forward
          }

          const result = onRejected(err);

          if (result instanceof CustomPromise) {
            result.then(resolveNext, rejectNext);
          } else {
            resolveNext(result); // note: resolve after catch
          }
        } catch (error) {
          rejectNext(error);
        }
      }

      // if still pending → store handlers
      if (state === STATES.PENDING) {
        resolutionHandlers.push(handleFulfilled);
        rejectionHandlers.push(handleRejected);
      }

      // if already resolved → run immediately (async)
      if (state === STATES.FULFILLED) {
        queueMicrotask(() => handleFulfilled(value));
      }

      // if already rejected → run immediately (async)
      if (state === STATES.REJECTED) {
        queueMicrotask(() => handleRejected(value));
      }
    });
  };

  // catch is just syntactic sugar
  this.catch = function (onRejected) {
    return this.then(null, onRejected);
  };

  // immediately execute executor
  try {
    executor(resolve, reject);
  } catch (err) {
    reject(err); // catch sync errors
  }
}

{
  /*/ TESTING THE CUSTOM PROMISE IMPLEMENTATION
    
    Great, this is the core of Promises—once this clicks, everything else becomes easy.

Let’s go step-by-step with 3 chained .then() and see exactly:

how handlers are stored
when runHandlers() runs
how values move
how new promises are created
🔹 Example
init()
  .then(v => v + 1)
  .then(v => v * 2)
  .then(v => console.log(v));

Assume:

function init() {
  return new CustomPromise(resolve => resolve(10));
}
🔥 High-Level Chain
P0 → P1 → P2 → P3
Promise	Created by
P0	init()
P1	first .then()
P2	second .then()
P3	third .then()
🔁 Step-by-Step Execution
🟡 STEP 1: init() runs
resolve(10)
state = FULFILLED
value = 10

BUT:

queueMicrotask(runHandlers)

👉 handlers not executed yet

🟡 STEP 2: First .then()
.then(v => v + 1)
What happens internally:
Creates P1
Adds handler into P0
P0.resolutionHandlers = [handleFulfilled1]
🟡 STEP 3: Second .then()
.then(v => v * 2)
Creates P2
Adds handler into P1
P1.resolutionHandlers = [handleFulfilled2]
🟡 STEP 4: Third .then()
.then(v => console.log(v))
Creates P3
Adds handler into P2
P2.resolutionHandlers = [handleFulfilled3]
🔥 IMPORTANT: Nothing executed yet

All handlers are just stored in arrays

⚡ STEP 5: Microtask runs → P0.runHandlers()

Now the magic starts.

🟢 P0.runHandlers()
P0.value = 10

Run:

handleFulfilled1(10)
🟢 Inside handleFulfilled1
v => v + 1

👉 returns:

11

Now:

resolveNext(11)

👉 This resolves P1

🔁 STEP 6: P1 resolves
P1.value = 11

Triggers:

P1.runHandlers()
🟢 P1.runHandlers()
handleFulfilled2(11)
🟢 Inside handleFulfilled2
v => v * 2

👉 returns:

22

Now:

resolveNext(22)

👉 resolves P2

🔁 STEP 7: P2 resolves
P2.value = 22

Triggers:

P2.runHandlers()
🟢 P2.runHandlers()
handleFulfilled3(22)
🟢 Inside handleFulfilled3
console.log(22)

👉 OUTPUT:

22
🔥 FINAL FLOW
P0: resolve(10)
   ↓
P1: 10 → 11
   ↓
P2: 11 → 22
   ↓
P3: console.log(22)
🧠 HOW runHandlers() WORKS

Each promise has:

resolutionHandlers = []
When .then() is called:
resolutionHandlers.push(handler)
When resolve() happens:
runHandlers()
runHandlers does:
handlers.forEach(handler => handler(value))
🔥 KEY IDEA

👉 Each promise only runs its own handlers

P0 runs only its handlers
P1 runs only its handlers
P2 runs only its handlers
🔁 Think Like Relay Race 🏃
Runner1 → Runner2 → Runner3
Runner1 finishes → passes baton (value)
Runner2 runs → passes baton
Runner3 runs → final output
⚠️ Important Detail

👉 Handlers are NOT shared

Each promise has its own:

value
state
handlers
🔥 Why resolveNext() is Important
resolveNext(result)

👉 This connects:

P0 → P1 → P2 → P3

Without it → chain breaks ❌

🚀 One-Line Understanding

👉

Each .then() = store handler → run when previous resolves → pass result forward
    
debugPromise(r => r(10))
  .then(v => v + 1)
  .then(v => v * 2)
  .then(v => console.log("🎯 final:", v));

  ✅ resolve called with: 10
📌 then registered
📌 then registered
📌 then registered

⚡ microtask: resolving 10
👉 runHandlers called with value: 10
➡️ handler executing with: 10
⬅️ handler returned: 11

⚡ microtask: resolving 11
👉 runHandlers called with value: 11
➡️ handler executing with: 11
⬅️ handler returned: 22

⚡ microtask: resolving 22
👉 runHandlers called with value: 22
➡️ handler executing with: 22
🎯 final: 22


3. WHAT IF ONE .then() THROWS ERROR?
🔹 Example
init()
  .then(v => {
    console.log(v);
    throw "ERROR ❌";
  })
  .then(v => v + 1)
  .catch(err => console.log("Caught:", err));
🔁 Flow
🟢 Step 1
P0 → resolve(10)
🟢 Step 2 (First then)
v => { throw "ERROR" }

👉 Instead of resolve:

P1 → REJECTED("ERROR")
🟢 Step 3 (Next then)
.then(v => v + 1)

👉 Skipped ❌

Because promise is rejected

🟢 Step 4 (catch)
.catch(err => ...)

👉 Runs:

Caught: ERROR ❌
🔥 Error Flow Diagram
P0 → fulfilled(10)
 ↓
P1 → ❌ throws error → rejected
 ↓
P2 → skipped
 ↓
catch → handles error
🧠 Golden Rules (MUST REMEMBER)
✅ Rule 1
Each .then() = new Promise
✅ Rule 2
return value → resolve next
throw error → reject next
✅ Rule 3
Rejected skips all .then() until catch
✅ Rule 4
Microtasks run AFTER call stack
🚀 Final Mental Model
Promise chain = pipeline

value → process → process → process → output
        ↑ error breaks flow ↓
        
    */
}
