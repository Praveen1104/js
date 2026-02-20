console.log("-----------------POLYFILLS---------------------");
console.log("-------------------MAP-------------------------");
Array.prototype.myMap = function (cb) {
  let res = [];
  for (let i = 0; i < this.length; i++) {
    res.push(cb(this[i], i, this));
  }
  return res;
};
const map = [1, 3, 4, 5, 6];

let mapres = map.myMap((num, i, arr) => {
  return num * 2;
});
console.log(mapres);

console.log("-------------------FILTER-------------------------");
Array.prototype.myFilter = function (cb) {
  let res = [];

  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      res.push(this[i]);
    }
  }
  return res;
};

const fil = [2, 3, 4, 5, 6, 7, 8];
let myFil = fil.myFilter((num, i, fil) => {
  return num % 2 == 0;
});
console.log(myFil);

console.log("-------------------REDUCE-------------------------");
Array.prototype.myReduce = function (cb, initial) {
  let acc = initial;
  for (let i = 0; i < this.length; i++) {
    acc = acc ? cb(acc, this[i], i, this) : this[i];
  }
  return acc;
};

const red = [1, 2, 3, 4, 5, 6];
let redres = red.myReduce((acc, num, i, red) => {
  return acc + num;
}, 20);
console.log(redres);

console.log("-------------------CALL-------------------------");
Function.prototype.myCall = function (context, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + "Not a function");
  }

  context = context || globalThis;

  let callSymbol = Symbol();

  context[callSymbol] = this;

  let res = context[callSymbol](...args);
  delete context[callSymbol];
  return res;
};
function callTest1(company, salary) {
  return `my name is ${this.name} and age is ${this.age} working in ${company} tech earning ${salary} LPA`;
}
const obj = {
  name: "Praveen S",
  age: 25,
};
let callRes = callTest1.myCall(obj, "Nineleaps", 14);
console.log(callRes);

console.log("-------------------APPLY-------------------------");
Function.prototype.myApply = function (context, args) {
  if (typeof this !== "function") {
    throw new Error(this + "is not a function");
  }
  if (!Array.isArray(args)) {
    throw new Error(args + " is not an array");
  }
  context = context || globalThis;

  let fnSymbol = Symbol();

  context[fnSymbol] = this;
  let res = context[fnSymbol](...args);

  delete context[fnSymbol];
  return res;
};

function myApplyTest(city) {
  return `Native is ${this.native}, currently living in ${city} `;
}
const obj1 = {
  native: "Salem",
};
let applyRes = myApplyTest.myApply(obj1, ["Bangalore"]);
console.log(applyRes);

console.log("-------------------BIND-------------------------");

Function.prototype.myBind = function (context = {}, ...args) {
  if (typeof this !== "function") {
    throw new Error(this + " is not function cannot Bound this");
  }

  context = context || globalThis;
  let myBi = Symbol();
  context[myBi] = this;
  return function (...newArgs) {
    return context[myBi](...args, ...newArgs);
  };
};
function myBindTest(sde, exp) {
  return `working as an ${sde}, with ${exp} of experience`;
}
const bindObj = {};
let resMybind = myBindTest.myBind(bindObj, "Software Development Engineer");
console.log(resMybind(2.9));
