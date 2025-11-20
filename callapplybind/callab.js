//call apply bind 


const obj = {
    name: "praveen",
    age: 25
}
//call
function solved(arg) {
    console.log(`hi ${this.name} your age is ${this.age} and  you are a ${arg} developer `)
}

solved.call(obj, "frontend")
//apply
function solve1(salary, blood) {
    console.log(`hey ${this.name} age- ${this.age} salary -${salary} Blood Group- ${blood}`)
}

solve1.apply(obj, ["520000", "b+"])

//bind

function solved2(salary) {
    console.log(`hello ${this.name} - salary-${salary}`)
}

const bindSolve = solved2.bind(obj)

bindSolve(540000)
bindSolve(600000)


const callbind =
{
    name: "bosco"
}

function callBind(){
    console.log(`excuse me ${this.name}`)
}

callBind.call(callbind)
console.log(callBind.bind(callbind))

const fobject={
    name:"inner",
    getName:function(){
        return this.name
    }
}
const f2object={name:"outer"}

console.log(fobject.getName.call(f2object))