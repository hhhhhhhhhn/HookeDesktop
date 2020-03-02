const {ipcRenderer} = require("electron");

function getText(){
    return document.getElementById("text").value
}

document.addEventListener("click", (e)=>{
    if(e.target.id == "plagiarism"){
        ipcRenderer.send("send", getText()) 
        window.location.href = "./comparison.html";
    }else if(e.target.id == "autocitation"){
        ipcRenderer.send("send", getText()) 
        window.location.href = "./autocitation.html";
    }else if(e.target.id == "settings"){
        window.location.href = "./settings.html";
    }
})