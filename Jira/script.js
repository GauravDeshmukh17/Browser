var uid = new ShortUniqueId();

let addbtn=document.querySelector(".add-btn");
let modalCont=document.querySelector(".modal-cont");

let modalPriorityColor='black';
let textAreaCont=document.querySelector('.textAreaCont');
let mainCont=document.querySelector('.main-cont');

let ticketsArr=[];

// to open close modal container
let isModalPresent=false;
addbtn.addEventListener('click',function(){
    if(!isModalPresent){
        modalCont.style.display="flex";
        mainCont.style.display="none";
        isModalPresent=true;
    }
    else{
        modalCont.style.display="none";
        mainCont.style.display="flex";
        isModalPresent=false;
    }
    // console.log(isModalPresent);
})

// to remove and add active classs from each priority color of modal container
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

// to generate and display ticket
modalCont.addEventListener('keydown',function(e){
    // console.log(e);
    let key=e.key;
    if(key=='Home'){
        // console.log(modalPriorityColor);
        // console.log(textAreaCont.value);
        createTicket(modalPriorityColor,textAreaCont.value);
        modalCont.style.display="none";
        mainCont.style.display="flex";
        isModalPresent=false;
        textAreaCont.value="";
        allPriorityColors.forEach(function(colorElem){
            colorElem.classList.remove("active");
        })
    }
})

// function which creates ticket
function createTicket(ticketColor,data,ticketId){
    let id=ticketId || uid();
    console.log(ticketId);
    console.log(id);
    divElement=document.createElement("div");
    divElement.setAttribute('class','ticket-cont');
    divElement.innerHTML=`
        <div class="ticket-color ${ticketColor}"></div>
        <div class="ticket-id"></div>
        <div class="text-area">${data}</div>
    `;

    mainCont.appendChild(divElement);

    // if every ticket is created for first time then ticketId would be undefined
    if(!ticketId){
        ticketsArr.push({
            ticketColor,
            data,
            ticketId:id
        })

        // console.log(ticketsArr);
        localStorage.setItem("tickets",JSON.stringify(ticketsArr));
    }
}

// not working code 
// let removebtn=document.querySelector(".remove-btn");
// let ticketCont=document.querySelectorAll(".ticket-cont");
// console.log(ticketCont);

// let isRemoveButtonClicked=false;
// removebtn.addEventListener("click",function(){
//     console.log(isRemoveButtonClicked);
//     if(!isRemoveButtonClicked){
//         ticketCont.forEach(function(ticketElem){
//             ticketElem.addEventListener("click",function(){
//                 ticketElem.style.display="none";
//             })
//         })

//         isRemoveButtonClicked=true;
//     }
//     else{
//         isRemoveButtonClicked=false;
//     }
// })

// new id creation
// console.log(uid());

if(localStorage.getItem("tickets")){
    ticketsArr=JSON.parse(localStorage.getItem("tickets"));
    // console.log(ticketsArr);
    ticketsArr.forEach(function(ticketsArrObj){
        createTicket(ticketsArrObj.ticketColor,ticketsArrObj.data,ticketsArrObj.ticketId);
    })
}



