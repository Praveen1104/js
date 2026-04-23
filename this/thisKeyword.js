//this in global

this.a = 5;

// console.log(this.a);
// console.log(this);

function call() {
  console.log(this);
}

call(); // browser this will return window


//inside object 

// Why?

// Normal functions get this from how they are called
const user={
    name:"praveen",
    getDetails(){
     console.log("Hi",this.name)
    }

}
user.getDetails()

// Why?

// Arrow functions DO NOT have their own this.

// 👉 They take this from where they are created (lexical scope)

// In this case:

// getdat is defined in the global scope
// So this → global object (or undefined in strict mode)

// So:
// Why this matters

// 👉 Arrow function captures this at creation time, not based on where it's placed.

// So:

// It is written inside the object
// But it is created in the outer scope

// Objects do NOT create a new this scope
// Only functions create this binding
const arrouser={
    name:"praveen",
    getdat:()=>{
       console.log(this.name)
    }
}

arrouser.getdat()
// Arrow Function:

// 👉 “I don’t care who calls me, I use outer this”

// Normal Function:

// 👉 “Whoever calls me is my this”

//this in class  

//this points the variable inside the constructor
class users{
constructor(n){
    this.name=n
}

getName(){
    console.log(this.name)
}


}
const classuser=new users("bosco")
classuser.getName()


const firstuser={
    firstName:'praveens',
    getName(){
        const firstName="p"
        return this.firstName
    }
}
console.log(firstuser.getName())


//function=>object=>this =>  not going to point the current object
//undefined   // (in strict mode)

//or

//window      // (in browser non-strict mode)
function makeuser(){
    return {
        name:"bosco",
        ref:this
    }
}

let userf=makeuser()

console.log(userf.ref)

function makeuser1(){
    return {
        name:"bosco",
        ref(){
            return this
        }
    }
}
let userf1=makeuser1()

console.log(userf1.ref().name)

//set timeout version

const windowuser={
    name:"pb",
    logmessage(){
        console.log(this.name)
    }
}

setTimeout(windowuser.logmessage,1000)

const obj = {
  name: "Omkar",
  show: function() {
    const arrow = () => {
      console.log(this.name); // ✅ Omkar
    };
    arrow();
  }
};

// show() → normal function → this = obj
// arrow → captures this from show()
// 🎯 Final One-Line Rule

// 👉 Arrow function inside object ≠ object this
// 👉 Arrow function inside function = inherits that function’s this