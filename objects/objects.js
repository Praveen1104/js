//objects
const user = {
  name: "praveen",
  age: 25,
};

user.name = "bosco";
delete user.age;
console.log(user);

(function (a) {
  return a;
})(5);

//accesss using []
const test = {
  name: "praveen",
  "access key": true,
};

console.log(test["access key"]);

//dynamic property

const property = "firstName";
const name = "Spraveen";

const user2 = {
  [property]: name,
};
console.log(user2["firstName"]);

const keyValues = {
  name: "keytest",
  age: 25,
  address: "bangalore",
};

console.log(Object.keys(keyValues));

for (let key in keyValues) {
  console.log(key);
  console.log("value-", keyValues[key]);
}

const duplicate = {
  a: 42,
  b: 35,
  a: 37,
};
console.log(duplicate);
//multiply by fucntion

const multi = {
  a: 20,
  b: "praveen",
  c: 30,
};

function multiply(num) {
  for (let key in num) {
    if (typeof num[key] === "number") {
      num[key] *= 2;
    }
  }
}
multiply(multi);
console.log(multi);

const p = {};
const r = { ke: 1 };
const a = { ke: 2 };

p[r] = 110; //p["[object] [object]""]
p[a] = 220;

console.log(p[r]);

const stringy = {
  name: "praveen bosco",
  age: 25,
};

const conertString = JSON.stringify(stringy);
console.log(conertString);

console.log(JSON.parse(conertString));

const obj1 = {
  name: "spread",
  age: 25,
};
const obj2 = { data: true, ...obj1 };

console.log(obj2);

//functions

const func = {
  radius: 10,
  multip() {
    return this.radius * 2;
  },
  arr: () => {
    return typeof this;
  },
};
console.log(func.multip());
console.log(func.arr());

//dstructuring

const de = {
  myname: "praveens",
};
const myname = "already";
const { myname: na } = de;

console.log(na);

//passing reference

const c = {
  greet: "hey",
};
let d;

d = c;
c.greet = "hello";

console.log(d.greet);
