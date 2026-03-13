function addUser(){

let name = document.getElementById("name").value;

let li = document.createElement("li");

li.innerHTML = name + " <button onclick='removeUser(this)'>Delete</button>";

document.getElementById("userList").appendChild(li);

}

function removeUser(btn){

btn.parentElement.remove();

}