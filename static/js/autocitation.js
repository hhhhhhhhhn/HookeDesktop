const {ipcRenderer} = require("electron");

window.onload = async()=>{
    var htm = await ipcRenderer.invoke("autocitation")
    div = document.getElementById("text")
    div.innerHTML = htm
}