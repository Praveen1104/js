//this in global

this.a = 5;

// console.log(this.a);
// console.log(this);

function call() {
  console.log(this);
}

call(); // browser this will return window


//inside object    
const user={
    name:"praveen",
    getDetails(){
     console.log("Hi",this.name)
    }

}
user.getDetails()

const arrouser={
    name:"praveen",
    getdat:()=>{
       console.log(this.name)
    }
}

arrouser.getdat()


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