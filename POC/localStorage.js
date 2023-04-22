// set data
localStorage.setItem("name","Gaurav");
localStorage.setItem("lastName","Deshmukh");
localStorage.setItem("class","T.E");
localStorage.setItem("place","Latur");
localStorage.setItem("DOB","17/03/2001");
localStorage.hobby="Games";
localStorage.setItem("tickets",[{name:"Gaurav",age:"21"},{name:"Ram",age:"20"}]);

// get data
let data=localStorage.getItem("name");
let data1=localStorage.name;
console.log(data);
console.log(data1);
let data2=localStorage.tickets[0].age;
console.log(data2);

// delete data
localStorage.removeItem("class");
delete localStorage.hobby;

// length of local storage
let len=localStorage.length;
console.log(len);

// get key by index
let k=localStorage.key(2);
console.log(k);