 
       function debounce(func,delay){
         
         let timer;
         return function(...args){
           const context=this
           
           clearTimeout(timer)
           timer=setTimeout(()=>{
            
               func.apply(context,args)
           },delay)
         }
         
       }
       const backFn=(context)=>{
          console.log(context)
         console.log("typed",)
       }
        const inpt=document.querySelector("#inp")
        inpt.addEventListener("keyup",debounce(backFn,500))
        
      