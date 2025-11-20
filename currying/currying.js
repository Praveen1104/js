
function curry(a){
    return function(b){
        return function(c){
            return function(d){
                return a+b+c+d
            }
        }
    }
}

console.log(curry(1)(2)(3)(4))


function evaluate(operation){
    return function(a){
        return function( b){
        if(operation==="sum"){
            return a+b
        }else if(operation==="multiply"){
            return a * b
        }else if(operation==="divide"){
            return a/b
        }else if(operation==="substract"){
            a-b
        }else{
            return "Invalid Operation"
        }
        }
    }
}

const mul=evaluate("multiply")
//Code Reusability: Create specialized functions from general ones.
console.log(mul(6)(7))


//infinite currying


function add(a){
    return function(b){
        if(b){
            return add(a+b)
        }else{
            return a
        }
    }
}

console.log(add(5)(6)(7)(6)(9)())

//partial application 

function partial(a){
    return function(b,c){
        return a+b+c
    }
} 

console.log(partial(4)(4,5))

//implement currying
function curry(func){
    return function curried(...args){
        if(args.length>=func.length){
            return func(...args)
        }else{
            return function(...next){
                return curried(...args,...next)
            }
        }
    }
}

const sum=(a,b,c,d)=>a+b+c+d

const total=curry(sum)
console.log(total(1,2,4,5))