let addbtn=document.querySelector(".add-btn");
let modalCont=document.querySelector(".modal-cont");

let isModalPresent=false;
addbtn.addEventListener('click',function(){
    if(!isModalPresent){
        modalCont.style.display="flex";
        isModalPresent=true;
    }
    else{
        modalCont.style.display="none";
        isModalPresent=false;
    }
})

let allPriorityColors=document.querySelectorAll(".priority-color");

/*for(let i=0;i<allPriorityColors.length;i++){
    allPriorityColors[i].addEventListener('click',function(e){
        for(let j=0;j<allPriorityColors.length;j++){
            console.log(allPriorityColors[j].classList);
            allPriorityColors[j].classList.remove("active");
        }
        // e.currentTarget.classList.add("active");
        allPriorityColors[i].classList.add("active");
    })
}*/

allPriorityColors.forEach(function(colorElement){
    colorElement.addEventListener("click",function(){
        allPriorityColors.forEach(function(priorityColorElement){
            priorityColorElement.classList.remove('active');
        })
        colorElement.classList.add('active');
    })
})


