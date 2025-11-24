document.querySelector("#gp").addEventListener("click",()=>{
  console.log("Grand Parent Clicked")
},true)

document.querySelector("#p").addEventListener("click",(e)=>{
  console.log("Parent Clicked")
  e.stopPropagation()
},true)
document.querySelector("#c").addEventListener("click",()=>{
  console.log("Child Clicked")
},true)