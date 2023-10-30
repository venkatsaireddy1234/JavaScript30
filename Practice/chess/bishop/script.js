const checkBox = document.querySelectorAll(".checkbox");
console.log(checkBox);

checkBox.forEach(element => {
    element.addEventListener('click',()=>{
        console.log("hai");
    })
});



