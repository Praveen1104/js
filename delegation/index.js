document.querySelector("#category").addEventListener("click", (e) => {
    console.log("clicked", e.target.id)
    window.location.href = "/" + e.target.id

})