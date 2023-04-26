var uid = new ShortUniqueId();

let addbtn=document.querySelector(".add-btn");
let modalCont=document.querySelector(".modal-cont");

let modalPriorityColor='black';
let textAreaCont=document.querySelector('.textAreaCont');
let mainCont=document.querySelector('.main-cont');

let ticketsArr=[];
let lockArr=[];

let colorsArr=['lightpink','lightgreen','lightblue','black'];

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
    // console.log(ticketId);
    // console.log(id);
    divElement=document.createElement("div");
    divElement.setAttribute('class','ticket-cont');
    divElement.innerHTML=`
        <div class="ticket-color ${ticketColor}"></div>
        <div class="ticket-id">${id}</div>
        <div class="text-area">${data}</div>
        <i class="fa-solid fa-lock ticket-icon"></i>
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

    lockArr.push(true);
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

// store previous tickets and display them with newly added tickets
if(localStorage.getItem("tickets")){
    ticketsArr=JSON.parse(localStorage.getItem("tickets"));
    // console.log(ticketsArr);
    ticketsArr.forEach(function(ticketsArrObj){
        createTicket(ticketsArrObj.ticketColor,ticketsArrObj.data,ticketsArrObj.ticketId);
    })
}

// clicked on particular color in navbar then respective color tickets will appear
let color=document.querySelectorAll(".color");
color.forEach(function(colorElem){

    colorElem.addEventListener("click",function(){
        let colorName=colorElem.classList[0];
        // console.log(colorName);

        // filtering tickets
        let filteredTicketsArr=ticketsArr.filter(function(ticketObj){
            return colorName == ticketObj.ticketColor;
        })
        // console.log(filteredTicketsArr);

        // remove tickets
        let ticketCont=document.querySelectorAll(".ticket-cont");
        for(let i=0;i<ticketCont.length;i++){
            ticketCont[i].remove();
        }

        // display filtered tickets
        filteredTicketsArr.forEach(function(ticketObj){
            createTicket(ticketObj.ticketColor,ticketObj.data,ticketObj.ticketId);
        })

    })


    // display all tickets while double clicked on color
    colorElem.addEventListener("dblclick",function(){
        // remove tickets
        let ticketCont=document.querySelectorAll(".ticket-cont");
        for(let i=0;i<ticketCont.length;i++){
            ticketCont[i].remove();
        }

        // display all tickets
        ticketsArr.forEach(function(ticketObj){
            createTicket(ticketObj.ticketColor,ticketObj.data,ticketObj.ticketId);
        })

    })

})

// delete ticket when clicked on cross button
// let removebtn=document.querySelector(".remove-btn");
// removebtn.addEventListener("click",function(){
//     removebtn.style.color="black";
//     let ticketCont=document.querySelectorAll(".ticket-cont");
//     for(let i=0;i<ticketCont.length;i++){
//         ticketCont[i].addEventListener("click",function(){
//             ticketCont[i].remove(); 
//         })
//     }
// })


// click button becomes black and white
let removebtn=document.querySelector(".remove-btn");
let ticketCont=document.querySelectorAll(".ticket-cont");
let isRemoveButtonClicked=false;
removebtn.addEventListener("click",function(){
    if(!isRemoveButtonClicked){
        // removebtn.style.backgroundColor="#485460";
        // removebtn.style.borderRadius="1rem";
        removebtn.style.color="black";
        handleRemoval();
        isRemoveButtonClicked=true;
    }
    else{
        // removebtn.style.backgroundColor="rgb(255, 47, 0)";
        removebtn.style.color="white";
        handleRemoval();
        isRemoveButtonClicked=false;
    }
})

// add and remove event listener
function handleRemoval(){
    ticketCont.forEach(function(ticketObj){
        if(!isRemoveButtonClicked){
            ticketObj.addEventListener("click",ticketRemoval);
        }
        else{
            ticketObj.removeEventListener("click",ticketRemoval);
        }
    })
}

// removes ticket from local storage and front-end  
function ticketRemoval(e){
    let requiredTicketId=e.currentTarget.innerText.split("\n")[0];
    // console.log(requiredTicketId);
    // let idx = ticketsArr.findIndex(x => x.ticketId === requiredTicketId);
    let idx = ticketsArr.findIndex(function(x){
        return x.ticketId === requiredTicketId;
    });
    // console.log(idx);

    // splice removes given index from array
    ticketsArr.splice(idx,1);
    lockArr.splice(idx,1);
    // console.log(ticketsArr);
    localStorage.setItem("tickets",JSON.stringify(ticketsArr));
    e.currentTarget.remove();
}


// lock and unlock ticket , if unlocked we can edit ticket else not
let textArea=document.querySelectorAll(".text-area");
// console.log(textArea);
let ticketIcon=document.querySelectorAll(".ticket-icon");
for(let i=0;i<ticketIcon.length;i++){
    ticketIcon[i].addEventListener("click",function(){
        if(lockArr[i]==true){
            ticketIcon[i].classList.remove("fa-lock");
            ticketIcon[i].classList.add("fa-lock-open");
            textArea[i].setAttribute("contenteditable","true");
            lockArr[i]=false;
        }
        else{
            ticketIcon[i].classList.remove("fa-lock-open");
            ticketIcon[i].classList.add("fa-lock");
            textArea[i].setAttribute("contenteditable","false");     
            lockArr[i]=true;       
        }

        // console.log(lockArr);
    })
}


// 
let ticketColor=document.querySelectorAll(".ticket-color");
for(let i=0;i<ticketColor.length;i++){
    let colorIdx=0;
    ticketColor[i].addEventListener("click",function(){
        // console.log(ticketColorObj);
        if(colorIdx==4){
            colorIdx=0;
        }
        let colorToBeRemoved=ticketColor[i].classList[1];
        // console.log(colorToBeRemoved);
        ticketColor[i].classList.remove(colorToBeRemoved);
        ticketColor[i].classList.add(colorsArr[colorIdx]);
        // console.log(colorIdx);
        
        // console.log(ticketCont);
        let requiredTicketId=ticketCont[i].innerText.split("\n")[0];
        // console.log(requiredTicketId);
        let idx = ticketsArr.findIndex(function(ticketObj){
            return ticketObj.ticketId === requiredTicketId;
        });
        // console.log(idx);

        let dataToBeFilled=ticketsArr[idx].data;
        let idToBeFilled=ticketsArr[idx].ticketId;
        ticketsArr.splice(idx,1,{ticketColor:colorsArr[colorIdx],data:dataToBeFilled,ticketId:idToBeFilled});
        console.log(ticketsArr);
        
        localStorage.setItem("tickets",JSON.stringify(ticketsArr));

        colorIdx++;
    })
}



