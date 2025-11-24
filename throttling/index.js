function calculate(value){
  console.log("throttled value-",value)
}
function thrott(fn,delay){
  let inThrottle=true
  
  return function(...args){
    let context=this
    if(inThrottle){
      fn.apply(context,args)
      inThrottle=false
       setTimeout(()=>{
      inThrottle=true
      },delay)
    }
   
  }
  
}

let th=document.querySelector("#throttle")
const finalthrott=thrott(calculate,1500)
th.addEventListener("click",()=>finalthrott(8))
