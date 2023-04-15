let addbtn=document.querySelector(".add-btn");
let modalCont=document.querySelector(".modal-cont");

let modalPriorityColor='black';
let textAreaCont=document.querySelector('.textAreaCont');
let mainCont=document.querySelector('.main-cont');

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
        modalPriorityColor=colorElement.classList[0]; 
    })
})

modalCont.addEventListener('keydown',function(e){
    // console.log(e);
    let key=e.key;
    if(key=='Shift'){
        // console.log(modalPriorityColor);
        // console.log(textAreaCont.value);
        createTicket(modalPriorityColor,textAreaCont.value);
        modalCont.style.display="none";
        isModalPresent=false;
    }
})

function createTicket(ticketColor,data){
    divElement=document.createElement("div");
    divElement.setAttribute('class','ticket-cont');
    divElement.innerHTML=`
        <div class="ticket-color ${ticketColor}"></div>
        <div class="ticket-id"></div>
        <div class="text-area">${data}</div>
    `;

    mainCont.appendChild(divElement);
}




