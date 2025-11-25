//synchronous vs asynchronous

//sync
console.log("hi")
console.log("step 2")


//async 

//setTImeout is web api
setTimeout(() => {
    console.log("setTimeout for 2000 milliseconds")
}, 2000)


//sync
console.log("after time out log")

//callbacks

console.log("start")
function importatant(name, cal) {
    setTimeout(() => {
        cal(`call back function ${name}`,)
    }, 1000)
}
console.log("stop")

const logimportantlog = importatant("praveen", function (val) {
    console.log(val)
})
console.log(logimportantlog)


//promise

const testPromise = new Promise((resolve, reject) => {
    let result = true

    setTimeout(() => {

        if (result) {
            resolve("id accepted")
        } else {
            reject("id rejected")
        }
    }, 4000)
})

// testPromise.then((data)=>{
//     console.log(data)
// }).catch((erro)=>{
//     console.log(erro)
// })

//promise chaining

function promise1(val1) {
    console.log("promise1", val1)
}

function promise2(val1) {
    console.log("promise1", val1)

}

testPromise.then((data) => {
    console.log(data)
    return promise1("bosco")
}).then((data) => {
    return promise2("raj")
}).then((data) => {
    console.log(data)
}).catch((error) => {
    console.log(error)
})

//promise combinators
//promise.all

const testPromise1 = new Promise((resolve, reject) => {
    let result = true
    setTimeout(() => {

        if (result) {
            resolve("id accepted")
        } else {
            reject("id rejected")
        }
    }, 1000)
})
const testPromise2 = new Promise((resolve, reject) => {
    let result = true

    if (result) {
        resolve("payment received")
    } else {
        reject("paymrnt denied")
    }
})

//take all the promise as array of promises return the result if all the promises ara passed then return it value else anyone throws error it will send the error for all
Promise.all([testPromise, testPromise1, testPromise2]).then((data) => {
    console.log(data)
})
//thjs also take the array of promises and return first successful result or failure
Promise.race([testPromise, testPromise1, testPromise2]).then((data) => {
    console.log(data)
})

Promise.allSettled([testPromise, testPromise1, testPromise2])

//it send the result of all the promisses even it failure it will that also

Promise.any([testPromise, testPromise1, testPromise2])

//this will return the first fullfilled promise and ignore the rest , if all the promises are falied then it will send you an error

//async

const haldleasyncawait=async()=>{

 try{
   const message=await testPromise
    const message1=await testPromise1
    const message2=await testPromise2

    console.log("async await function",message,message1,message2)
 }catch(error){
    console.log(error)
 }


}

haldleasyncawait()