var nameItem = document.getElementsByClassName("usersName");
var ageItem = document.getElementsByClassName("usersAge");
var heightItem = document.getElementsByClassName("usersHeight");
var weightItem = document.getElementsByClassName("usersWeight");
var saveButton = document.getElementsByClassName("saveBtn");

function createUser(){
    const user = localStorage.setItem(nameItem, ageItem, heightItem, weightItem);

document.getElementById("#saveBtn").onclick = function(){
    document.getElementsByName(user).values();
}
    if(user < 1){
        console.log("No users found");
    }else{
        for(var i = 0; i< localStorage.length; i++);
    }
}
